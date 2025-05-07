import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Colors} from '../Assets/Colors';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import Header from '../components/Header';
import Exercise from '../components/Train/Exercise';
import {useNavigation} from '@react-navigation/native';

const Training = () => {
  const navigation = useNavigation();

  const goToUpdate = () => {
    navigation.navigate('UpdateTrain');
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{alignItems: 'center', paddingBottom: 20}}>
      <Header title="Entrenamiento actual" />
      <Text style={styles.text}>Running</Text>
      <Text style={[styles.text, {color: Colors.textSecondary, fontSize: 16}]}>
        Fecha inicio: 01/02/2025
      </Text>

      <TouchableOpacity style={styles.button} onPress={goToUpdate}>
        <Text style={{color: Colors.textPrimary, fontSize: 16}}>
          Actualizar entrenamiento
        </Text>
        <FontAwesome6
          name="rotate-right"
          size={24}
          iconStyle="solid"
          color="white"
        />
      </TouchableOpacity>

      <Text style={styles.text}>Entrenamiento</Text>

      <Exercise
        img={
          'https://img.freepik.com/foto-gratis/ilustracion-persona-corriendo_23-2151859198.jpg?t=st=1743645277~exp=1743648877~hmac=7f27ae4fc835c57e9afebade1e579cf4df97a6d2ec4762a1806188cedda38ae5&w=1380'
        }
        type="Trote suave"
        detail={'10 min'}
      />

      <Exercise
        img={
          'https://img.freepik.com/foto-gratis/ilustracion-personas-corriendo_23-2151859193.jpg?ga=GA1.1.611274559.1743644796&semt=ais_hybrid&w=740'
        }
        type="Correr moderado"
        detail={'5 - 8 km'}
      />

      <Exercise
        img={
          'https://img.freepik.com/foto-gratis/mujer-montando-bicicleta-canasta-parte-delantera_23-2151848748.jpg?t=st=1743645513~exp=1743649113~hmac=161078224e748f1e8957d94b6140c7801f7bf883d3aa46aa8f3dc419e2aa5b29&w=1380'
        }
        type="Bicicleta"
        detail={'5 - 8 km'}
      />

      <Exercise
        img="https://img.freepik.com/foto-gratis/ilustracion-persona-corriendo_23-2151859227.jpg?t=st=1743644815~exp=1743648415~hmac=243f6931a679f0d27f517c6fc5531c7d5b881d6fec660964fe6c01c0a577aa0b&w=1380"
        type="Correr rápido"
        detail={'10 - 15 km'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: Colors.background,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    backgroundColor: Colors.button,
    padding: 12,
    borderRadius: 16,
    width: '90%',
    marginVertical: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: '400',
    color: Colors.textPrimary,
    textAlign: 'left',
    width: '90%',
  },
});

export default Training;
