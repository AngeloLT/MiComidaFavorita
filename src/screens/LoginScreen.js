import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('Home');
        } catch (error) {
            setError('Error al iniciar sesión: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Mi Comida Favorita</Text>
            
            {loading && <ActivityIndicator size="large" color="#58d66b" style={styles.loading} />}

            <Input
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                inputStyle={styles.inputText}
                leftIcon={<Icon name="email" type="material" color="#58d66b" />}
            />

            <Input
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureText}
                inputStyle={styles.inputText}
                leftIcon={<Icon name="lock" type="material" color="#58d66b" />}
                rightIcon={
                    <Icon
                        name={secureText ? 'eye-off' : 'eye'}
                        type="ionicon"
                        color="#58d66b"
                        onPress={() => setSecureText(!secureText)}
                    />
                }
            />

            {error && !loading && (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            )}

            <Button
                title="Iniciar Sesión"
                onPress={handleLogin}
                buttonStyle={styles.primaryButton}
                titleStyle={styles.primaryButtonText}
                containerStyle={styles.buttonContainer}
                disabled={loading}
            />

            <Button
                title="Registrarse"
                type="outline"
                onPress={() => navigation.navigate('Register')}
                buttonStyle={styles.outlineButton}
                titleStyle={styles.outlineButtonText}
                containerStyle={styles.buttonContainer}
                disabled={loading}
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'left',
    },
    loading: {
        marginBottom: 20,
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