import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../src/context/CartContext";
import { useOrders } from "../src/context/OrderContext";
import { colors } from "../src/utils/colors";
import { products } from "../src/utils/mockData";

export default function OrderDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { getOrderById, reorderItems } = useOrders();
  const { addToCart } = useCart();

  const order = getOrderById(params.orderId);

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Pedido no encontrado</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatPrice = (price) => {
    return `$${price.toLocaleString("es-CO")}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Entregado":
        return colors.success;
      case "En camino":
        return colors.warning;
      case "En preparación":
        return colors.primary;
      case "Confirmado":
        return "#3498db";
      case "Cancelado":
        return colors.textLight;
      default:
        return colors.primary;
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { label: "Confirmado", icon: "📋", status: "Confirmado" },
      { label: "En preparación", icon: "👨‍🍳", status: "En preparación" },
      { label: "En camino", icon: "🚗", status: "En camino" },
      { label: "Entregado", icon: "✅", status: "Entregado" },
    ];

    const currentIndex = steps.findIndex(
      (step) => step.status === order.status
    );
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const handleReorder = () => {
    Alert.alert(
      "Repetir pedido",
      "¿Deseas agregar todos los productos de este pedido al carrito?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Agregar",
          onPress: () => {
            let totalItems = 0;
            let notFoundItems = 0;

            order.items.forEach((orderItem) => {
              // Buscar el producto actual en mockData
              const currentProduct = products.find(
                (p) => p.id === orderItem.id
              );

              if (currentProduct) {
                addToCart(currentProduct, orderItem.quantity);
                totalItems += orderItem.quantity;
              } else {
                notFoundItems++;
              }
            });

            if (notFoundItems > 0) {
              Alert.alert(
                "Atención",
                `${totalItems} producto(s) agregados. ${notFoundItems} producto(s) ya no están disponibles.`,
                [
                  {
                    text: "Ver carrito",
                    onPress: () => router.push("/main/cart"),
                  },
                  {
                    text: "OK",
                    style: "cancel",
                  },
                ]
              );
            } else {
              Alert.alert(
                "¡Listo!",
                `${totalItems} producto(s) agregados al carrito`,
                [
                  {
                    text: "Ver carrito",
                    onPress: () => router.push("/main/cart"),
                  },
                  {
                    text: "Seguir comprando",
                    onPress: () => router.push("/main/home"),
                  },
                ]
              );
            }
          },
        },
      ]
    );
  };

  const statusSteps = getStatusSteps();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => router.back()}
        >
          <Text style={styles.headerBackButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Pedido</Text>
        <View style={styles.headerBackButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Order Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Número de pedido</Text>
            <Text style={styles.infoValue}>{order.orderNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fecha y hora</Text>
            <Text style={styles.infoValue}>
              {order.date} • {order.time}
            </Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.statusContainer}>
            <Text style={styles.infoLabel}>Estado actual</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(order.status) + "20" },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(order.status) },
                ]}
              >
                {order.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Timeline */}
        {order.status !== "Cancelado" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Seguimiento</Text>
            <View style={styles.timeline}>
              {statusSteps.map((step, index) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View
                      style={[
                        styles.timelineIcon,
                        step.completed && styles.timelineIconCompleted,
                        step.active && styles.timelineIconActive,
                      ]}
                    >
                      <Text style={styles.timelineIconText}>{step.icon}</Text>
                    </View>
                    {index < statusSteps.length - 1 && (
                      <View
                        style={[
                          styles.timelineLine,
                          step.completed && styles.timelineLineCompleted,
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.timelineRight}>
                    <Text
                      style={[
                        styles.timelineLabel,
                        step.completed && styles.timelineLabelCompleted,
                      ]}
                    >
                      {step.label}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛒 Productos</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemEmoji}>{item.image}</Text>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    {formatPrice(item.price)}
                  </Text>
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

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Dirección de entrega</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressName}>{order.address.name}</Text>
            <Text style={styles.addressText}>{order.address.fullAddress}</Text>
            <Text style={styles.addressText}>
              {order.address.city}, {order.address.department}
            </Text>
            {order.address.instructions && (
              <Text style={styles.addressInstructions}>
                📝 {order.address.instructions}
              </Text>
            )}
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💵 Método de pago</Text>
          <View style={styles.paymentCard}>
            <Text style={styles.paymentText}>{order.paymentMethod}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📄 Resumen</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                {formatPrice(order.subtotal)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Domicilio</Text>
              <Text style={styles.summaryValue}>
                {formatPrice(order.deliveryFee)}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabelTotal}>Total</Text>
              <Text style={styles.summaryValueTotal}>
                {formatPrice(order.total)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Reorder Button */}
      {order.status === "Entregado" && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.reorderButton}
            onPress={handleReorder}
          >
            <Text style={styles.reorderButtonText}>🔄 Repetir pedido</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerBackButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBackButtonText: {
    fontSize: 28,
    color: colors.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.textLight,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  timeline: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timelineItem: {
    flexDirection: "row",
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 12,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.border,
  },
  timelineIconCompleted: {
    backgroundColor: colors.success + "20",
    borderColor: colors.success,
  },
  timelineIconActive: {
    backgroundColor: colors.primary + "20",
    borderColor: colors.primary,
  },
  timelineIconText: {
    fontSize: 18,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  timelineLineCompleted: {
    backgroundColor: colors.success,
  },
  timelineRight: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 8,
  },
  timelineLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  timelineLabelCompleted: {
    color: colors.text,
    fontWeight: "600",
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 12,
    color: colors.textLight,
  },
  itemRight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  itemQuantity: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  addressCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addressName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 4,
  },
  addressInstructions: {
    fontSize: 12,
    color: colors.textLight,
    fontStyle: "italic",
    marginTop: 8,
  },
  paymentCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  paymentText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.textLight,
  },
  summaryValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "500",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  summaryLabelTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  summaryValueTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: 20,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  reorderButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  reorderButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.textLight,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
