package repository

import (
	"backend/diary/entities"
	"errors"

	"gorm.io/gorm"
)

type DiaryRepositoryImpl struct {
	db *gorm.DB
}

func NewDiaryRepository(db *gorm.DB) DiaryRepository {
	return &DiaryRepositoryImpl{db: db}
}

func (d *DiaryRepositoryImpl) GetDiary(week string, writer string) (*entities.Diary, error) {
	diary := &entities.Diary{}
	if err := d.db.Where("week = ? AND writer = ?", week, writer).First(diary).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return diary, nil
}

func (d *DiaryRepositoryImpl) AddDiary(diary *entities.Diary) error {
	if err := d.db.Create(diary).Error; err != nil {
		return err
	}
	return nil
}

func (d *DiaryRepositoryImpl) UpdateDiary(diary *entities.Diary) error {
	if err := d.db.Save(diary).Error; err != nil {
		return err
	}
	return nil
}
