package config

import (
	"fmt"

	"github.com/spf13/viper"
)

type (
	Config struct {
		App   App
		Db    Db
		User  User
	}

	App struct {
		Port        int
		FrontendURL string
		JWTKey      string
	}

	User struct {
		AerngAuey UserCredential
		Spy       UserCredential
	}

	UserCredential struct {
		Username string
		Password string
	}

	Db struct {
		Host     string
		Port     int
		User     string
		Password string
		DBName   string
		SSLMode  string
		TimeZone string
	}
)

func InitializeViper(path string) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env")
	viper.AutomaticEnv()
	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("fatal error config file: %v", err))
	}
}

func GetConfig() Config {
	// Load roles map from config
	
	return Config{
		App: App{
			Port:        viper.GetInt("SERVER_PORT"),
			FrontendURL: viper.GetString("FRONTEND_URL"),
			JWTKey:      viper.GetString("JWT_KEY"),
		},
		User: User{
			AerngAuey: UserCredential{
				Username: viper.GetString("AERNGAUEY_USERNAME"),
				Password: viper.GetString("AERNGAUEY_PASSWORD"),
			},
			Spy: UserCredential{
				Username: viper.GetString("SPY_USERNAME"),
				Password: viper.GetString("SPY_PASSWORD"),
			},
		},
		Db: Db{
			Host:     viper.GetString("DATABASE_HOST"),
			Port:     viper.GetInt("DATABASE_PORT"),
			User:     viper.GetString("DATABASE_USER"),
			Password: viper.GetString("DATABASE_PASSWORD"),
			DBName:   viper.GetString("DATABASE_DBNAME"),
			SSLMode:  viper.GetString("DATABASE_SSLMODE"),
			TimeZone: viper.GetString("DATABASE_TIMEZONE"),
		},
	}
}
