import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [validationMessages, setValidationMessages] = useState([]);

    // Validación desglosada
    const validatePassword = (password) => {
        const messages = [];
        if (!/(?=.*[a-z])/.test(password)) messages.push("Falta una letra minúscula");
        if (!/(?=.*[A-Z])/.test(password)) messages.push("Falta una letra mayúscula");
        if (!/(?=.*\d)/.test(password)) messages.push("Falta un número");
        if (!/(?=.*[!@#$%^&*])/.test(password)) messages.push("Falta un carácter especial (!@#$%^&*)");
        if (password.length < 6) messages.push("La contraseña debe tener al menos 6 caracteres");

        setValidationMessages(messages);
    };

    const handleRegister = async () => {
        if (!email.includes("@")) {
            setError("Por favor, ingresa un email válido.");
            return;
        }

        if (validationMessages.length > 0) {
            setError("La contraseña no cumple los requisitos.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            navigation.replace('Home');
        } catch (error) {
            setError('Error al registrarse: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Crear Cuenta</Text>
            
            <Input
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                inputStyle={styles.inputText}
                leftIcon={<Icon name="email" type="material" color="#58d66b" />}
                errorMessage={error && error.includes("email") ? error : ""}
                errorStyle={styles.errorText}
                containerStyle={styles.inputContainer}
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
                errorMessage={validationMessages.length > 0 ? "La contraseña no cumple todos los requisitos." : ""}
                errorStyle={styles.errorText}
                containerStyle={styles.inputContainer}
            />

            {validationMessages.length > 0 && (
                <View style={styles.validationContainer}>
                    {validationMessages.map((msg, index) => (
                        <Text key={index} style={styles.validationText}>
                            - {msg}
                        </Text>
                    ))}
                </View>
            )}

            <Button
                title="Registrarse"
                onPress={handleRegister}
                buttonStyle={styles.primaryButton}
                titleStyle={styles.primaryButtonText}
                containerStyle={styles.buttonContainer}
            />

            <Button
                title="Volver al Login"
                type="outline"
                onPress={() => navigation.navigate('Login')}
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
    errorText: {
        color: 'red',
        fontSize: 14,
    },
    validationContainer: {
        marginVertical: 10,
    },
    validationText: {
        color: 'red',
        fontSize: 14,
        marginVertical: 2,
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