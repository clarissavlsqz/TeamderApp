import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const BEHAVIOR = Platform.OS === "ios" ? "padding" : "height";

const EnhancedKeyboardAvoidingView = ({ children }) => (
  <KeyboardAvoidingView behavior={BEHAVIOR} style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {children}
      </ScrollView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EnhancedKeyboardAvoidingView;
