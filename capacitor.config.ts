import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.noortime.app',
  appName: 'NoorTime',
  webDir: 'dist',

  android: {
    // Allow mixed content for API calls during development
    allowMixedContent: true,
    // Capture input on load — prevents blank screen issue
    captureInput: true,
    // WebView settings for smooth performance
    webContentsDebuggingEnabled: true, // Remove in production
  },

  plugins: {
    SplashScreen: {
      // Match your app's background gradient color
      backgroundColor: '#0f1f16',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      launchAutoHide: false,
      // We control hiding manually from React
    },
    StatusBar: {
      // Make status bar transparent so app goes edge-to-edge
      style: 'DARK',
      backgroundColor: '#00000000',
      overlaysWebView: true,
    },
    Keyboard: {
      // Resize behavior when keyboard appears
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true,
    },
  },
};

export default config;

