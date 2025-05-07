import { Image, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../../Assets/Colors";

const Exercise = ({ img, type, detail }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: img }}
        style={{ width: "100%", height: 150, borderRadius: 16 }}
      />
      <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <View>
          <Text style={styles.text}>{type}</Text>
          <Text style={[styles.text, { color: Colors.textSecondary }]}>
            {detail} 
          </Text>
        </View>
        <Text style={[styles.text, { color: Colors.textSecondary, width: "40%" }]}>
          Mas detalles..
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    width: "90%",
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.textPrimary,
    width: "100%",
    textAlign: "left",
  },
});

export default Exercise;
