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
