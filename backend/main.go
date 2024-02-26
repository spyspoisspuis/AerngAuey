package main

import (
	usersMigrate "backend/auth/migrations"
	"backend/config"
	"backend/database"
	"backend/server"
	"fmt"
	"log"
)

func main() {
	log.Println("Initializing config")
	config.InitializeViper("./")
	cfg := config.GetConfig()
	log.Println("Success initiliazed config", cfg)

	db := database.NewPostgresDatabase(&cfg)
	log.Println("Success connect to database")

	err := usersMigrate.UsersMigrate(db)
	if err != nil {
		_ = fmt.Errorf("failed to migrate %w", err)
		return
	}

	s := server.NewEchoServer(&cfg, db.GetDb())

	s.Start()

}
