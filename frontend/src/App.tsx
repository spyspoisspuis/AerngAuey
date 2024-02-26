import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, Wrapper, HomePage, WriteDiaryPage } from "./pages";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/write/:week" element={<WriteDiaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
