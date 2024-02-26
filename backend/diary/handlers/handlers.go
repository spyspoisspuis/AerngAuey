package handlers

import "github.com/labstack/echo/v4"

type DiaryHandlers interface {
	GetDiary(c echo.Context) error
	AddDiary(c echo.Context) error
	UpdateDiary(c echo.Context) error
}
