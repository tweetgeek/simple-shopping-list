import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pl.tweetgeek.simpleshoppinglist',
  appName: 'Simple Shopping List',
  webDir: 'dist',
  server: {
    url: 'http://localhost:5173',
    cleartext: true,
  },
  ios: {
    contentInset: 'always',
  },
  plugins: {
    SafeArea: {
      enabled: true,
      customColorsForSystemBars: true,
      statusBarColor: '#000000',
      statusBarContent: 'light',
      navigationBarColor: '#000000',
      navigationBarContent: 'light',
      offset: 0,
    },
  },
};

export default config;
