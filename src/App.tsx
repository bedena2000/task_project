import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import MainPage from "./pages/MainPage/MainPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
