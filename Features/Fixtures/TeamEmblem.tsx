import { View, Image, Text, StyleSheet } from "react-native";

import * as GlobalConstants from "../../globals/constants";
import { emblems } from "../../globals/images";
import { Team } from "../../Models/FplOverview";

interface TeamEmblemProp {
  team: Team | undefined;
}

const TeamEmblem = (prop: TeamEmblemProp) => {
  return (
    <View style={styles.teamInfoView}>
      {prop.team !== undefined && (
        <>
          <Image
            style={styles.emblems}
            source={emblems[prop.team.code]}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 0.025 * GlobalConstants.width,
              alignSelf: "center",
            }}
          >
            {prop.team.short_name}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  teamInfoView: {
    width: "40%",
    justifyContent: "center",
  },

  emblems: {
    alignSelf: "center",
    width: "100%",
    height: "65%",
  },
});

export default TeamEmblem;
