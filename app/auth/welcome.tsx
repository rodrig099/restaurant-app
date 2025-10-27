import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../src/utils/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🍔</Text>
        <Text style={styles.title}>Bienvenido a</Text>
        <Text style={styles.restaurantName}>Delicias Express</Text>
        <Text style={styles.subtitle}>Tu comida favorita a domicilio</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/auth/register')}
        >
          <Text style={styles.secondaryButtonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.guestButton}
          onPress={() => router.push('/main/home')}
        >
          <Text style={styles.guestButtonText}>Continuar como invitado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: colors.textLight,
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestButton: {
    padding: 16,
    alignItems: 'center',
  },
  guestButtonText: {
    color: colors.textLight,
    fontSize: 14,
  },
});