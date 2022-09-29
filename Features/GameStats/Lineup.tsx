import { Image, StyleSheet, View } from "react-native";

import { useGetGameweekDataQuery } from "../../redux/fplSlice";
import { useAppSelector } from "../../redux/hooks";
import { FplGameweek, Player } from "../../models/FplGameweek";
import PlayerGamePointsImage from "./PlayerGamePointsImage";

const Lineup = () => {
  const fixtureInfo = useAppSelector((state) => state.fixture);
  var gameweekData;

  if (fixtureInfo.fixture !== null && fixtureInfo.fixture.event !== null) {
    gameweekData = useGetGameweekDataQuery(fixtureInfo.fixture.event);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.field}
        source={require("../../assets/threequartersfield.jpeg")}
      />
      {fixtureInfo.fixture !== null && (
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
      )}
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
