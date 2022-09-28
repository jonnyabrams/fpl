import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import MainPage from "./MainPage";

const App = () => {
  return (
    <View style={styles.container}>
      <MainPage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default App;
