import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { colors } from '../../src/utils/colors';

export default function HomeScreen() {
  const { user, isGuest, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/auth/welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      {isGuest ? (
        <Text style={styles.subtitle}>Estás navegando como invitado</Text>
      ) : (
        <Text style={styles.subtitle}>Hola, {user?.name || 'Usuario'}</Text>
      )}
      
      <Text style={styles.info}>Pantalla Home - Próximamente aquí verás el menú</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>
          {isGuest ? 'Volver al inicio' : 'Cerrar sesión'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textLight,
    marginBottom: 40,
  },
  info: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});