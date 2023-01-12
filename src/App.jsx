import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';

import { useLocalStorage } from 'usehooks-ts';

import GlobalStyle from './styles/GlobalStyles';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SearchPage from './pages/SearchPage';
import QuestionsPage from './pages/QuestionsPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import SolutionsPage from './pages/SolutionsPage';
import AskPage from './pages/AskPage';
import AdoptPage from './pages/AdoptPage';
import UsersPage from './pages/UsersPage';

import { apiService } from './services/ApiService';
import QuestionEditPage from './pages/QuestionEditPage';

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/questions/:id" element={<QuestionDetailPage />} />
          <Route path="/questions/:id/adopt" element={<AdoptPage />} />
          <Route path="/questions/:id/edit" element={<QuestionEditPage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </main>
    </>
  );
}
