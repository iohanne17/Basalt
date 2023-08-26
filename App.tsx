import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import {colors} from './src/lib/theme/colors';
import {isReadyRef, navigationRef} from './src/lib/utils/navigationUtils';
import {MainNavigator} from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/config/store';

export const MainApp = () => {
  const onReadyNav = useCallback(() => {
    // @ts-ignore
    isReadyRef.current = true;
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={onReadyNav}
          theme={DefaultTheme}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={colors.transparent}
          />
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default MainApp;
