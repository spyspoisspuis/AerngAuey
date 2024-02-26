package repository

import (
	"backend/auth/entities"

	"gorm.io/gorm"
)

type usersPostgresRepository struct {
	db *gorm.DB
}

func NewUsersPostgresRepository(db *gorm.DB) UserRepository {
	return &usersPostgresRepository{db: db}
}

func (u *usersPostgresRepository) GetUserByUsername(username string) (*entities.Users, error) {
	user := &entities.Users{}
	if err := u.db.Where("username = ?", username).First(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}
