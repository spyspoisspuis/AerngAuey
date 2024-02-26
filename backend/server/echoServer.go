package server

import (
	"fmt"

	"backend/config"
	usersHandlers "backend/auth/handlers"
	usersRepositories "backend/auth/repository"
	usersUsecases "backend/auth/usecases"

	diaryHandlers "backend/diary/handlers"
	diaryRepositories "backend/diary/repository"
	diaryUsecases "backend/diary/usecases"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

type echoServer struct {
	App  *echo.Echo
	db   *gorm.DB
	cfg  *config.Config
}

func NewEchoServer(cfg *config.Config, db *gorm.DB) Server {
	return &echoServer{
		App: echo.New(),
		db:  db,
		cfg: cfg,
	}
}

func (s *echoServer) Start() {
	s.initializeUsersHttpHandler()

	s.App.Use(middleware.Logger())
	s.App.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{s.cfg.App.FrontendURL, "http://localhost:5173"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	serverUrl := fmt.Sprintf(":%d", s.cfg.App.Port)
	s.App.Logger.Fatal(s.App.Start(serverUrl))
}

func (s *echoServer) GetHandler() *echo.Echo {
	return s.App
}

func (s *echoServer) GetDB() *gorm.DB {
	return s.db
}

// initializeUsersHttpHandler initializes the users HTTP handler.
//
// No parameters.
// No return values.
func (s *echoServer) initializeUsersHttpHandler() {
	// Initialize all layers

	// User
	usersPostgresRepository := usersRepositories.NewUsersPostgresRepository(s.db)
	usersUsecase := usersUsecases.NewUsersUsecaseImpl(
		usersPostgresRepository,
	)

	usersHttpHandler := usersHandlers.NewUsersHttpHandler(usersUsecase)

	// Diary 
	diaryRepo := diaryRepositories.NewDiaryRepository(s.db)
	diaryUsecase := diaryUsecases.NewDiaryUsecases(diaryRepo)
	diaryHttp := diaryHandlers.NewDiaryHttpHandler(diaryUsecase)


	// Routers

	// Login Request
	// Parameters (JSON) :
	// - username : string ; 3 <= length <= 50
	// - password : string ; 8 <= length <= 50
	//
	// Response
	// - 200 , role and token
	// - 400 bad request ; some field missing or input invalid
	// - 401 unauthorized ;  username or password incorrect
	// - 500 internal server error
	s.App.POST("/login", usersHttpHandler.Login)

	s.App.GET("/diary/:writer/:week", diaryHttp.GetDiary)
	s.App.POST("/diary", diaryHttp.AddDiary)
	s.App.PUT("/diary", diaryHttp.UpdateDiary)
}
