import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import FixturesView from "./Features/Fixtures/FixturesView";
import PlayerSearch from "./Features/PlayerStats/PlayerSearch";
import LineupContainer from "./Features/GameStats/LineupContainer";
import { useGetOverviewQuery } from "./redux/fplSlice";

const MainPage = () => {
  const overview = useGetOverviewQuery();

  return (
    <View>
      <Text>MainPage</Text>
    </View>
  );
};

export default MainPage;
