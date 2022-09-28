import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import FixturesView from "./features/fixtures/FixturesView";
import PlayerSearch from "./features/playerStats/PlayerSearch";
import LineupContainer from "./features/gameStats/LineupContainer";
import { useGetOverviewQuery } from "./redux/fplSlice";

const MainPage = () => {
  const overview = useGetOverviewQuery();

  return (
    <SafeAreaView>
      {overview.isSuccess == true && (
        <View>
          <FixturesView overview={overview.data} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MainPage;
