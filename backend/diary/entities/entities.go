package entities

type Diary struct {
	ID            int    `gorm:"primaryKey" json:"id"`
	Week          string `json:"week"`
	Writer        string `json:"writer"`
	Context       string `json:"context"`
	StatusConfirm bool   `json:"status"`
}
