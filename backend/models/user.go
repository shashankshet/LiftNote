package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Email     string             `bson:"email" json:"email" binding:"required"`
	Password  string             `bson:"password" json:"password" binding:"required"`
	Name      string             `bson:"name" json:"name" binding:"required"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updated_at"`
}

type WorkoutSet struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	UserID    primitive.ObjectID `bson:"user_id" json:"user_id"`
	Exercise  string             `bson:"exercise" json:"exercise"`
	Weight    float64            `bson:"weight" json:"weight"`
	Unit      string             `bson:"unit" json:"unit"` // "kg" or "lbs"
	Reps      int                `bson:"reps" json:"reps"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}
