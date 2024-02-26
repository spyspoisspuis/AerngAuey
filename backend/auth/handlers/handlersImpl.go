package handlers

import (
	"backend/auth/usecases"
)

type usersHttpHandler struct {
	usersUsecase usecases.UsersUsecase
}

func NewUsersHttpHandler(usersUsecase usecases.UsersUsecase) UsersHandler {
	return &usersHttpHandler{
		usersUsecase: usersUsecase,
	}
}
