import {
  render, screen,
} from '@testing-library/react';
import { userStore } from '../stores/UserStore';
import ExchangeForm from './ExchangeForm';

describe('ExchangeForm', () => {
  function renderExchangeForm() {
    render((
      <ExchangeForm />
    ));
  }

  it('renders the amount of the point the user has', async () => {
    await userStore.fetchMe();

    renderExchangeForm();

    screen.getByText('홍길동님이 보유하신 포인트는 총 100pt입니다');
  });
});
