import { useState } from 'react';

export default function useForceUpdate() {
  const [, setValue] = useState(0);
  const forceUpdate = () => setValue((value) => value + 1);

  return forceUpdate;
}
