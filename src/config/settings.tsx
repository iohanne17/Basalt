/**
 * settings.js
 * Internal settings and configurations for various aspects of the mobile app project
 */

const namespace = 'basalt';

const devSettings = {
  namespace,
  marketApi: 'http://api.marketstack.com/v1',
  ApiKey: '7b0d9b543cbf7a23428925ca97b530f6',
};

const prodSettings = {
  ...devSettings,
};

const settings =
  process.env.NODE_ENV === 'production' ? prodSettings : devSettings;
export default settings;
