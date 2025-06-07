import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../assets/Colors";

const RecommendedExercise = ({ img, type, details }) => {
  return (
    <View style={styles.container}>
      <View style={{width: '60%'}}>
        <Text style={styles.text}>{type}</Text>
        <Text style={[styles.text, { color: Colors.textSecondary }]}>
          {details}
        </Text>
        <Text style={[styles.text, { color: Colors.textSecondary}]}>
          Mas detalles..
        </Text>
      </View>
      <Image
        source={{ uri: img }}
        style={{ width: 150, height: 80, borderRadius: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    width: "95%",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.textPrimary,
    textAlign: "left",
  },
});

export default RecommendedExercise;
