import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PATH_URL } from './constants/pages';
import HomePage from '../pages/HomePage';
import SurveyPage from '../pages/SurveyPage';
import Header from './Header';
import Test from '../components/Test';
import EmailJS from '../components/EmailJS';
import Nodemailer from '../components/Nodemailer';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={PATH_URL.HOME} element={<HomePage />} />
        <Route path={PATH_URL.SURVEY} element={<SurveyPage />} />
        <Route path={PATH_URL.EMAIL} element={<Nodemailer />} />
        <Route path={PATH_URL.TEST} element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
