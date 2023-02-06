import { exchangeFormStore } from '../stores/ExchangeFormStore';
import useStore from './useStore';

export default function useExchangeFormStore() {
  return useStore(exchangeFormStore);
}
