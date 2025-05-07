import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors} from '../../Assets/Colors';

const ChangeSettings = ({visible, message, type, onClose}) => {
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
    }
  };

  const SaveData = () => {
    // Aquí puedes agregar la lógica para guardar los datos ingresados
    console.log(`Guardando ${type}: ${text}`);
    // Luego cierra el modal
    onClose();
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer]}>
          <Text style={styles.message}>{message}</Text>
          <TextInput
            style={styles.input}
            placeholder={getTypePlaceholder()} // Set placeholder based on type
            placeholderTextColor={Colors.textSecondary} // Placeholder color
            keyboardType={type === 'nombre' ? 'default' : 'numeric'} // Set keyboard type based on type
            onChangeText={text => setText(text)} // Handle input change
            value={text}
          />

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
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
