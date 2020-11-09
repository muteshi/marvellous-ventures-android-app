import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import AppText from "./AppText";
import PickerItem from "./PickerItem";

function RoomPicker({ icon, items, placeholder, onSelectRoom, selectedRoom }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.secondary}
              style={styles.icon}
            />
          )}
          <AppText style={styles.text}>
            {selectedRoom.includes(0) ? placeholder : selectedRoom}
          </AppText>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.secondary}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={items}
          keyExtractor={(item) => item.qty.toString()}
          renderItem={({ item }) => (
            <PickerItem
              label={item.label}
              onPress={() => {
                setModalVisible(false);
                onSelectRoom(item);
              }}
            />
          )}
        />
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: defaultStyles.colors.secondary,
    flexDirection: "row",
    padding: 15,
    // marginVertical: 5,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
    marginTop: 5,
  },
  text: {
    flex: 1,
  },
});

export default RoomPicker;
