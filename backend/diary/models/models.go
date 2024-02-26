package models

type GetDiaryDto struct {
	Week      string `json:"week"`
	Writer    string `json:"writer"`
	Requester string `json:"requester"`
}
type Diary struct {
	ID      uint   `json:"id"`
	Week    string `json:"week"`
	Writer  string `json:"writer"`
	Context string `json:"context"`
	Header  string `json:"header"`
	Footer  string `json:"footer"`
	Status  string `json:"status"`
}
