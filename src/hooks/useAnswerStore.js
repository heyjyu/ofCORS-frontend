import useStore from './useStore';

import { answerStore } from '../stores/AnswerStore';

export default function useAnswerStore() {
  return useStore(answerStore);
}
