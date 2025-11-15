import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppProviders } from '@/app/AppProviders';

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <AppProviders />
    </>
  );
};

export default App;
