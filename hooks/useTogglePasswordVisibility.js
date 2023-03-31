import { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [password, setPassword] = useState(true);
  const [icon, setIcon] = useState("eye-off");

  const onClickIcon = () => {
    if (icon === "eye") {
      setIcon("eye-off");
      setPassword(!password);
    } else if (icon === "eye-off") {
      setIcon("eye");
      setPassword(!password);
    }
  };

  return {
    password,
    icon,
    onClickIcon,
  };
};

export const useTogglePasswordVisibilitySignUp = () => {
  const [passwordConf, setPassword] = useState(true);
  const [iconConf, setIcon] = useState("eye-off");

  const onClickIconConf = () => {
    if (iconConf === "eye") {
      setIcon("eye-off");
      setPassword(!passwordConf);
    } else if (iconConf === "eye-off") {
      setIcon("eye");
      setPassword(!passwordConf);
    }
  };

  return {
    passwordConf,
    iconConf,
    onClickIconConf,
  };
};
