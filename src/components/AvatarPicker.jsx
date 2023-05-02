import React, { useMemo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  Avatar,
  Colors,
  Dialog,
  GridView,
  Spacings,
  Text,
  View,
} from "react-native-ui-lib";
import { FontAwesome } from "@expo/vector-icons";
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

const AvatarPicker = ({ visible, onDismiss, selectedAvatar, selectAvatar }) => {
  const items = useMemo(
    () =>
      images.map((imageName) => ({
        renderCustomItem: () => (
          <View flex center marginB-10>
            {imageName === selectedAvatar ? (
              <Avatar
                source={LocalImages.avatars[imageName]}
                badgePosition="BOTTOM_RIGHT"
                badgeProps={{
                  customElement: (
                    <FontAwesome name="check" size={14} color="black" />
                  ),
                  size: 28,
                }}
              />
            ) : (
              <Avatar source={LocalImages.avatars[imageName]} />
            )}
          </View>
        ),
        onPress: () => selectAvatar(imageName),
        title: imageName,
        titleLines: 2,
      })),
    [selectAvatar, selectedAvatar]
  );

  return (
    <Dialog
      visible={visible}
      onDismiss={onDismiss}
      width="100%"
      height="80%"
      bottom
      useSafeArea
      renderPannableHeader={() => (
        <View marginB-20>
          <View margin-20>
            <Text $textDefault>Choose your Avatar</Text>
          </View>
          <View height={2} bg-grey70 />
        </View>
      )}
      containerStyle={{ backgroundColor: Colors.$backgroundDefault }}
    >
      <ScrollView>
        <GridView
          items={items}
          numColumns={3}
          itemSpacing={Spacings.s3}
          listPadding={Spacings.s5}
        />
      </ScrollView>
    </Dialog>
  );
};

export default AvatarPicker;
