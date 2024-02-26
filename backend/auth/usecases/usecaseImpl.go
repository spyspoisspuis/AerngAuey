package usecases

import (
	"backend/auth/helper"
	"backend/auth/models"
	"backend/auth/repository"
	"backend/errors"
	"backend/jwt"
	"backend/messages"

	"github.com/go-playground/validator"
)

type UsersUsecaseImpl struct {
	usersRepository repository.UserRepository
}

func NewUsersUsecaseImpl(usersRepository repository.UserRepository) UsersUsecase {
	return &UsersUsecaseImpl{
		usersRepository: usersRepository,
	}
}

func (u *UsersUsecaseImpl) Login(in *models.LoginDto) (string,string, error) {
	// Validate data
	validator := validator.New()
	if err := validator.Struct(in); err != nil {
		return "","", errors.CreateError(400, err.Error())
	}

	user, err := u.usersRepository.GetUserByUsername(in.Username)
	if err != nil {
		return "","", errors.CreateError(401, messages.WRONG_USERNAME_PASSWORD)
	}

	if err := helper.VerifyPassword(user.Password, in.Password+user.Salt); err != nil {
		return "","", errors.CreateError(401, messages.WRONG_USERNAME_PASSWORD)
	}

	token, err := jwt.CreateToken(user.Username)
	if err != nil {
		return "","", err
	}


	return token,user.Username, nil
}
