import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
    const [profile, setProfile] = useState({
        nombre: '',
        apellido: '',
        comidaFavorita: '',
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const docRef = doc(db, 'usuarios', auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data());
            }
        } catch (error) {
            console.error('Error al cargar perfil:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await setDoc(doc(db, 'usuarios', auth.currentUser.uid), profile);
            alert('Perfil actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            alert('Error al actualizar perfil');
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigation.replace('Login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Agregar Nuevo Registro</Text>

            <Input
                placeholder="Nombre"
                value={profile.nombre}
                onChangeText={(text) => setProfile({ ...profile, nombre: text })}
                leftIcon={<Icon name="person" type="material" color="#58d66b" />}
                inputStyle={styles.inputText}
                containerStyle={styles.inputContainer}
            />

            <Input
                placeholder="Apellido"
                value={profile.apellido}
                onChangeText={(text) => setProfile({ ...profile, apellido: text })}
                leftIcon={<Icon name="person" type="material" color="#58d66b" />}
                inputStyle={styles.inputText}
                containerStyle={styles.inputContainer}
            />

            <Input
                placeholder="Comida Favorita"
                value={profile.comidaFavorita}
                onChangeText={(text) => setProfile({ ...profile, comidaFavorita: text })}
                leftIcon={<Icon name="restaurant" type="material" color="#58d66b" />}
                inputStyle={styles.inputText}
                containerStyle={styles.inputContainer}
            />

            <Button
                title="Actualizar Perfil"
                onPress={handleUpdate}
                buttonStyle={styles.primaryButton}
                titleStyle={styles.primaryButtonText}
                containerStyle={styles.buttonContainer}
            />

            <Button
                title="Cerrar Sesión"
                type="outline"
                onPress={handleSignOut}
                buttonStyle={styles.outlineButton}
                titleStyle={styles.outlineButtonText}
                containerStyle={styles.buttonContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputText: {
        fontSize: 16,
        color: '#333',
    },
    primaryButton: {
        backgroundColor: '#58d66b',
        borderRadius: 8,
        paddingVertical: 12,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    outlineButton: {
        borderColor: '#58d66b',
        borderWidth: 2,
        borderRadius: 8,
        paddingVertical: 12,
    },
    outlineButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    buttonContainer: {
        marginVertical: 10,
    },
});