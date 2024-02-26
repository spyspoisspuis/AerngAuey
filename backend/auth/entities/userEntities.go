package entities

type (
	Users struct {
		Id       string `json:"id"`
		Username string `json:"username"`
		Password string `json:"password"`
		Salt     string `json:"salt"`
	}
)

func (u *Users) ToString() string {
	return u.Id + u.Username
}
