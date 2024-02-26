package repository

import "backend/auth/entities"

type UserRepository interface {
	GetUserByUsername(username string) (*entities.Users, error)
}
