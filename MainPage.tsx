import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import FixturesView from "./features/fixtures/FixturesView";
import PlayerSearch from "./features/playerStats/PlayerSearch";
import LineupContainer from "./features/gameStats/LineupContainer";
import { useGetOverviewQuery } from "./redux/fplSlice";
import * as GlobalConstants from "./globals/constants";

const MainPage = () => {
  const overview = useGetOverviewQuery();

  return (
    <SafeAreaView style={styles.safeArea}>
      {overview.isSuccess == true && (
        <>
          <View>
            <FixturesView overview={overview.data} />
          </View>
          <View style={styles.playerSearchView}>
            <PlayerSearch />
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

  playerSearchView: {
    flex: 1,
  },

  fixturesView: {
    flex: 2,
  },

  lineupView: {
    flex: 10,
  },
});

export default MainPage;
