import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Colors} from '../assets/Colors';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import Header from '../components/Header';
import Exercise from '../components/Train/Exercise';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecommendedExercise from '../components/Train/RecommendedExercise';

const selectPic = exerciseType => {
  switch (exerciseType) {
    case 'running':
      return 'https://img.freepik.com/foto-gratis/ilustracion-persona-corriendo_23-2151859227.jpg?t=st=1743644815~exp=1743648415~hmac=243f6931a679f0d27f517c6fc5531c7d5b881d6fec660964fe6c01c0a577aa0b&w=1380';
    case 'cycling':
      return 'https://img.freepik.com/foto-gratis/mujer-montando-bicicleta-canasta-parte-delantera_23-2151848748.jpg?t=st=1743645513~exp=1743649113~hmac=161078224e748f1e8957d94b6140c7801f7bf883d3aa46aa8f3dc419e2aa5b29&w=1380';
    case 'swimming':
      return 'https://img.freepik.com/foto-gratis/competencia-natacion-estilo-papel_23-2148930682.jpg?ga=GA1.1.968735233.1748207521&semt=ais_hybrid&w=740';
    case 'walking':
      return 'https://img.freepik.com/foto-gratis/ilustracion-persona-corriendo_23-2151859198.jpg?t=st=1743645277~exp=1743648877~hmac=7f27ae4fc835c57e9afebade1e579cf4df97a6d2ec4762a1806188cedda38ae5&w=1380';
    case 'stairs':
      return 'https://img.freepik.com/vector-premium/pies-zapatillas-rojas-correr-atleta-subiendo-escaleras-entrenamiento-cardiovascular_308019-331.jpg?ga=GA1.1.968735233.1748207521&semt=ais_hybrid&w=740';
    case 'cuerda':
      return 'https://img.freepik.com/vector-premium/ilustracion-diseno-pisos-actividades-fin-semana_176417-6290.jpg?w=1380';
    case 'aerobic':
      return 'https://img.freepik.com/vector-gratis/ilustracion-clase-fitness-baile-dibujado-mano-plana_23-2148863976.jpg?ga=GA1.1.968735233.1748207521&semt=ais_hybrid&w=740';
    case 'HIIT':
      return 'https://img.freepik.com/vector-premium/mujer-haciendo-sentarse-alfombra-ilustracion-diseno-plano_207579-1467.jpg?ga=GA1.1.968735233.1748207521&semt=ais_hybrid&w=740';
    case 'gym':
      return 'https://img.freepik.com/vector-gratis/fondo-gimnasio-deporte-maquinas-ejercicios-estilo-plano_23-2147796330.jpg?ga=GA1.1.968735233.1748207521&semt=ais_hybrid&w=740';
    case 'pushup':
      return 'https://img.freepik.com/vector-premium/push-up-ejercicio-mujer-entrenamiento-fitness-aerobicos-ejercicios_476141-923.jpg?ga=GA1.1.968735233.1748207521&semt=ais_hybrid&w=740';
    case 'relaxation':
      return 'https://img.freepik.com/vector-premium/banner-web-2d-relajacion-playa-verano-cartel_151150-5227.jpg?w=1380';
    case 'plank':
      return 'https://img.freepik.com/vector-premium/ejercicio-tabla-antebrazo-entrenamiento-hombres-fitness-aerobico-ejercicios_476141-848.jpg?ga=GA1.1.968735233.1748207521&semt=ais_hybrid&w=740';
    case 'dance':
      return 'https://img.freepik.com/vector-gratis/ilustracion-clase-fitness-baile-dibujado-mano-plana_52683-56750.jpg?t=st=1748209780~exp=1748213380~hmac=6ca82201171c4a956612e5b5a0cb254e1be9286764082e627a5d50ba329dee37&w=1380';
  }
};

const selectDetails = exercise => {
  if ('duracion_min' in exercise && 'duracion_max' in exercise) {
    return `${exercise.duracion_min}–${exercise.duracion_max} min`;
  }

  if ('duracion_minutos' in exercise) {
    return `${exercise.duracion_minutos} min`;
  }

  if ('duracion_seg' in exercise) {
    return `${exercise.duracion_seg} seg`;
  }

  if ('duracion_seg_por_pierna' in exercise) {
    return `${exercise.duracion_seg_por_pierna} seg por pierna`;
  }

  if ('series' in exercise && 'repeticiones' in exercise) {
    return `${exercise.series}×${exercise.repeticiones}`;
  }

  if (
    'series' in exercise &&
    'repeticiones_min' in exercise &&
    'repeticiones_max' in exercise
  ) {
    return `${exercise.series}×${exercise.repeticiones_min}-${exercise.repeticiones_max}`;
  }

  if ('series' in exercise && 'duracion_serie_min' in exercise) {
    return `${exercise.series}×${exercise.duracion_serie_min} min`;
  }

  if (
    'rondas' in exercise &&
    'trabajo_seg' in exercise &&
    'descanso_seg' in exercise
  ) {
    return `${exercise.rondas} rondas de ${exercise.trabajo_seg}s trabajo / ${exercise.descanso_seg}s descanso`;
  }

  if (
    'intervalos' in exercise &&
    'distancia_intervalo_m' in exercise &&
    'descanso_seg' in exercise
  ) {
    return `${exercise.intervalos}×${exercise.distancia_intervalo_m}m con ${exercise.descanso_seg}s de descanso`;
  }

  if ('frecuencia_diaria' in exercise) {
    return `${exercise.frecuencia_diaria} vez al día`;
  }

  if ('frecuencia_semana' in exercise) {
    return `${exercise.frecuencia_semana}×/semana`;
  }

  return 'Sin datos específicos';
};

const Training = () => {
  const [exercisesData, setExercisesData] = useState(null);
  const [exerciseDate, setExerciseDate] = useState(null);

  const navigation = useNavigation();

  const goToUpdate = () => {
    navigation.navigate('UpdateTrain');
  };

  useEffect(() => {
    const loadExercises = async () => {
      await AsyncStorage.getItem('workout')
        .then(data => {
          if (data) {
            const datas = JSON.parse(data);
            setExercisesData(datas.exercisesData);
            setExerciseDate(datas.fecha);
          } else {
            console.log('No hay datos de ejercicios almacenados.');
          }
        })
        .catch(error => {
          console.error('Error al obtener los datos de ejercicios:', error);
        });
    };
    loadExercises();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{alignItems: 'center', paddingBottom: 20}}>
      <Header title="Entrenamiento actual" />
      <Text style={styles.text}>Running</Text>
      <Text style={[styles.text, {color: Colors.textSecondary, fontSize: 16}]}>
        Fecha inicio: {exerciseDate ? exerciseDate : 'N/A'}
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

      {exercisesData &&
        exercisesData.map((exercise, index) => {
          return (
            <View key={index} style={{width: '100%', alignItems: 'center'}}>
              <Exercise
                img={selectPic(exercise.primero.categoria)}
                type={exercise.primero.nombre}
                detail={selectDetails(exercise.primero)}
              />
              <Exercise
                img={selectPic(exercise.segundo.categoria)}
                type={exercise.segundo.nombre}
                detail={selectDetails(exercise.segundo)}
              />
            </View>
          );
        })}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
