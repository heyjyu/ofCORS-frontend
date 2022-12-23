import { questionStore } from '../stores/QuestionStore';
import useStore from './useStore';

export default function useQuestionStore() {
  return useStore(questionStore);
}
