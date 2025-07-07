rm -rf www
rm -rf android
rm -rf node_modules
npm install
npx npm run build --  --configuration=production
# https://capacitorjs.com/docs/android
npm install @capacitor/android
npx cap add android
npx cap sync --inline
npx cap open android
