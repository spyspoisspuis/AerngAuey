package handlers

import (
	"backend/diary/usecases"
)

type diaryHttpHandler struct {
	diaryUsecase usecases.DiaryUsecases
}

func NewDiaryHttpHandler(diaryUsecase usecases.DiaryUsecases) DiaryHandlers {
	return &diaryHttpHandler{
		diaryUsecase: diaryUsecase,
	}
}
