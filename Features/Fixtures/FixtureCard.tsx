import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import moment from "moment-timezone";
import * as Localization from "expo-localization";

import { FplFixtures } from "../../models/FplFixtures";
import { FplOverview } from "../../models/FplOverview";
import * as GlobalConstants from "../../globals/constants";
import TeamEmblem from "./TeamEmblem";

interface FixtureCardProp {
  fixture: FplFixtures | undefined;
  overview: FplOverview | undefined;
}

const FixtureCard = (prop: FixtureCardProp) => {
  return (
    <View style={styles.container}>
      {prop.fixture !== undefined && prop.overview !== undefined && (
        <View style={styles.card}>
          <View style={styles.topbar}>
            <Text style={styles.datetext}>{ moment(prop.fixture.kickoff_time).tz(Localization.timezone).format('MMM d, h:mm z') }</Text>
          </View>
          <View style={styles.scoreview}>
            <TeamEmblem team={prop.overview.teams[0]} />
            <Text style={styles.scoretext}>vs</Text>
            <TeamEmblem team={prop.overview.teams[1]} />
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
  scoreview: {
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 1,
    padding: 3,
  },

  scoretext: {
    fontSize: 0.03 * GlobalConstants.width,
    alignSelf: "center",
    margin: 5,
  },
  //#endregion
});

export default FixtureCard;
