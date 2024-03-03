package entities

type Diary struct {
	ID      string `gorm:"primaryKey" json:"id"`
	Week    string `json:"week"`
	Writer  string `json:"writer"`
	Context string `json:"context"`
	Header  string `json:"header"`
	Footer  string `json:"footer"`
	Status  string `json:"status"`
}
