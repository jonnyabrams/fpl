import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useGetFixturesQuery, useGetOverviewQuery } from "../../redux/fplSlice";
import { FplOverview } from "../../models/FplOverview";
import * as GlobalConstants from "../../globals/constants";
import FixtureCard from "./FixtureCard";
import LineupContainer from "../GameStats/LineupContainer";
import PlayerSearch from "../PlayerStats/PlayerSearch";
import { FplFixture } from "../../models/FplFixtures";
import { fixtureChanged, removeFixture } from "../../redux/fixtureSlice";

interface FixturesViewProp {
  overview: FplOverview | undefined;
}

const isThereMatchInProgress = (
  gameweekNumber: number,
  fixtures: FplFixture[]
): boolean => {
  return fixtures
    .filter((event) => {
      return event.id === gameweekNumber;
    })
    .some((event) => {
      return event.finished === false && event.started === true;
    });
};

const sortFixtures = (fixture1: FplFixture, fixture2: FplFixture): number => {
  if (fixture1.finished !== true && fixture2.finished === true) {
    return -1;
  }
  return 0;
};

const FixturesView = (prop: FixturesViewProp) => {
  const dispatch = useAppDispatch();
  const liveGameweek = prop.overview?.events.filter((event) => {
    return event.is_current == true;
  })[0].id;
  const [gameweekNumber, setGameweekNumber] = useState(liveGameweek);
  const fixtures = useGetFixturesQuery();

  useEffect(
    function setSelectedFixture() {
      let sortedGameweekFixtures: FplFixture[] | undefined = fixtures.data
        ?.filter((fixture) => {
          return fixture.event == gameweekNumber;
        })
        .sort((fixture1, fixture2) => sortFixtures(fixture1, fixture2));

      if (sortedGameweekFixtures !== undefined) {
        if (sortedGameweekFixtures[0].started === true) {
          dispatch(fixtureChanged(sortedGameweekFixtures[0]));
        } else {
          dispatch(removeFixture());
        }
      }
    },
    [gameweekNumber]
  );

  useEffect(
    function refetchLiveGameweekData() {
      let refetch: NodeJS.Timer;

      if (gameweekNumber !== undefined && fixtures.data !== undefined) {
        if (
          gameweekNumber === liveGameweek &&
          isThereMatchInProgress(gameweekNumber, fixtures.data)
        ) {
          refetch = setInterval(() => fixtures.refetch(), 30000);
        }
      }

      return function stopRefetchingLiveGameweekData() {
        if (refetch !== undefined) {
          clearInterval(refetch);
        }
      };
    },
    [gameweekNumber]
  );

  return (
    <View style={styles.container}>
      <View style={styles.gameweekView}>
        <RNPickerSelect
          value={gameweekNumber}
          onValueChange={(value) => setGameweekNumber(value)}
          style={pickerSelectStyles}
          items={prop.overview!.events.map((event) => {
            return { label: event.name, value: event.id };
          })}
        />
      </View>

      {fixtures.isSuccess == true && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.fixturesView}
        >
          {fixtures.data !== undefined &&
            fixtures.data
              .filter((fixture) => {
                return fixture.event == gameweekNumber;
              })
              .sort((fixture1, fixture2) => sortFixtures(fixture1, fixture2))
              .map((fixture) => {
                return <FixtureCard key={fixture.code} fixture={fixture} />;
              })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 5,
  },

  gameweekView: {
    height: 30,
    margin: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
  },

  fixturesView: {
    flex: 2,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: GlobalConstants.width * 0.04,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: GlobalConstants.textPrimaryColor,
    borderRadius: GlobalConstants.cornerRadius,
    backgroundColor: GlobalConstants.secondayColor,
  },
  inputAndroid: {
    fontSize: GlobalConstants.width * 0.04,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: GlobalConstants.textPrimaryColor,
    borderRadius: GlobalConstants.cornerRadius,
    backgroundColor: GlobalConstants.secondayColor,
  },
});

export default FixturesView;
