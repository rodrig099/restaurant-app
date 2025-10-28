import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useOrders } from '../../src/context/OrderContext';
import { colors } from '../../src/utils/colors';

export default function OrdersScreen() {
  const router = useRouter();
  const { orders } = useOrders();

  const formatPrice = (price) => {
    return `$${price.toLocaleString('es-CO')}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Entregado':
        return colors.success;
      case 'En camino':
        return colors.warning;
      case 'En preparación':
        return colors.primary;
      case 'Confirmado':
        return '#3498db';
      case 'Cancelado':
        return colors.textLight;
      default:
        return colors.primary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Entregado':
        return '✅';
      case 'En camino':
        return '🚗';
      case 'En preparación':
        return '👨‍🍳';
      case 'Confirmado':
        return '📋';
      case 'Cancelado':
        return '❌';
      default:
        return '📦';
    }
  };

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📦</Text>
        <Text style={styles.emptyTitle}>No tienes pedidos aún</Text>
        <Text style={styles.emptySubtitle}>¡Realiza tu primer pedido!</Text>
        <TouchableOpacity 
          style={styles.shopButton}
          onPress={() => router.push('/main/home')}
        >
          <Text style={styles.shopButtonText}>Explorar menú</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Pedidos</Text>
        <Text style={styles.headerSubtitle}>{orders.length} pedidos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {orders.map((order) => (
          <TouchableOpacity 
            key={order.id} 
            style={styles.orderCard}
            onPress={() => router.push({
              pathname: '/order-detail',
              params: { orderId: order.id }
            })}
          >
            <View style={styles.orderHeader}>
              <View style={styles.orderHeaderLeft}>
                <Text style={styles.statusIcon}>{getStatusIcon(order.status)}</Text>
                <View>
                  <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                  <Text style={styles.orderDate}>{order.date} • {order.time}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                  {order.status}
                </Text>
              </View>
            </View>

            <View style={styles.orderDivider} />

            <View style={styles.orderItems}>
              {order.items.slice(0, 2).map((item, index) => (
                <Text key={index} style={styles.itemText}>
                  {item.image} {item.name} x{item.quantity}
                </Text>
              ))}
              {order.items.length > 2 && (
                <Text style={styles.moreItems}>
                  +{order.items.length - 2} producto(s) más
                </Text>
              )}
            </View>

            <View style={styles.orderFooter}>
              <View>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalText}>{formatPrice(order.total)}</Text>
              </View>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>Ver detalles →</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
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
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  orderDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  orderItems: {
    marginBottom: 12,
  },
  itemText: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 4,
  },
  moreItems: {
    fontSize: 12,
    color: colors.textLight,
    fontStyle: 'italic',
    marginTop: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  detailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primary + '10',
  },
  detailsButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 32,
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  shopButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});