# BasaltTest App

This is just a sample app, it uses react-navigation for navigation, react-native-vector-icons for icons used withing the app.

## Install dependencies

```bash
yarn install
```

## Run Android

```bash
yarn android
```

## Run IOS

```bash
cd ios && pod install && cd ..
yarn ios
```

### Folder Structure

- `src/lib/components` - React Native components.
- `src/lib/theme` - Application theme.
- `src/lib/utils` - Reusable utility functions.
- `src/screens` - Application UI is defined here.
- `src/config` - Application wide configuration (environment settings and redux store settings)
- `src/apiHooks` - Application queries and mutations reside in this folder
- `src/features` - Redux management configuration.
