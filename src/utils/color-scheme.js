require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
const { Colors, ThemeManager } = require("react-native-ui-lib");

Colors.loadDesignTokens({ primaryColor: "#E07000" });

Colors.loadColors({
  error: "#ff2442",
  success: "#00CD8B",
  text: "#20303C",
});

ThemeManager.setComponentTheme("Text", (props) => ({
  style: [
    {
      fontFamily: "Poppins-Regular",
    },
    props.style,
  ],
}));

ThemeManager.setComponentTheme("Button", (props) => ({
  labelStyle: [
    {
      fontFamily: "Poppins-Bold",
    },
    props.labelStyle,
  ],
}));

Colors.loadSchemes({
  light: {
    screenBG: "transparent",
    screenPop: "#fff",
    inputOutline: "#c2c2c2",
    textColor: Colors.grey10,
    moonOrSun: Colors.yellow30,
    mountainForeground: Colors.green30,
    mountainBackground: Colors.green50,
    $backgroundSuccess: Colors.green40,
    $backgroundSuccessLight: Colors.green70,
  },
  dark: {
    screenBG: Colors.grey10,
    screenPop: "#000",
    inputOutline: "#c2c2c2",
    textColor: Colors.white,
    moonOrSun: Colors.grey80,
    mountainForeground: Colors.violet10,
    mountainBackground: Colors.violet20,
    $backgroundSuccess: Colors.green40,
    $backgroundSuccessLight: Colors.green20,
  },
});
