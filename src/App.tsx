import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import MainPage from "./pages/MainPage/MainPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
// Context
import { MainContextProvider } from "./context";

export default function App() {
  return (
    <div>
      <MainContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
}
