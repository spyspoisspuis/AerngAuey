package handlers

import "github.com/labstack/echo/v4"

type UsersHandler interface {

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
	Login(c echo.Context) error
}
