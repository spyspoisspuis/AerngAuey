package usecases

import (
	"backend/diary/helper"
	"backend/diary/models"
	"backend/diary/repository"
)

type DiaryUsecasesImpl struct {
	diaryRepository repository.DiaryRepository
}

func NewDiaryUsecases(diaryRepository repository.DiaryRepository) DiaryUsecases {
	return &DiaryUsecasesImpl{diaryRepository: diaryRepository}
}

func (d *DiaryUsecasesImpl) GetDiary(in *models.GetDiaryDto) (*models.Diary, error) {
	diary, err := d.diaryRepository.GetDiary(in.Week, in.Writer)
	if err != nil {
		return nil, err
	}

	if diary == nil {
		// record not found
		return nil,nil
	}

	if diary.Status != "confirm" {
		if diary.Writer != in.Requester {
			return &models.Diary{}, nil
		}
	}

	diaryModels := helper.ConvertDiaryEntityToModels(diary)

	return diaryModels, nil

}

func (d *DiaryUsecasesImpl) AddDiary(in *models.Diary) error {
	diary := helper.ConvertDiaryModelsToEntity(in)
	err := d.diaryRepository.AddDiary(diary)
	if err != nil {
		return err
	}

	return nil
}

func (d *DiaryUsecasesImpl) UpdateDiary(in *models.Diary) error {
	diary := helper.ConvertDiaryModelsToEntity(in)
	err := d.diaryRepository.UpdateDiary(diary)
	if err != nil {
		return err
	}

	return nil
}
