package utils

import (
	"log"

	"golang.org/x/crypto/bcrypt"
)

const hashCost = 14 // Match the existing hash cost

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), hashCost)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		return "", err
	}
	log.Printf("Hashed password: %s", string(bytes))
	return string(bytes), nil
}

func CheckPasswordHash(password, hash string) bool {
	log.Printf("Comparing - Password: %s, Hash: %s", password, hash)
	log.Printf("Hash: %s", hash)
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		log.Printf("Password comparison error: %v", err)
		return false
	}
	return true
}
