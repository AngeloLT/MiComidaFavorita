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
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Validar formato de email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Por favor, ingresa un email válido.');
        } else {
            setEmailError('');
        }
    };

    // Validar que la contraseña no esté vacía
    const validatePassword = (password) => {
        if (password.trim() === '') {
            setPasswordError('La contraseña no puede estar vacía.');
        } else {
            setPasswordError('');
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        // Validar campos antes de continuar
        validateEmail(email);
        validatePassword(password);

        if (emailError || passwordError) {
            setLoading(false);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('Home');
        } catch (error) {
            setError('Error al iniciar sesión: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Función para verificar si el formulario es válido
    const isFormValid = () => {
        return email.trim() !== '' && password.trim() !== '' && !emailError && !passwordError;
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Mi Comida Favorita</Text>
            
            {loading && <ActivityIndicator size="large" color="#58d66b" style={styles.loading} />}

            <Input
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    validateEmail(text);
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                inputStyle={styles.inputText}
                leftIcon={<Icon name="email" type="material" color="#58d66b" />}
                errorMessage={emailError}
                errorStyle={styles.errorText}
            />

            <Input
                placeholder="Contraseña"
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    validatePassword(text);
                }}
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
                errorMessage={passwordError}
                errorStyle={styles.errorText}
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
                disabled={loading || !isFormValid()}
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