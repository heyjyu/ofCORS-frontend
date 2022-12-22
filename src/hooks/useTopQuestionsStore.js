import { topQuestionsStore } from '../stores/TopQuestionsStore';
import useStore from './useStore';

export default function useTopQuestionsStore() {
  return useStore(topQuestionsStore);
}
