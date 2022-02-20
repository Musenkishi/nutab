cp public/manifest.firefox.json public/manifest.json; 
yarn build; 
web-ext build --source-dir ./build --overwrite-dest -a ./web-ext-artifacts/firefox

cp public/manifest.chromium.json public/manifest.json; 
yarn build; 
web-ext build --source-dir ./build --overwrite-dest -a ./web-ext-artifacts/chromium
