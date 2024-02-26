package repository

import "backend/diary/entities"

type DiaryRepository interface {
	GetDiary(week string, writer string) (*entities.Diary, error)
	AddDiary(diary *entities.Diary) error
	UpdateDiary(diary *entities.Diary) error
}
