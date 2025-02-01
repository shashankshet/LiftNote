package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jmoiron/sqlx"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/apple"
	"golang.org/x/oauth2/google"

	_ "github.com/lib/pq"
)

// Database connection
var db *sqlx.DB

// JWT Secret Key
var jwtSecret = []byte("your-secret-key")

// OAuth2 Configurations
var googleOAuthConfig = &oauth2.Config{
	ClientID:     "your-google-client-id",
	ClientSecret: "your-google-client-secret",
	RedirectURL:  "http://localhost:8080/auth/google/callback",
	Scopes:       []string{"profile", "email"},
	Endpoint:     google.Endpoint,
}

var appleOAuthConfig = &oauth2.Config{
	ClientID:     "your-apple-client-id",
	ClientSecret: "your-apple-client-secret",
	RedirectURL:  "http://localhost:8080/auth/apple/callback",
	Scopes:       []string{"name", "email"},
	Endpoint:     apple.Endpoint,
}

// Enhanced User structure
type User struct {
	ID       string    `json:"id" db:"id"`
	Email    string    `json:"email" db:"email"`
	Password string    `json:"-" db:"password_hash"`
	AuthType string    `json:"auth_type" db:"auth_type"`
	Name     string    `json:"name" db:"name"`
	Created  time.Time `json:"created" db:"created"`
}

// Workout structure
type Workout struct {
	ID        string    `json:"id" db:"id"`
	UserID    string    `json:"user_id" db:"user_id"`
	Date      string    `json:"date" db:"date"`
	Notes     string    `json:"notes" db:"notes"`
	Type      string    `json:"type" db:"type"`
	Duration  int       `json:"duration" db:"duration"`
	Created   time.Time `json:"created" db:"created"`
	Updated   time.Time `json:"updated" db:"updated"`
}

// Initialize Database Connection
func initDB() {
	var err error
	dsn := "user=postgres password=yourpassword dbname=workoutapp sslmode=disable"
	db, err = sqlx.Connect("postgres", dsn)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	log.Println("Database connected!")
}

// JWT Token Generation
func generateJWT(userID string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})
	return token.SignedString(jwtSecret)
}

// Google OAuth Login
func googleLogin(c *gin.Context) {
	url := googleOAuthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

// Google OAuth Callback
func googleCallback(c *gin.Context) {
	code := c.Query("code")
	token, err := googleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get Google token"})
		return
	}

	client := googleOAuthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get Google user info"})
		return
	}
	defer resp.Body.Close()

	var userInfo struct {
		Email string `json:"email"`
	}
	_ = json.NewDecoder(resp.Body).Decode(&userInfo)

	// Check if user exists, else create
	var user User
	err = db.Get(&user, "SELECT id FROM users WHERE email=$1", userInfo.Email)
	if err != nil {
		db.Exec("INSERT INTO users (id, email, auth_type) VALUES (gen_random_uuid(), $1, 'google')", userInfo.Email)
	}

	// Generate JWT Token
	tokenString, _ := generateJWT(user.ID)
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// Apple OAuth Login
func appleLogin(c *gin.Context) {
	url := appleOAuthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

// Apple OAuth Callback
func appleCallback(c *gin.Context) {
	code := c.Query("code")
	token, err := appleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get Apple token"})
		return
	}

	// Apple does not provide user info in token request, rely on frontend passing it
	userEmail := c.Query("email")

	// Check if user exists, else create
	var user User
	err = db.Get(&user, "SELECT id FROM users WHERE email=$1", userEmail)
	if err != nil {
		db.Exec("INSERT INTO users (id, email, auth_type) VALUES (gen_random_uuid(), $1, 'apple')", userEmail)
	}

	// Generate JWT Token
	tokenString, _ := generateJWT(user.ID)
	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// Middleware to verify JWT
func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Missing token"})
			return
		}

		// Parse and validate token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})
		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		claims, _ := token.Claims.(jwt.MapClaims)
		c.Set("user_id", claims["user_id"])

		c.Next()
	}
}

// Enhanced createWorkout handler
func createWorkout(c *gin.Context) {
	userID := c.GetString("user_id")

	var workout Workout
	if err := c.ShouldBindJSON(&workout); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	workout.UserID = userID
	workout.Created = time.Now()
	workout.Updated = time.Now()

	query := `
		INSERT INTO workouts (id, user_id, date, notes, type, duration, created, updated)
		VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7)
		RETURNING id`
	
	var workoutID string
	err := db.QueryRow(query, workout.UserID, workout.Date, workout.Notes, 
		workout.Type, workout.Duration, workout.Created, workout.Updated).Scan(&workoutID)
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create workout"})
		return
	}

	workout.ID = workoutID
	c.JSON(http.StatusCreated, workout)
}

// Get workouts handler
func getWorkouts(c *gin.Context) {
	userID := c.GetString("user_id")
	
	var workouts []Workout
	query := `SELECT * FROM workouts WHERE user_id=$1 ORDER BY date DESC`
	err := db.Select(&workouts, query, userID)
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch workouts"})
		return
	}

	c.JSON(http.StatusOK, workouts)
}

// Get single workout handler
func getWorkout(c *gin.Context) {
	userID := c.GetString("user_id")
	workoutID := c.Param("id")

	var workout Workout
	query := `SELECT * FROM workouts WHERE id=$1 AND user_id=$2`
	err := db.Get(&workout, query, workoutID, userID)
	
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Workout not found"})
		return
	}

	c.JSON(http.StatusOK, workout)
}

// Update workout handler
func updateWorkout(c *gin.Context) {
	userID := c.GetString("user_id")
	workoutID := c.Param("id")

	var workout Workout
	if err := c.ShouldBindJSON(&workout); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		UPDATE workouts 
		SET date=$1, notes=$2, type=$3, duration=$4, updated=$5
		WHERE id=$6 AND user_id=$7
		RETURNING *`
	
	err := db.Get(&workout, query, workout.Date, workout.Notes, workout.Type, 
		workout.Duration, time.Now(), workoutID, userID)
	
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Workout not found or update failed"})
		return
	}

	c.JSON(http.StatusOK, workout)
}

// Delete workout handler
func deleteWorkout(c *gin.Context) {
	userID := c.GetString("user_id")
	workoutID := c.Param("id")

	query := `DELETE FROM workouts WHERE id=$1 AND user_id=$2`
	result, err := db.Exec(query, workoutID, userID)
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete workout"})
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Workout not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Workout deleted successfully"})
}

// Get user profile handler
func getUserProfile(c *gin.Context) {
	userID := c.GetString("user_id")

	var user User
	err := db.Get(&user, "SELECT id, email, name, auth_type, created FROM users WHERE id=$1", userID)
	
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// Update user profile handler
func updateUserProfile(c *gin.Context) {
	userID := c.GetString("user_id")

	var updateData struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	}

	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		UPDATE users 
		SET name=$1, email=$2
		WHERE id=$3
		RETURNING id, email, name, auth_type, created`
	
	var user User
	err := db.Get(&user, query, updateData.Name, updateData.Email, userID)
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func main() {
	initDB()

	// Create Gin router
	r := gin.Default()

	// OAuth routes
	r.GET("/auth/google/login", googleLogin)
	r.GET("/auth/google/callback", googleCallback)
	r.GET("/auth/apple/login", appleLogin)
	r.GET("/auth/apple/callback", appleCallback)

	// Protected routes
	protected := r.Group("").Use(authMiddleware())
	{
		// Workout routes
		protected.POST("/workouts", createWorkout)
		protected.GET("/workouts", getWorkouts)
		protected.GET("/workouts/:id", getWorkout)
		protected.PUT("/workouts/:id", updateWorkout)
		protected.DELETE("/workouts/:id", deleteWorkout)

		// User profile routes
		protected.GET("/profile", getUserProfile)
		protected.PUT("/profile", updateUserProfile)
	}

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Println("Server running on port:", port)
	r.Run(":" + port)
}
