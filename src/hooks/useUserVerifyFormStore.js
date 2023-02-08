import { verifyUserFormStore } from '../stores/VerifyUserFormStore';
import useStore from './useStore';

export default function useVerifyUserFormStore() {
  return useStore(verifyUserFormStore);
}
