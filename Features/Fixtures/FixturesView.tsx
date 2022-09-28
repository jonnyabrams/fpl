import { useState } from "react";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { FplOverview } from "../../models/FplOverview";

interface FixturesViewProp {
  overview: FplOverview | undefined;
}

const FixturesView = (prop: FixturesViewProp) => {
  const liveGameweek = prop.overview?.events.filter((event) => {
    return event.is_current == true;
  })[0].id;
  const [gameweekNumber, setGameweekNumber] = useState(liveGameweek);

  return (
    <View>
      <RNPickerSelect
        value={gameweekNumber}
        onValueChange={(value) => setGameweekNumber(value)}
        items={prop.overview!.events.map((event) => {
          return { label: event.name, value: event.id };
        })}
      />
    </View>
  );
};

export default FixturesView;
