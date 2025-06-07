import {StyleSheet, Text, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {Colors} from '../../assets/Colors';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const WorkingZone = ({heartRate}) => {
  // simular una variacion de frecuencia cardiaca
  const [edad, setEdad] = useState(19); // Estado para la edad

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const storedEdad = await AsyncStorage.getItem('user_age');
          if (storedEdad) {
            setEdad(parseInt(storedEdad, 10)); // Convierte a número entero
          }
        } catch (error) {
          console.error('Error al obtener datos de AsyncStorage:', error);
        }
      };
      getData();
    }, [])
  );

  // estimar zona de trabajo
  const fcMax = 208 - 0.7 * edad; // FCmáx ≈ 194.7

  const porcentajeFC = (heartRate / fcMax) * 100;

  let zona = '';
  if (porcentajeFC < 70) {
    zona = 'Zona 1: Muy ligera';
  } else if (porcentajeFC < 85) {
    zona = 'Zona 2: Moderada';
  } else {
    zona = 'Zona 3: Intensa';
  }

  //console.log(`Zona de trabajo: ${porcentajeFC}`);

  return (
    <View style={styles.container}>
      <View style={styles.TextContainer}>
        <Text style={styles.text}> {heartRate} BPM</Text>
      </View>
      <ProgressBar
        progress={porcentajeFC / 100}
        color={Colors.textPrimary}
        style={styles.progressBar}
      />
      <Text
        style={{color: Colors.textSecondary, marginTop: 10, paddingLeft: 10}}>
        {zona}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  TextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textPrimary,
  },
});

export default WorkingZone;
