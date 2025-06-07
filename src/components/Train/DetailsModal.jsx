import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const DetailsModal = ({ data, onClose, visible }) => {
    if (!data) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Detalles</Text>
                    <ScrollView style={{ maxHeight: 300 }}>
                        {Object.entries(data).map(([key, value]) => (
                            <View key={key} style={styles.row}>
                                <Text style={styles.key}>{key}:</Text>
                                <Text style={styles.value}>{String(value)}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 24,
        minWidth: 300,
        maxWidth: 350,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    key: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    value: {
        flex: 1,
        flexWrap: 'wrap',
    },
    button: {
        marginTop: 16,
        backgroundColor: '#1976d2',
        borderRadius: 4,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default DetailsModal;