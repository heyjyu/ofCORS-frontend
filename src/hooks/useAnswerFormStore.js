import useStore from './useStore';

import { answerFormStore } from '../stores/AnswerFormStore';

export default function useAnswerFormStore() {
  return useStore(answerFormStore);
}
