package migrations

import (
	"backend/auth/entities"
	"backend/auth/helper"
	"backend/config"
	"backend/database"
	"backend/util"
	"log"

	"gorm.io/gorm"
)

// UsersMigrate migrates the users in the database.
//
// It takes a database instance as the parameter.
// It returns an error if there was an issue during the migration process.
func UsersMigrate(db database.Database) error {
	// 1. Get spy && aerngauey username and password from env
	cfg := config.GetConfig()
	// 2. Check if spy && aerngauey already exists
	users, err := getAllUsers(db.GetDb())
	if err != nil {
		return err
	}

	// Migrate aerngauey entities
	if err = migrateUserEntities(&cfg.User.AerngAuey, users, db); err != nil {
		return err
	}

	// Migrate spy entities
	if err = migrateUserEntities(&cfg.User.Spy, users, db); err != nil {
		return err
	}

	return nil
}

func migrateUserEntities(user *config.UserCredential, users []*entities.Users, db database.Database) error {
	log.Println("Migrating user entities", user.Username)
	if foundUser := helper.GetUserFromUserLists(users, user.Username); foundUser != nil {
		log.Println(user.Username, "already exists")
		return nil
	}

	uuid, err := util.GenerateUUID()
	if err != nil {
		return err
	}
	password, salt, err := helper.GenerateHashedSaltedPassword(user.Password)
	if err != nil {
		return err
	}

	u := &entities.Users{
		Id:       uuid,
		Username: user.Username,
		Password: password,
		Salt:     salt,
	}

	if err = insertUser(db.GetDb(), u); err != nil {
		return err
	}

	log.Println("Success migrate user entities", user.Username)
	return nil
}

func getAllUsers(db *gorm.DB) ([]*entities.Users, error) {
	users := make([]*entities.Users, 0)
	if err := db.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func insertUser(db *gorm.DB, user *entities.Users) error {
	if err := db.Create(user).Error; err != nil {
		return err
	}
	return nil
}
