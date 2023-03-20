import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const personalityTypes = [
  { label: "INTJ", value: "INTJ" },
  { label: "INTP", value: "INTP" },
  { label: "ENTJ", value: "ENTJ" },
  { label: "ENTP", value: "ENTP" },
  { label: "INFJ", value: "INFJ" },
  { label: "INFP", value: "INFP" },
  { label: "ENFJ", value: "ENFJ" },
  { label: "ENFP", value: "ENFP" },
  { label: "ISTJ", value: "ISTJ" },
  { label: "ISFJ", value: "ISFJ" },
  { label: "ESTJ", value: "ESTJ" },
  { label: "ESFJ", value: "ESFJ" },
  { label: "ISTP", value: "ISTP" },
  { label: "ISFP", value: "ISFP" },
  { label: "ESTP", value: "ESTP" },
  { label: "ESFP", value: "ESFP" },
];

export default function SignUpView() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [personality, setPersonality] = useState("");

  return (
    <SafeAreaView>
      <Text>Let's create your account</Text>
      <TextInput
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First name"
      />
      <TextInput
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last name"
      />
      <TextInput onChangeText={setEmail} value={email} placeholder="Email" />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <TextInput
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm password"
      />
      <SelectList
        setSelected={setPersonality}
        data={personalityTypes}
        save="value"
        search={false}
      />
      <TouchableOpacity onPress={() => Alert.alert("Create Button pressed")}>
        <Text> Create </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
