import React from "react";
import { Avatar } from "react-native-ui-lib";
import LocalImages from "../../assets/images/LocalImages";

const getAvatar = (avatar) =>
  avatar ? LocalImages.avatars[avatar] : undefined;

const UserAvatar = ({ user, size = 32, overrideAvatar, ...rest }) => (
  <Avatar
    label={`${user.firstName[0]}${user.lastName[0]}`}
    size={size}
    source={getAvatar(overrideAvatar ?? user.avatar)}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  />
);

export default UserAvatar;
