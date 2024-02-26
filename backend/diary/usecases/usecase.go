package usecases

import "backend/diary/models"

type DiaryUsecases interface {
	// GetDiary
	GetDiary(in *models.GetDiaryDto) (*models.Diary, error)
	// AddDiary
	AddDiary(in *models.Diary) error
	// UpdateDiary
	UpdateDiary(in *models.Diary) error
}
