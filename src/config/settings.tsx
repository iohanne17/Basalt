/**
 * settings.js
 * Internal settings and configurations for various aspects of the mobile app project
 */

const namespace = 'basalt';

const devSettings = {
  namespace,
  carApi: 'http://api.carsxe.com',
  carApiKey: 'z06wfb44x_gwme38v13_dr7023njo',
  favouriteId: `${namespace}favourite-car`,
};

const prodSettings = {
  ...devSettings,
};

const settings =
  process.env.NODE_ENV === 'production' ? prodSettings : devSettings;
export default settings;
