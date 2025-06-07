import {
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {Colors} from '../../assets/Colors';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const Setting = ({title, actual, setChangeType}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{title}</Text>
        <Text style={[styles.text, {color: Colors.textSecondary}]}>
          {actual}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setChangeType(title)}>
        <Text style={[styles.text, {color: Colors.button}]}>Cambiar</Text>
        <FontAwesome6
          name="pen-to-square"
          size={20}
          iconStyle="solid"
          color={Colors.button}
          style={{marginBottom: -3}} // Ajusta la posición del ícono
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textPrimary,
  },
  button: {
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 10,
  },
});

export default Setting;
