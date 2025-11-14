import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export const useInstallPrompt = () => {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setAvailable(true);
    }
  }, []);

  return { available };
};
