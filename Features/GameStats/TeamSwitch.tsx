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
import { FixtureInfo, toggleTeamShown } from "../../redux/fixtureSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as GlobalConstants from "../../globals/constants";
import { GetTeamDataFromOverviewWithFixtureTeamID } from "../../helpers/fplApiHelpers";
import { FplFixture } from "../../models/FplFixtures";

var viewWidth: number;

const getViewWidth = (event: LayoutChangeEvent) => {
  viewWidth = event.nativeEvent.layout.width;
};

const TeamSwitch = () => {
  const fixtureInfo: FixtureInfo | null = useAppSelector(
    (state) => state.fixture
  );
  const overview = useGetOverviewQuery();
  const dispatch = useAppDispatch();
  const translateAnim = useRef(new Animated.Value(0)).current;

  const switchTeam = () => {
    Animated.spring(translateAnim, {
      toValue: fixtureInfo.isHome ? viewWidth / 2 + 1 : 0,
      friction: 10,
      useNativeDriver: true,
    }).start();

    dispatch(toggleTeamShown());
  };

  return (
    <View style={styles.container} onLayout={(event) => getViewWidth(event)}>
      {fixtureInfo.fixture !== null && overview.data !== undefined && (
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
              <Text style={styles.text}>
                {
                  GetTeamDataFromOverviewWithFixtureTeamID(
                    fixtureInfo.fixture.team_h,
                    overview.data
                  ).short_name
                }
              </Text>
              <Text style={styles.text}>
                {
                  GetTeamDataFromOverviewWithFixtureTeamID(
                    fixtureInfo.fixture.team_a,
                    overview.data
                  ).short_name
                }
              </Text>
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
