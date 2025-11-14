import { mocks } from './mocks';
import { LinkedBank } from '@/store/types';

export const beginBankLink = async (bankId: string): Promise<void> => {
  // TODO: integrate with Go backend (Open Banking provider: Mono/Okra/Stitch)
  await new Promise((resolve) => setTimeout(resolve, 800));
  console.log(`Mock linking bank ${bankId}`);
};

export const getLinkedBanks = async (): Promise<LinkedBank[]> => {
  // TODO: integrate with Go backend (Open Banking provider: Mono/Okra/Stitch)
  return mocks.getLinkedBanks();
};

export const revokeBankAccess = async (bankId: string): Promise<void> => {
  // TODO: integrate with Go backend (Open Banking provider: Mono/Okra/Stitch)
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log(`Mock revoke bank ${bankId}`);
};
