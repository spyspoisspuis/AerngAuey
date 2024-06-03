package models

type GetDiaryDto struct {
	Week      string `json:"week"`
	Writer    string `json:"writer"`
	Requester string `json:"requester"`
}

type Diary struct {
	ID            int    `json:"id,omitempty"`
	Week          string `json:"week"`
	Writer        string `json:"writer"`
	Context       string `json:"context"`
	StatusConfirm bool   `json:"status"`
}
