import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../assets/Colors';

const ChangeSettings = ({ visible, message, type, onClose }) => {
  const [text, setText] = useState('');

  const getTypePlaceholder = () => {
    switch (type) {
      case 'Nombre':
        return 'Ingrese su nombre';
      case 'Peso':
        return 'Ingrese su peso';
      case 'Altura':
        return 'Ingrese su altura';
      case 'Edad':
        return 'Ingrese su edad';
      default:
        return 'Ingrese un valor';
    }
  };

  const getStorageKey = () => {
    switch (type) {
      case 'Nombre':
        return 'username';
      case 'Peso':
        return 'user_weight';
      case 'Altura':
        return 'user_height';
      case 'Edad':
        return 'user_age';
      default:
        return 'user_data';
    }
  };

  const SaveData = async () => {
    const key = getStorageKey();
    try {
      await AsyncStorage.setItem(key, text);
      console.log(`Guardado ${type}: ${text} en AsyncStorage con clave ${key}`);
      setText(''); // Limpiar el campo de texto después de guardar
    } catch (error) {
      console.error('Error al guardar en AsyncStorage:', error);
    }
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer]}>
          <Text style={styles.message}>{message}</Text>
          <TextInput
            style={styles.input}
            placeholder={getTypePlaceholder()}
            placeholderTextColor={Colors.textSecondary}
            keyboardType={
              type === 'Nombre' || type === 'Altura' ? 'default' : 'numeric'
            }
            onChangeText={setText}
            value={text}
          />

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={SaveData} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    width: '45%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: Colors.button,
  },
  closeButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ChangeSettings;
