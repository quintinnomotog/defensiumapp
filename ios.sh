rm -rf www
rm -rf ios
rm -rf node_modules
npm install
npx npm run build --  --configuration=production
npm install @capacitor/core@7.4.0 @capacitor/ios@7.4.0
npx cap add ios
npx cap sync --inline
npx cap open ios
