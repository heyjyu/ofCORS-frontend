import useStore from './useStore';

import { questionFormStore } from '../stores/QuestionFormStore';

export default function useQuestionFormStore() {
  return useStore(questionFormStore);
}
