export type GetDiaryResponse = {
    diary : Diary 
    message : string 
    isFounded : boolean
}
export type Diary = {
  id?: number;
  week: string;
  writer: string;
  context: string;
  header: string;
  footer: string;
  status: string;
};

export const mockDiary: Diary = {
    id: 1,
    week: "2021-W01",
    writer: "HandsomeWolf",
    context: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc nec condimentum cursus, nisl nunc convallis diam, in facilisis dui nisl at dui. Sed auctor, nunc id cursus tincidunt, nisl nunc convallis diam, in facilisis dui nisl at dui. Sed auctor, nunc id cursus tincidunt, nisl nunc convallis diam, in facilisis dui nisl at dui.",
    header: "This is header",
    footer: "This is footer",
    status: "draft",
}

export const emptyDiary: Diary = {
    week: "",
    writer: "",
    context: "",
    header: "",
    footer: "",
    status: "",
}