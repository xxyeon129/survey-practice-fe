import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PATH_URL } from "./constants/pages";
import HomePage from "../pages/HomePage";
import SurveyPage from "../pages/SurveyPage";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH_URL.HOME} element={<HomePage />} />
        <Route path={PATH_URL.SURVEY} element={<SurveyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter;