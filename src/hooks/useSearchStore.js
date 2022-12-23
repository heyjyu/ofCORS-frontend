import { searchStore } from '../stores/SearchStore';
import useStore from './useStore';

export default function useSearchStore() {
  return useStore(searchStore);
}
