package handlers

import (
	"backend/diary/models"
	"backend/errors"
	"backend/messages"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (d *diaryHttpHandler) AddDiary(c echo.Context) error {
	diary := &models.Diary{}
	err := c.Bind(diary)
	if err != nil {
		return postDiaryresponse(c, http.StatusBadRequest, messages.BAD_REQUEST)
	}

	err = d.diaryUsecase.AddDiary(diary)
	if err != nil {
		if er, ok := err.(*errors.RequestError); ok {
			return postDiaryresponse(c, er.StatusCode, er.Error())
		} else {
			return postDiaryresponse(c, http.StatusInternalServerError, messages.INTERNAL_SERVER_ERROR)
		}

	}
	return postDiaryresponse(c, http.StatusCreated, messages.SUCCESFUL_ADD_DIARY)
}
