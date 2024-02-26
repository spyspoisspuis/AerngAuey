package handlers

import (
	"backend/auth/models"
	"backend/errors"
	"backend/messages"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

// Login handles the login request.
//
// It takes in a `c` parameter of type `echo.Context`
// Parameters (JSON) :
// - username : string ; 3 <= length <= 50
// - password : string ; 8 <= length <= 50
//
// Response
// - 200 , role and token
// - 400 bad request ; some field missing or input invalid
// - 401 unauthorized ;  username or password incorrect
// - 500 internal server error
func (h *usersHttpHandler) Login(c echo.Context) error {
	log.Println("Login : Starting handler...")
	reqBody := new(models.LoginDto)
	if err := c.Bind(reqBody); err != nil {
		log.Println("Login : Error while binding request body: ", err)
		return loginResponse(c, http.StatusBadRequest, messages.BAD_REQUEST, "","")

	}

	log.Println("Login : Username: ", reqBody.Username)
	token, username, err := h.usersUsecase.Login(reqBody)
	if err != nil {
		if er, ok := err.(*errors.RequestError); ok {
			return loginResponse(c, er.StatusCode, er.Error(), "", "")
		} else {
			return loginResponse(c, http.StatusInternalServerError, messages.INTERNAL_SERVER_ERROR, "", "")
		}

	}
	return loginResponse(c, http.StatusOK, messages.SUCCESSFUL_LOGIN, token, username)

}
