import useStore from './useStore';

import { answerEditFormStore } from '../stores/AnswerEditFormStore';

export default function useAnswerEditFormStore() {
  return useStore(answerEditFormStore);
}
