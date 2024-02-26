package usecases

import (
	"backend/auth/models"
)

type UsersUsecase interface {

	// Login
	// Parameters (models.LoginDto) :
	// - username : string ; 3 <= length <= 50
	// - password : string ; 8 <= length <= 50
	//
	// Response
	// - 200 , token,username
	// - 400 bad request ; some field missing or input invalid
	// - 401 unauthorized ;  username or password incorrect
	// - 500 internal server error
	Login(in *models.LoginDto) (string,string, error)
}
