import { solutionStore } from '../stores/SolutionStore';
import useStore from './useStore';

export default function useSolutionStore() {
  return useStore(solutionStore);
}
