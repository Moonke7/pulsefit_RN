import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {Colors} from '../Assets/Colors';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import RecommendedExercise from '../components/Train/RecommendedExercise';
import {useNavigation} from '@react-navigation/native';

const UpdateTrain = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate('MainTabs', {screen: 'Train'});
  };

  return (
    <View style={styles.container}>
      <Header title="Actualizar entrenamiento" />

      <TouchableOpacity
        style={{width: '90%', position: 'absolute', top: 45}}
        onPress={goBack}>
        <FontAwesome6
          name="arrow-left"
          size={24}
          iconStyle="solid"
          color="white"
        />
      </TouchableOpacity>

      <Text style={[styles.text, {color: Colors.textSecondary, width: '90%'}]}>
        Actualiza tu entrenamiento basado en tu reciente ritmo cardiaco
      </Text>

      <View style={styles.infoContainer}>
        <View
          style={{
            padding: 18,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 16,
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome6 name="bolt" size={24} color="white" />
        </View>
        <View style={{width: '70%', justifyContent: 'center'}}>
          <Text style={styles.text}>Sugeridos para ti</Text>
          <Text
            style={[styles.text, {color: Colors.textSecondary, fontSize: 14}]}>
            Basado en tus entrenamientos recientes
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.text,
          {width: '90%', textAlign: 'left', marginTop: 0, fontSize: 22},
        ]}>
        Entrenamiento
      </Text>
      <RecommendedExercise
        img={
          'https://img.freepik.com/foto-gratis/ilustracion-persona-corriendo_23-2151859198.jpg?t=st=1743645277~exp=1743648877~hmac=7f27ae4fc835c57e9afebade1e579cf4df97a6d2ec4762a1806188cedda38ae5&w=1380'
        }
        type="Trote suave"
        details={'10 min'}
      />
      <RecommendedExercise
        img="https://img.freepik.com/foto-gratis/ilustracion-personas-corriendo_23-2151859241.jpg?ga=GA1.1.611274559.1743644796&semt=ais_hybrid&w=740"
        type="Carrera progresiva"
        details="5-8 km"
      />
      <RecommendedExercise
        img={
          'https://img.freepik.com/foto-gratis/ilustracion-personas-corriendo_23-2151859242.jpg?ga=GA1.1.611274559.1743644796&semt=ais_hybrid&w=740'
        }
        type="Carrera tempo"
        details={'6-7 km'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: Colors.background,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: '90%',
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textPrimary,
  },
});

export default UpdateTrain;
