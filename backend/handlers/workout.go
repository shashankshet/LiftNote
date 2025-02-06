package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shashankshet/LiftNote/backend/config"
	"github.com/shashankshet/LiftNote/backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateWorkoutSet(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var workoutSet models.WorkoutSet
	if err := c.ShouldBindJSON(&workoutSet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	workoutSet.UserID = userID.(primitive.ObjectID)
	workoutSet.CreatedAt = time.Now()

	result, err := config.DB.Collection("workout_sets").InsertOne(context.Background(), workoutSet)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating workout set"})
		return
	}

	workoutSet.ID = result.InsertedID.(primitive.ObjectID)
	c.JSON(http.StatusCreated, workoutSet)
}

func GetUserWorkouts(c *gin.Context) {
	userID, _ := c.Get("user_id")

	opts := options.Find().SetSort(bson.D{{Key: "created_at", Value: -1}})
	cursor, err := config.DB.Collection("workout_sets").Find(context.Background(),
		bson.M{"user_id": userID}, opts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching workouts"})
		return
	}
	defer cursor.Close(context.Background())

	var workouts []models.WorkoutSet
	if err = cursor.All(context.Background(), &workouts); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decoding workouts"})
		return
	}

	c.JSON(http.StatusOK, workouts)
}
