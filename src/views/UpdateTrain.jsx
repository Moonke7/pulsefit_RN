import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {Colors} from '../assets/Colors';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import RecommendedExercise from '../components/Train/RecommendedExercise';
import {useNavigation} from '@react-navigation/native';
import {use, useEffect, useState} from 'react';
import {cardioPool} from '../assets/Cardio_pool';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadTensorflowModel} from 'react-native-fast-tflite';

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

const UpdateTrain = () => {
  const [userData, setUserData] = useState(null);
  const [exercisesData, setExercisesData] = useState(null);
  const [firstExerciseIndex, setFirstExerciseIndex] = useState([]);
  const [secondExerciseIndex, setSecondExerciseIndex] = useState([]);
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate('MainTabs', {screen: 'Train'});
  };

  // arreglos
  const firstExerciseUsed = [];
  const secondExerciseUsed = [];

  const [model, setModel] = useState(null);

  /* useEffect(() => {
    const initModel = async () => {
      try {
        const modelAsset = Image.resolveAssetSource(
          require('./assets/modelo.tflite'),
        );
        const loadedModel = await loadTensorflowModel(modelAsset.uri);
        setModel(loadedModel);
        console.log('✅ Modelo cargado:', loadedModel);
      } catch (err) {
        console.error('❌ Error al cargar el modelo:', err);
      }
    };

    initModel();
  }, []);
 */
  /* const runLocalModel = async inputData => {
    if (!model) {
      console.error('❌ Modelo no cargado');
      return;
    }
    try {
      const outputData = await model.run(inputData);
      console.log('✅ Resultado del modelo:', outputData);
      return outputData;
    } catch (err) {
      console.error('❌ Error al ejecutar el modelo:', err);
      return null;
    }
  }; */

  useEffect(() => {
    const loadData = async () => {
      //const userId = 4; // Cambia esto por el ID del usuario que deseas cargar

      try {
        const userId = await AsyncStorage.getItem('userId');
        const userIdParsed = userId ? JSON.parse(userId) : null;

        let json = AsyncStorage.getItem('userData');
        console.log('userdata', json);
        if (json._k != null) {
          json = JSON.parse(json);
          setUserData(json);
          console.log('Datos de usuario cargados desde AsyncStorage:', json);
        } else {
          console.log('No se encontraron datos de usuario en AsyncStorage');

          // obteniendolos datos del usuario desde la API
          const data = await fetch(
            `http://34.226.157.153:8000/userData/${userIdParsed}`,
          );
          json = await data.json();
          setUserData(json);
          console.log('Datos de usuario obtenidos de la API:', json);

          // guardar data en async storage
          await AsyncStorage.setItem('userData', JSON.stringify(json));
          console.log('Datos de usuario guardados en AsyncStorage:', json);
        }

        // transformar los datos a los tipos correspondientes
        const edad = parseInt(json.edad);
        const fc_reposo = parseFloat(json.ultima_fc_reposo);
        const fc_promedio = parseFloat(json.ultima_fc_rutina);
        const imc = parseFloat(json.imc);
        const dias_entrenando = parseInt(json.dias_login);

        // obtener prediccion con los datos
        const prediction = await fetch(`http://34.226.157.153:8000/predecir`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            edad,
            fc_reposo,
            fc_promedio,
            imc,
            dias_entrenando,
          }),
        });

        const predictionJson = await prediction.json();
        console.log('Predicción:', predictionJson);

        // obtener ejercicios recomendados segun la prediccion
        const exerIndex = predictionJson.prediccion_binaria
          .map((value, index) => (value === 1 ? index : -1))
          .filter(index => index !== -1);
        console.log('Ejercicios recomendados:', exerIndex);

        const recommendedExercises = cardioPool
          .map((exercise, index) => {
            //verificar si el ejercicio esta en el indice de la prediccion
            if (exerIndex.includes(index)) {
              // escoger 2 ejercicios aleatorios de los 6 posibles
              let randomIndex1 = Math.floor(Math.random() * 6);
              let randomIndex2;
              do {
                randomIndex2 = Math.floor(Math.random() * 6);
              } while (randomIndex2 === randomIndex1);
              // guardar los indices de los ejercicios seleccionados
              setFirstExerciseIndex([index, randomIndex1]);
              setSecondExerciseIndex([index, randomIndex2]);
              firstExerciseUsed.push(randomIndex1);
              secondExerciseUsed.push(randomIndex2);

              return {
                primero: cardioPool[index][randomIndex1],
                segundo: cardioPool[index][randomIndex2],
              };
            }
          })
          .filter(exercise => exercise !== undefined);

        setExercisesData(recommendedExercises);
        console.log('Ejercicios recomendados:', recommendedExercises);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    };

    loadData();
  }, []);

  // Función para cambiar el ejercicio
  const changeExercise = index => {
    // cambiar el ejercicio 1 o 2 segun el indice
    if (index === 1) {
      // Cambiar el primer ejercicio
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * 6);
      } while (firstExerciseUsed.includes(newIndex));
      firstExerciseUsed.push(newIndex);
      setFirstExerciseIndex([firstExerciseIndex[0], newIndex]);

      const oldExercises = exercisesData;
      oldExercises[0].primero = cardioPool[firstExerciseIndex[0]][newIndex];
      setExercisesData([...oldExercises]);
    } else if (index === 2) {
      // Cambiar el segundo ejercicio
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * 6);
      } while (secondExerciseUsed.includes(newIndex));
      secondExerciseUsed.push(newIndex);
      setSecondExerciseIndex([secondExerciseIndex[0], newIndex]);
      const oldExercises = exercisesData;
      oldExercises[0].segundo = cardioPool[secondExerciseIndex[0]][newIndex];
      setExercisesData([...oldExercises]);
    }
  };

  const saveWorkout = async () => {
    // guardar en el async storage el entrenamiento actualizado
    await AsyncStorage.setItem(
      'workout',
      JSON.stringify({exercisesData, fecha: new Date().toLocaleDateString()}),
    );
    console.log(
      'Entrenamiento actualizado guardado en AsyncStorage:',
      exercisesData,
    );
    // redireccionar a la pantalla de entrenamiento

    navigation.navigate('MainTabs', {screen: 'Train'});
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
      }}
      style={styles.container}>
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
          <FontAwesome6 name="bolt" iconStyle="solid" size={24} color="white" />
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
      {exercisesData &&
        exercisesData.map((exercise, index) => {
          const exerciseType = Object.keys(exercise)[0];
          const exercise1 = exercise[0];
          const exercise2 = exercise[1];
          console.log('Ejercicio 1:', exercise.primero);

          return (
            <View key={index} style={{width: '90%'}}>
              <RecommendedExercise
                img={selectPic(exercise.primero.categoria)}
                type={exercise.primero.nombre}
                details={selectDetails(exercise.primero)}
              />
              <RecommendedExercise
                img={selectPic(exercise.segundo.categoria)}
                type={exercise.segundo.nombre}
                details={selectDetails(exercise.segundo)}
              />
            </View>
          );
        })}

      <TouchableOpacity style={styles.button} onPress={saveWorkout}>
        <Text style={{color: Colors.textPrimary, fontSize: 16}}>
          Actualizar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default UpdateTrain;
