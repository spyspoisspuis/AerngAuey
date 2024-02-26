package handlers

import (
	"log"

	"github.com/labstack/echo/v4"
)

type loginResponseStruct struct {
	Token    string `json:"token"`
	Username string `json:"username"`
	Message  string `json:"message"`
}

func loginResponse(c echo.Context, responseCode int, message string, token string, username string) error {
	log.Println("Login Logs ; Status Code :", responseCode, "Message:", message)
	return c.JSON(responseCode, &loginResponseStruct{
		Token:   token,
		Username: username,
		Message: message,
	})
}
