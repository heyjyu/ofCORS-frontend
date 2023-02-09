import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';
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
import UserDetailPage from './pages/UserDetailPage';
import MyPage from './pages/MyPage';
import ProfileEditPage from './pages/ProfileEditPage';
import ChargePage from './pages/ChargePage';
import ChargeCancelPage from './pages/ChargeCancelPage';
import ChargeFailPage from './pages/ChargeFailPage';
import ChargeSuccessPage from './pages/ChargeSuccessPage';
import ExchangePage from './pages/ExchangePage';
import VerifyUserPage from './pages/VerifyUserPage';
import VerifyUserResultPage from './pages/VerifyUserResultPage';

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 3.25em;
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 3.25em);
  min-height: 600px;
  margin: 0 auto;
`;

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    apiService.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/modify" element={<ProfileEditPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/questions/:id" element={<QuestionDetailPage />} />
          <Route path="/questions/:id/adopt" element={<AdoptPage />} />
          <Route path="/questions/:id/edit" element={<QuestionEditPage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/charge" element={<ChargePage />} />
          <Route path="/charge/cancel" element={<ChargeCancelPage />} />
          <Route path="/charge/success" element={<ChargeSuccessPage />} />
          <Route path="/charge/fail" element={<ChargeFailPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/verify-user" element={<VerifyUserPage />} />
          <Route path="/verify-user/result" element={<VerifyUserResultPage />} />
        </Routes>
      </Main>
    </>
  );
}
