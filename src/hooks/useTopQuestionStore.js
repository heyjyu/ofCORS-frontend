import { topQuestionStore } from '../stores/TopQuestionStore';
import useStore from './useStore';

export default function useTopQuestionStore() {
  return useStore(topQuestionStore);
}
