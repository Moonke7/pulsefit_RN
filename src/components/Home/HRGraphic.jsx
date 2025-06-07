import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native"; // Importa Dimensions para obtener el ancho de la pantalla
import { Colors } from "../../assets/Colors";

const HRGraphic = ({heartRate}) => {
  const data = {
    labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    datasets: [
      {
        data: [65, 70, 75, 80, 78, 72], // Valores de FC correspondientes a las horas
        color: (opacity = 1) => `rgba(132, 111, 110, ${opacity})`, // Color de la línea
        strokeWidth: 1, // Grosor de la línea
      },
    ],
  };

  const allDataPointsIndices = data.datasets[0].data.map((_, index) => index);

  return (
    <View style={styles.graphicContainer}>
      <View style={{}}>
        <Text style={[styles.text, {paddingBottom: 0}]}> Ritmo cardiaco</Text>
        <Text style={[styles.text, { fontSize: 26, fontWeight: "500", paddingTop: 0 }]}>
          {heartRate} BPM prom.
        </Text>
      </View>

      <LineChart
        data={data}
        width={Dimensions.get("window").width - 70} // Ancho del gráfico
        height={220} // Altura del gráfico
        yAxisLabel="" // Etiqueta del eje Y
        withInnerLines={false} // Oculta las líneas internas de la cuadrícula
        withOuterLines={false} // Oculta las líneas externas de la cuadrícula
        hidePointsAtIndex={allDataPointsIndices} // Oculta todos los puntos de datos
        chartConfig={{
          backgroundGradientFrom: Colors.background, // Fondo transparente
          backgroundGradientTo: Colors.background, // Fondo transparente
          decimalPlaces: 0, // Número de decimales en los valores
          color: (opacity = 1) => `rgba(132, 111, 110, ${opacity})`, // Color de las etiquetas
          labelColor: (opacity = 1) => `rgba(132, 111, 110, ${opacity})`,
          style: {
            borderRadius: 16,
            backgroundColor: Colors.background,
            marginLeft: -20
          },
          propsForBackgroundLines: {
            strokeWidth: 0, // Elimina las líneas de fondo
          },
        }}
        bezier // Hace que la línea sea curva
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  graphicContainer: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    marginHorizontal: 20,
    borderRadius: 16,
    marginVertical: 20,
  },
  text: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "400",
    color: Colors.textPrimary,
    padding: 20,
  },
});

export default HRGraphic;
