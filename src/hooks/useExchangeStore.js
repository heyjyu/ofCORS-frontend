import { exchangeStore } from '../stores/ExchangeStore';
import useStore from './useStore';

export default function useExchangeStore() {
  return useStore(exchangeStore);
}
