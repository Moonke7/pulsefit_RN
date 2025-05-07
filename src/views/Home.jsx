import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { ProgressBar } from "react-native-paper";
import Header from "../components/Header";
import WorkingZone from "../components/Home/WorkingZone";
import { Colors } from "../Assets/Colors";
import HRGraphic from "../components/Home/HRGraphic";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header title="Inicio" />
      <WorkingZone />
      <HRGraphic />

      <TouchableOpacity style={styles.button}>
        <Text style={{color: Colors.textPrimary, fontSize: 16}}>Empezar entrenamiento</Text>
        <FontAwesome6 name="dumbbell" size={24} iconStyle="solid" color="white" />
      </TouchableOpacity>
    </View>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: Colors.background,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: Colors.button,
    padding: 12,
    borderRadius: 16,
    width: "90%",
    marginVertical: 20
  }
});

export default Home;
