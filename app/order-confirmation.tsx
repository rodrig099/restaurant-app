import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../src/utils/colors';

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const formatPrice = (price) => {
    return `$${Number(price).toLocaleString('es-CO')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.successIcon}>✅</Text>
        </View>

        {/* Success Message */}
        <Text style={styles.title}>¡Pedido Confirmado!</Text>
        <Text style={styles.subtitle}>
          Tu pedido ha sido recibido y está siendo preparado
        </Text>

        {/* Order Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Número de pedido</Text>
            <Text style={styles.infoValue}>#{params.orderId}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total pagado</Text>
            <Text style={styles.infoValueBold}>{formatPrice(params.total)}</Text>
          </View>
        </View>

        {/* Estimated Time */}
        <View style={styles.timeCard}>
          <Text style={styles.timeIcon}>⏱️</Text>
          <Text style={styles.timeText}>Tiempo estimado de entrega</Text>
          <Text style={styles.timeValue}>30 - 45 minutos</Text>
        </View>

        {/* Track Order Info */}
        <View style={styles.trackInfo}>
          <Text style={styles.trackText}>
            Puedes hacer seguimiento de tu pedido en la sección de "Pedidos"
          </Text>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/main/orders')}
        >
          <Text style={styles.primaryButtonText}>Ver mis pedidos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/main/home')}
        >
          <Text style={styles.secondaryButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 180,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: colors.success + '20',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    fontSize: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    color: colors.textLight,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  infoValueBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  timeCard: {
    backgroundColor: colors.primary + '10',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  trackInfo: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  trackText: {
    fontSize: 13,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
});