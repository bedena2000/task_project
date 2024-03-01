import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import MainPage from "./pages/MainPage/MainPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
// Context
import { MainContextProvider } from "./context";
import HistoryFound from "./components/HistoryFound/HistoryFound";
import KeywordList from "./components/KeywordList/KeywordList";
import ErrorPage from "./components/ErrorPage/ErrorPage";

export default function App() {
  return (
    <div>
      <MainContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/history" element={<HistoryPage />}>
              <Route index element={<KeywordList />} />
              <Route path="list" element={<HistoryFound />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
}
