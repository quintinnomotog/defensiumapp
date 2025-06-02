rm -rf www
rm -rf android
npx npm run build --  --configuration=production
npm install @capacitor/android@7.2.0 --save-exact
npx cap add android
npx cap sync --inline
#npx cap open android
cd /opt/android-studio/bin/ && ./studio.sh

