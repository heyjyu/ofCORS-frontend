import useStore from './useStore';

import { selectAnswerFormStore } from '../stores/SelectAnswerFormStore';

export default function useSelectAnswerFormStore() {
  return useStore(selectAnswerFormStore);
}
