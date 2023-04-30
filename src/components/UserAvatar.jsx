import React from "react";
import { Avatar } from "react-native-ui-lib";

const UserAvatar = ({ user, size = 32 }) => (
  <Avatar label={`${user.firstName[0]}${user.lastName[0]}`} size={size} />
);

export default UserAvatar;
