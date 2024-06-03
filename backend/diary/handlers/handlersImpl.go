package handlers

import (
	"backend/diary/models"
	"backend/diary/usecases"
	"backend/errors"
	"backend/jwt"
	"backend/messages"
	"net/http"

	"github.com/labstack/echo/v4"
)

type diaryHttpHandler struct {
	diaryUsecase usecases.DiaryUsecases
}

func NewDiaryHttpHandler(diaryUsecase usecases.DiaryUsecases) DiaryHandlers {
	return &diaryHttpHandler{
		diaryUsecase: diaryUsecase,
	}
}

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

func (d *diaryHttpHandler) GetDiary(c echo.Context) error {
	week := c.Param("week")
	writer := c.Param("writer")
	if week == "" || writer == "" {
		return getDiaryresponse(c, &models.Diary{}, http.StatusBadRequest, messages.BAD_REQUEST)
	}

	claims, err := jwt.ValidateAndExtractClaims(c)
	if err != nil {
		return getDiaryresponse(c, &models.Diary{}, http.StatusUnauthorized, messages.INVALID_TOKEN)
	}

	in := &models.GetDiaryDto{
		Week:      week,
		Writer:    writer,
		Requester: claims.Username,
	}

	diary, err := d.diaryUsecase.GetDiary(in)

	if err != nil {
		if er, ok := err.(*errors.RequestError); ok {
			return getDiaryresponse(c, &models.Diary{}, er.StatusCode, er.Error())
		} else {
			return getDiaryresponse(c, &models.Diary{}, http.StatusInternalServerError, messages.INTERNAL_SERVER_ERROR)
		}

	}
	return getDiaryresponse(c, diary, http.StatusOK, messages.SUCCESFUL_GET_DIARY)
}

func (d *diaryHttpHandler) UpdateDiary(c echo.Context) error {
	diary := &models.Diary{}
	err := c.Bind(diary)
	if err != nil {
		return postDiaryresponse(c, http.StatusBadRequest, messages.BAD_REQUEST)
	}

	err = d.diaryUsecase.UpdateDiary(diary)
	if err != nil {
		if er, ok := err.(*errors.RequestError); ok {
			return postDiaryresponse(c, er.StatusCode, er.Error())
		} else {
			return postDiaryresponse(c, http.StatusInternalServerError, messages.INTERNAL_SERVER_ERROR)
		}

	}
	return postDiaryresponse(c, http.StatusOK, messages.SUCCESFUL_ADD_DIARY)
}
