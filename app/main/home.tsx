import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryCard from "../../src/components/CategoryCard";
import ProductCard from "../../src/components/ProductCard";
import { useAuth } from "../../src/context/AuthContext";
import { useCart } from "../../src/context/CartContext";
import { colors } from "../../src/utils/colors";
import { categories, products } from "../../src/utils/mockData";

export default function HomeScreen() {
  const { user, isGuest } = useAuth();
  const { cartItems } = useCart();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola!</Text>
          <Text style={styles.userName}>
            {isGuest ? "Invitado" : user?.name || "Usuario"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push("/main/cart")}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {cartItemsCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => router.push("/search")}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchText}>Buscar comida...</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            <CategoryCard
              category={{
                id: "all",
                name: "Todos",
                icon: "🍽️",
                color: colors.primary,
              }}
              isSelected={selectedCategory === "all"}
              onPress={() => handleCategoryPress("all")}
            />
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onPress={() => handleCategoryPress(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === "all"
                ? "Menú Completo"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </Text>
            <Text style={styles.productCount}>
              {filteredProducts.length} platos
            </Text>
          </View>

          <View style={styles.productsContainer}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>

        {/* Espacio adicional para el tab bar */}
        <View style={{ height: 20 }} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: colors.white,
  },
  greeting: {
    fontSize: 16,
    color: colors.textLight,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  cartButton: {
    position: "relative",
    width: 50,
    height: 50,
    backgroundColor: colors.card,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    margin: 20,
    marginTop: 10,
    padding: 16,
    borderRadius: 12,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchText: {
    color: colors.textLight,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  productCount: {
    fontSize: 14,
    color: colors.textLight,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  productsContainer: {
    paddingHorizontal: 20,
  },
});
