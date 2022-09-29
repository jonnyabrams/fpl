import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import { useGetOverviewQuery } from "./redux/fplSlice";
import * as GlobalConstants from "./globals/constants";
import FixturesView from "./features/Fixtures/FixturesView";
import PlayerSearch from "./features/PlayerStats/PlayerSearch";
import LineupContainer from "./features/GameStats/LineupContainer";

const MainPage = () => {
  const overview = useGetOverviewQuery();

  return (
    <SafeAreaView style={styles.safeArea}>
      {overview.isSuccess == true && (
        <>
          <View style={styles.fixturesView}>
            <FixturesView overview={overview.data} />
          </View>
          <View style={styles.playerSearchView}>
            <PlayerSearch />
          </View>
          <View style={styles.lineupView}>
            <LineupContainer />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  safeArea: {
    backgroundColor: GlobalConstants.primaryColor,
    flex: 1,
    marginTop: "0%",
  },

  fixturesView: {
    flex: 2,
  },

  playerSearchView: {
    flex: 1,
  },

  lineupView: {
    flex: 10,
  },
});

export default MainPage;
