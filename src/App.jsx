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
import SolutionsPage from './pages/SolutionsPage';
import AskPage from './pages/AskPage';

import { apiService } from './services/ApiService';

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
          <Route path="/ask" element={<AskPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
        </Routes>
      </main>
    </>
  );
}
