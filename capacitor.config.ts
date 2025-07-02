import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.quintinno',
  appName: 'Defensium',
  webDir: 'www',
  plugins: {
    Keyboard: {
      resize: "ionic"
    }
  }
};

export default config;
