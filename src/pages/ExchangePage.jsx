import { useEffect } from 'react';
import styled from 'styled-components';
import ExchangeForm from '../components/ExchangeForm';
import useExchangeFormStore from '../hooks/useExchangeFormStore';
import useExchangeStore from '../hooks/useExchangeStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.main`
  width: 100%;
  height: calc(100vh - 3em);
  min-height: 50em;
`;

export default function ExchangePage() {
  const userStore = useUserStore();
  const exchangeFormStore = useExchangeFormStore();
  const exchangeStore = useExchangeStore();

  useEffect(() => {
    exchangeStore.fetchExchanges();
    userStore.fetchMe();

    return () => {
      userStore.fetchMe();
      exchangeFormStore.reset();
    };
  }, []);

  if (!userStore.user) {
    return null;
  }

  return (
    <Container>
      <ExchangeForm />
    </Container>
  );
}
