import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { colors } from '../../src/utils/colors';

export default function ProfileScreen() {
  const { user, isGuest, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/auth/welcome');
          },
        },
      ]
    );
  };

  const MenuItem = ({ icon, title, onPress, danger = false }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuIcon}>{icon}</Text>
        <Text style={[styles.menuTitle, danger && styles.dangerText]}>{title}</Text>
      </View>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* User Info */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {isGuest ? 'Invitado' : user?.name || 'Usuario'}
            </Text>
            {!isGuest && (
              <Text style={styles.userEmail}>{user?.email}</Text>
            )}
          </View>
          {!isGuest && (
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Account Section */}
        {!isGuest && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cuenta</Text>
              <View style={styles.menuContainer}>
                <MenuItem icon="📍" title="Mis Direcciones" onPress={() => router.push('/addresses')} />
                <MenuItem icon="💳" title="Métodos de Pago" onPress={() => {}} />
                <MenuItem icon="🎟️" title="Cupones" onPress={() => {}} />
              </View>
            </View>

            {/* Preferences Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferencias</Text>
              <View style={styles.menuContainer}>
                <MenuItem icon="🔔" title="Notificaciones" onPress={() => {}} />
                <MenuItem icon="🌙" title="Modo Oscuro" onPress={() => {}} />
                <MenuItem icon="🌍" title="Idioma" onPress={() => {}} />
              </View>
            </View>
          </>
        )}

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soporte</Text>
          <View style={styles.menuContainer}>
            <MenuItem icon="❓" title="Ayuda" onPress={() => {}} />
            <MenuItem icon="📄" title="Términos y Condiciones" onPress={() => {}} />
            <MenuItem icon="🔒" title="Política de Privacidad" onPress={() => {}} />
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <View style={styles.menuContainer}>
            <MenuItem 
              icon="🚪" 
              title={isGuest ? "Iniciar Sesión" : "Cerrar Sesión"} 
              onPress={handleLogout}
              danger={!isGuest}
            />
          </View>
        </View>

        <Text style={styles.version}>Versión 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  scrollContainer: {
    padding: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: colors.card,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 32,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textLight,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: colors.text,
  },
  dangerText: {
    color: colors.primary,
  },
  menuArrow: {
    fontSize: 24,
    color: colors.textLight,
  },
  version: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: 12,
    marginTop: 20,
    marginBottom: 40,
  },
});