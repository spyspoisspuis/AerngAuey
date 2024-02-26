package handlers

import (
	"backend/diary/models"
	"log"

	"github.com/labstack/echo/v4"
)

type PostDiaryResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

type GetDiaryResponse struct {
	Diary     *models.Diary `json:"diary"`
	Status    int           `json:"status"`
	Message   string        `json:"message"`
	IsFounded bool          `json:"isFounded"`
}

func postDiaryresponse(c echo.Context, status int, message string) error {
	log.Println("Login Logs ; Status Code :", status, "Message:", message)
	return c.JSON(status, &PostDiaryResponse{
		Status:  status,
		Message: message,
	})
}

func getDiaryresponse(c echo.Context, diary *models.Diary, status int, message string) error {
	log.Println("Login Logs ; Status Code :", status, "Message:", message)
	return c.JSON(status, &GetDiaryResponse{
		Status:  status,
		Diary:   diary,
		Message: message,
		IsFounded: diary != nil,
	})
}
