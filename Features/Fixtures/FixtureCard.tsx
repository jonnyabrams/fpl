import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import moment from "moment-timezone";
import * as Localization from "expo-localization";

import { FplFixture } from "../../models/FplFixtures";
import { FplOverview } from "../../models/FplOverview";
import * as GlobalConstants from "../../globals/constants";
import TeamEmblem from "./TeamEmblem";

interface FixtureCardProp {
  fixture: FplFixture | undefined;
  overview: FplOverview | undefined;
}

const FixtureCard = (prop: FixtureCardProp) => {
  const getTeam = (teamNumber: number) => {
    return prop.overview!.teams.filter((team) => team.id == teamNumber);
  };

  const setScoreAndTime = () => {
    if (prop.fixture !== undefined) {
      if (prop.fixture.finished == true) {
        return (
          <>
            <Text style={styles.scoreText}>
              {prop.fixture.team_h_score} - {prop.fixture.team_a_score}
            </Text>
            <Text style={styles.timeText}>FT</Text>
          </>
        );
      } else if (prop.fixture.started == true) {
        return (
          <Text style={styles.scoreText}>
            {prop.fixture.team_h_score} - {prop.fixture.team_a_score}
          </Text>
        );
      } else {
        return <Text style={styles.scoreText}>vs</Text>;
      }
    }
  };

  return (
    <View style={styles.container}>
      {prop.fixture !== undefined && prop.overview !== undefined && (
        <View style={styles.card}>
          <View style={styles.topbar}>
            <Text style={styles.datetext}>
              {moment(prop.fixture.kickoff_time)
                .tz(Localization.timezone)
                .format("MMM D, h:mm z")}
            </Text>
          </View>
          <View style={styles.scoreView}>
            <TeamEmblem team={getTeam(prop.fixture.team_h)} />
            <Text style={styles.scoreAndTimeView}>{ setScoreAndTime() }</Text>
            <TeamEmblem team={getTeam(prop.fixture.team_a)} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  //#region main layout
  container: {
    height: "100%",
    width: GlobalConstants.width * 0.33,
    paddingLeft: 5,
  },

  card: {
    backgroundColor: GlobalConstants.tertiaryColor,
    height: "100%",
    borderRadius: GlobalConstants.cornerRadius,
    flexDirection: "column",
    padding: 4,
  },
  //#endregion

  //#region  top bar
  topbar: {
    alignSelf: "center",
    height: "25%",
    width: "100%",
  },

  datetext: {
    fontSize: 0.03 * GlobalConstants.width,
    alignSelf: "center",
    paddingLeft: 5,
    color: "gray",
  },

  //#endregion

  //#region score
  scoreView: {
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 1,
    padding: 3,
  },

  scoreAndTimeView: {},

  scoreText: {
    fontSize: 0.04 * GlobalConstants.width,
    alignSelf: "center",
    margin: 2,
  },
  timeText: {
    fontSize: 0.025 * GlobalConstants.width,
    alignSelf: "center",
    color: "gray",
  },
  //#endregion
});

export default FixtureCard;
