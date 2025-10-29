import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../src/utils/colors';

export default function SettingsScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const SettingItem = ({ icon, title, subtitle, value, onValueChange }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primary + '80' }}
        thumbColor={value ? colors.primary : colors.card}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="🔔"
              title="Notificaciones Push"
              subtitle="Recibe notificaciones en tu dispositivo"
              value={pushNotifications}
              onValueChange={setPushNotifications}
            />
            <SettingItem
              icon="📧"
              title="Notificaciones por Email"
              subtitle="Recibe actualizaciones por correo"
              value={emailNotifications}
              onValueChange={setEmailNotifications}
            />
            <SettingItem
              icon="📦"
              title="Actualizaciones de Pedidos"
              subtitle="Estado de tus pedidos"
              value={orderUpdates}
              onValueChange={setOrderUpdates}
            />
            <SettingItem
              icon="🎁"
              title="Promociones y Ofertas"
              subtitle="Recibe ofertas especiales"
              value={promotions}
              onValueChange={setPromotions}
            />
          </View>
        </View>

        {/* Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apariencia</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="🌙"
              title="Modo Oscuro"
              subtitle="Próximamente disponible"
              value={darkMode}
              onValueChange={setDarkMode}
            />
          </View>
        </View>

        {/* Language */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Idioma</Text>
          <TouchableOpacity style={styles.languageButton}>
            <View style={styles.languageLeft}>
              <Text style={styles.languageIcon}>🌍</Text>
              <Text style={styles.languageText}>Español</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Cache */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Almacenamiento</Text>
          <TouchableOpacity style={styles.cacheButton}>
            <Text style={styles.cacheIcon}>🗑️</Text>
            <Text style={styles.cacheText}>Limpiar caché</Text>
          </TouchableOpacity>
          <Text style={styles.cacheInfo}>Libera espacio eliminando datos temporales</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: colors.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  settingsGroup: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: colors.textLight,
  },
  languageButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  languageText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  arrow: {
    fontSize: 24,
    color: colors.textLight,
  },
  cacheButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  cacheIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cacheText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  cacheInfo: {
    fontSize: 12,
    color: colors.textLight,
    paddingHorizontal: 4,
  },
});