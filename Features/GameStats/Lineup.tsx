import { Image, StyleSheet, View } from "react-native";

import PlayerGamePointsImage from "./PlayerGamePointsImage";

const Lineup = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.field}
        source={require("../../assets/threequartersfield.jpeg")}
      />
      <View style={styles.playerContainer}>
        <View style={styles.playerRowContainer}>
          <PlayerGamePointsImage />
        </View>
        <View style={styles.playerRowContainer}>
          <PlayerGamePointsImage />
          <PlayerGamePointsImage />
          <PlayerGamePointsImage />
          <PlayerGamePointsImage />
          <PlayerGamePointsImage />
        </View>
        <View style={styles.playerRowContainer}>
          <PlayerGamePointsImage />
          <PlayerGamePointsImage />
          <PlayerGamePointsImage />
        </View>
        <View style={styles.playerRowContainer}>
          <PlayerGamePointsImage />
          <PlayerGamePointsImage />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  field: {
    width: "100%",
    height: "107.5%",
    alignSelf: "center",
    position: "absolute",
  },

  playerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  playerRowContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default Lineup;
