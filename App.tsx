import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import store from "./redux/store";
import { useGetOverviewQuery } from "./redux/fplSlice";
import MainPage from "./MainPage";

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainPage />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default App;
