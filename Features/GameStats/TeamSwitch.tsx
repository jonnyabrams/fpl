import { useRef } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableHighlight,
  Animated,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
} from "react-native";

import { useGetFixturesQuery, useGetOverviewQuery } from "../../redux/fplSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as GlobalConstants from "../../globals/constants";
import { GetTeamDataFromOverviewWithFixtureTeamID } from "../../helpers/fplApiHelpers";
import { FplFixture } from "../../models/FplFixtures";

var viewWidth: number;

const getViewWidth = (event: LayoutChangeEvent) => {
  viewWidth = event.nativeEvent.layout.width;
};

const TeamSwitch = () => {
  const currentFixture: FplFixture | null = useAppSelector(
    (state) => state.fixture
  );
  const overview = useGetOverviewQuery();
  const translateAnim = useRef(new Animated.Value(0)).current;
  var isHome = true;

  const switchTeam = () => {
    Animated.spring(translateAnim, {
      toValue: isHome ? viewWidth / 2 + 1 : 0,
      friction: 10,
      useNativeDriver: true,
    }).start();

    isHome = !isHome;
  };

  return (
    <View style={styles.container} onLayout={(event) => getViewWidth(event)}>
      {currentFixture !== null && overview.data !== undefined && (
        <>
          <Animated.View
            style={[
              styles.highlight,
              {
                transform: [
                  { translateX: translateAnim },
                  { perspective: 100 },
                ],
              },
            ]}
          />
          <TouchableWithoutFeedback style={styles.button} onPress={switchTeam}>
            <View style={styles.buttonContainer}>
              <Text style={styles.text}>{ GetTeamDataFromOverviewWithFixtureTeamID(currentFixture.team_h, overview.data) }</Text>
              <Text style={styles.text}>{ GetTeamDataFromOverviewWithFixtureTeamID(currentFixture.team_a, overview.data) }</Text>
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "70%",
    alignItems: "center",
    backgroundColor: GlobalConstants.tertiaryColor,
    borderRadius: GlobalConstants.cornerRadius,
  },

  highlight: {
    height: "100%",
    width: "50%",
    backgroundColor: GlobalConstants.secondayColor,
    position: "absolute",
    borderRadius: GlobalConstants.cornerRadius,
  },

  button: {
    height: "70%",
    justifyContent: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    width: GlobalConstants.width * 0.17,
    fontSize: GlobalConstants.width * 0.04,
    textAlign: "center",
  },
});

export default TeamSwitch;
