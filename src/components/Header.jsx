import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { Colors } from "../Assets/Colors";

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <FontAwesome6
        name="house"
        size={30}
        color="black"
        style={{ marginBottom: -3, opacity: 0 }} // Ajusta la posición del ícono
      />

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity>
        <FontAwesome6
          name="gear"
          size={28}
          iconStyle="solid"
          color={Colors.textPrimary}
          style={{ marginBottom: -3 }} // Ajusta la posición del ícono
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.textPrimary
  },
});

export default Header;
