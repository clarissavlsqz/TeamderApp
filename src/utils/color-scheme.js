require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
const { Colors } = require("react-native-ui-lib");

Colors.loadDesignTokens({ primaryColor: "#2B2343" });

Colors.loadColors({
  error: "#ff2442",
  success: "#00CD8B",
  text: "#20303C",
});

Colors.loadSchemes({
  light: {
    screenBG: "transparent",
    textColor: Colors.grey10,
    moonOrSun: Colors.yellow30,
    mountainForeground: Colors.green30,
    mountainBackground: Colors.green50,
    $backgroundSuccess: Colors.green40,
    $backgroundSuccessLight: Colors.green70,
  },
  dark: {
    screenBG: Colors.grey10,
    textColor: Colors.white,
    moonOrSun: Colors.grey80,
    mountainForeground: Colors.violet10,
    mountainBackground: Colors.violet20,
    $backgroundSuccess: Colors.green40,
    $backgroundSuccessLight: Colors.green20,
  },
});
