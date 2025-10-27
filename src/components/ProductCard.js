import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { colors } from '../utils/colors';

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return `$${price.toLocaleString('es-CO')}`;
  };

  const handleCardPress = () => {
    router.push({
      pathname: '/product-detail',
      params: { id: product.id }
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleCardPress}>
      <View style={styles.imageContainer}>
        <Text style={styles.image}>{product.image}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        
        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {product.rating}</Text>
              <Text style={styles.time}>• {product.preparationTime}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    backgroundColor: colors.card,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    fontSize: 60,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: colors.textLight,
  },
  time: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 4,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ProductCard;