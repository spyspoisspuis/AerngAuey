package helper

import (
	"backend/diary/entities"
	"backend/diary/models"
)

func ConvertDiaryEntityToModels(diary *entities.Diary) *models.Diary {
	return &models.Diary{
		ID:      diary.ID,
		Writer:  diary.Writer,
		Week:    diary.Week,
		Context: diary.Context,
		Header:  diary.Header,
		Footer:  diary.Footer,
		Status:  diary.Status,
	}
}

func ConvertDiaryModelsToEntity(diary *models.Diary) *entities.Diary {
	return &entities.Diary{
		ID:      diary.ID,
		Writer:  diary.Writer,
		Week:    diary.Week,
		Context: diary.Context,
		Header:  diary.Header,
		Footer:  diary.Footer,
		Status:  diary.Status,
	}
}
