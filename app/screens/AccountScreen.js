import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import useAuth from "../auth/useAuth";
import Icon from "../components/Icon";

import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";

const menuItems = [
  {
    title: "Your bookings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: "Bookings",
  },
];

function AccountScreen({ navigation, route }) {
  const { user, logOut, logIn } = useAuth();

  return (
    <Screen style={styles.screen}>
      {user && (
        <View style={styles.container}>
          <ListItem
            title={user ? user.name : null}
            subTitle={user ? user.email : null}
            image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          />
        </View>
      )}
      {user && (
        <View style={styles.container}>
          <FlatList
            data={menuItems}
            keyExtractor={(menuItem) => menuItem.title}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                IconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
                onPress={() => navigation.navigate(item.targetScreen)}
              />
            )}
          />
        </View>
      )}
      {user ? (
        <ListItem
          title="Logout"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => logOut()}
        />
      ) : (
        <ListItem
          title="Login"
          IconComponent={<Icon name="login" backgroundColor="#ffe66d" />}
          onPress={() => navigation.navigate(routes.WELCOME_SCREEN)}
        />
      )}
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default AccountScreen;
