import { pointStore } from '../stores/PointStore';
import useStore from './useStore';

export default function usePointStore() {
  return useStore(pointStore);
}
