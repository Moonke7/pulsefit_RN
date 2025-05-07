import {StyleSheet, View, Text} from 'react-native';
import Header from '../components/Header';
import {Colors} from '../Assets/Colors';
import Setting from '../components/Settings/Setting';
import ChangeSettings from '../components/Settings/ChangeSetting';
import {useState} from 'react';

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleModalClose = type => {
    setModalVisible(true);
    setModalType(type);
  };

  return (
    <View style={styles.container}>
      <Header title="Configuración" />

      <Text style={styles.subTitle}>Datos de usuario</Text>
      <Setting
        title="Nombre"
        actual="Juan Duarte"
        setChangeType={handleModalClose}
      />
      <Setting title="Peso" actual="62Kg" setChangeType={handleModalClose} />
      <Setting title="Altura" actual="175cm" setChangeType={handleModalClose} />
      <Setting title="Edad" actual="19" setChangeType={handleModalClose} />
      <Text style={styles.subTitle}>Entrenamiento</Text>
      <Setting title="Deporte " actual="Running" />
      <Setting title="Enfermedad cardiov.." actual="N/A" />

      <ChangeSettings
        visible={modalVisible}
        message={`Cambiar ${modalType}`}
        type={modalType}
        onClose={() => setModalVisible(false)}
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
  subTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: Colors.textPrimary,
    width: '90%',
    textAlign: 'left',
    marginVertical: 10,
  },
});

export default Settings;
