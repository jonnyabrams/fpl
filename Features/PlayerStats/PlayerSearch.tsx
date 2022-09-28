import {
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as GlobalConstants from "../../globals/constants";

const onTablePress = () => {};

const PlayerSearch = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchbox} placeholder="Search player..." />
      <TouchableOpacity
        style={styles.button}
        onPress={onTablePress}
      >
        <Image style={styles.tableImage} source={require('../../assets/tablet.png')} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: 0,
    paddingRight: 5,
    paddingLeft: 5,
  },

  searchbox: {
    flex: 1,
    height: 40,
    marginRight: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: GlobalConstants.tertiaryColor,
    borderRadius: GlobalConstants.cornerRadius,
  },

  button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    backgroundColor: GlobalConstants.tertiaryColor,
    borderRadius: GlobalConstants.cornerRadius,
  },

  tableImage: {
    height: "65%",
    width: "65%",
    alignSelf: "center",
  },
});

export default PlayerSearch;
