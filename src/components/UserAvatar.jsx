import React from "react";
import { Avatar } from "react-native-ui-lib";
import { MaterialIcons } from "@expo/vector-icons";
import LocalImages from "../../assets/images/LocalImages";

const images = [
  "blackbird",
  "butterfly",
  "chicken",
  "cow",
  "duck",
  "ganesha",
  "ostrich",
  "panda",
  "parrot",
  "pelican",
  "scavenging",
  "shark",
  "turtle",
];

const getRandomImage = () =>
  LocalImages.avatars[images[Math.floor(images.length * Math.random())]];

const UserAvatar = ({ user, size = 32, ...rest }) => (
  <Avatar
    label={`${user.firstName[0]}${user.lastName[0]}`}
    size={size}
    source={getRandomImage()}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  />
);

export default UserAvatar;
