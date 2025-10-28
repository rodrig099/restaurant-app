import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAddress } from '../src/context/AddressContext';
import { useAuth } from '../src/context/AuthContext';
import { useCart } from '../src/context/CartContext';
import { useOrders } from '../src/context/OrderContext';
import { colors } from '../src/utils/colors';

export default function CheckoutScreen() {
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { getDefaultAddress } = useAddress();
  const { user, isGuest } = useAuth();
  const { addOrder } = useOrders();

  const deliveryAddress = getDefaultAddress();
  const subtotal = getCartTotal();
  const deliveryFee = 5000;
  const total = subtotal + deliveryFee;

  const formatPrice = (price) => {
    return `$${price.toLocaleString('es-CO')}`;
  };

  const handlePlaceOrder = () => {
  if (isGuest) {
    Alert.alert(
      'Iniciar sesión',
      'Debes iniciar sesión para realizar un pedido',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Iniciar sesión',
          onPress: () => router.replace('/auth/login'),
        },
      ]
    );
    return;
  }

  if (!deliveryAddress) {
    Alert.alert('Error', 'Debes agregar una dirección de entrega');
    return;
  }

  // Crear y guardar el pedido
  const orderData = {
  items: cartItems.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
    description: item.description,
    category: item.category,
    rating: item.rating,
    preparationTime: item.preparationTime,
  })),
  subtotal,
  deliveryFee,
  total,
  address: deliveryAddress,
  paymentMethod: 'Efectivo contra entrega',
};

  const newOrder = addOrder(orderData);
  clearCart();
  
  router.push({
    pathname: '/order-confirmation',
    params: { 
      orderId: newOrder.id,
      total: newOrder.total,
    }
  });
};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmar Pedido</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📍 Dirección de entrega</Text>
            <TouchableOpacity onPress={() => router.push('/addresses')}>
              <Text style={styles.changeButton}>Cambiar</Text>
            </TouchableOpacity>
          </View>
          {deliveryAddress ? (
            <View style={styles.addressCard}>
              <Text style={styles.addressName}>{deliveryAddress.name}</Text>
              <Text style={styles.addressText}>{deliveryAddress.fullAddress}</Text>
              <Text style={styles.addressText}>
                {deliveryAddress.city}, {deliveryAddress.department}
              </Text>
              {deliveryAddress.instructions && (
                <Text style={styles.instructions}>📝 {deliveryAddress.instructions}</Text>
              )}
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.addAddressButton}
              onPress={() => router.push('/add-address')}
            >
              <Text style={styles.addAddressText}>+ Agregar dirección</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛒 Tu pedido</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemEmoji}>{item.image}</Text>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
                </View>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                <Text style={styles.itemTotal}>
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💵 Método de pago</Text>
          <View style={styles.paymentCard}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentIcon}>💵</Text>
              <View style={styles.paymentTextContainer}>
                <Text style={styles.paymentTitle}>Efectivo contra entrega</Text>
                <Text style={styles.paymentSubtitle}>
                  Paga al domiciliario cuando recibas tu pedido
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📄 Resumen del pedido</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Domicilio</Text>
              <Text style={styles.summaryValue}>{formatPrice(deliveryFee)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabelTotal}>Total a pagar</Text>
              <Text style={styles.summaryValueTotal}>{formatPrice(total)}</Text>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Asegúrate de tener el monto exacto en efectivo para facilitar la entrega
          </Text>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderButtonText}>Confirmar pedido</Text>
          <Text style={styles.placeOrderTotal}>{formatPrice(total)}</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  changeButton: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  addressCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  instructions: {
    fontSize: 13,
    color: colors.textLight,
    fontStyle: 'italic',
    marginTop: 8,
  },
  addAddressButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  addAddressText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 12,
    color: colors.textLight,
  },
  itemRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  itemQuantity: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  paymentCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  paymentTextContainer: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  paymentSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  summaryLabelTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  summaryValueTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  infoCard: {
    backgroundColor: colors.warning + '15',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  placeOrderButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeOrderTotal: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});