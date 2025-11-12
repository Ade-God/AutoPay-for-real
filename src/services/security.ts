import * as SecureStore from 'expo-secure-store';

const PIN_KEY = 'autopay_pin';
const BIOMETRIC_KEY = 'autopay_bio_token';

export const savePin = async (pin: string) => {
  await SecureStore.setItemAsync(PIN_KEY, pin, { keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK });
};

export const getPin = async () => SecureStore.getItemAsync(PIN_KEY);

export const deletePin = async () => SecureStore.deleteItemAsync(PIN_KEY);

export const saveBiometricToken = async (token: string) => {
  await SecureStore.setItemAsync(BIOMETRIC_KEY, token, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
  });
};

export const getBiometricToken = async () => SecureStore.getItemAsync(BIOMETRIC_KEY);

export const deleteBiometricToken = async () => SecureStore.deleteItemAsync(BIOMETRIC_KEY);
