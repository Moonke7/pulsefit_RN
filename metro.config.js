const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Asegúrate de agregar .tflite a assetExts
defaultConfig.resolver.assetExts.push('tflite');

module.exports = mergeConfig(defaultConfig, {});
