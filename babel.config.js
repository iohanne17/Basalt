module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@Screens": "./src/screens",
          underscore: "lodash",
          "@Libs": "./src/lib",
          "@Features": "./src/features",
          "@Config": "./src/config",
          "@Components": "./src/lib/components",
          "@Theme": "./src/lib/theme",
          "@Utils": "./src/lib/utils",
          "@Assets": "./assets",
          "@Hooks": "./src/apiHooks",
          "@Hoc/*": ["src/hoc"]
        },
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
      },
    ],
  ],
};
