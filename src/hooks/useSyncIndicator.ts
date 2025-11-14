import { useEffect, useState } from 'react';
import { useBanksStore } from '@/store/useBanksStore';

export const useSyncIndicator = () => {
  const lastSynced = useBanksStore((state) =>
    state.linkedBanks.reduce<string | null>((latest, bank) => {
      if (!latest) return bank.lastSyncedAt;
      return new Date(bank.lastSyncedAt) > new Date(latest) ? bank.lastSyncedAt : latest;
    }, null)
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lastSynced) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [lastSynced]);

  return { visible, lastSynced };
};
