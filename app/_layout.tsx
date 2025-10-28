import { Stack } from 'expo-router';
import React from 'react';
import { AddressProvider } from '../src/context/AddressContext';
import { AuthProvider } from '../src/context/AuthContext';
import { CartProvider } from '../src/context/CartContext';
import { OrderProvider } from '../src/context/OrderContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <AddressProvider>
          <OrderProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="auth/welcome" />
              <Stack.Screen name="auth/login" />
              <Stack.Screen name="auth/register" />
              <Stack.Screen name="main" />
              <Stack.Screen 
                name="product-detail" 
                options={{
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen name="addresses" />
              <Stack.Screen name="add-address" />
              <Stack.Screen name="checkout" />
              <Stack.Screen name="order-confirmation" />
              <Stack.Screen name="order-detail" />
            </Stack>
          </OrderProvider>
        </AddressProvider>
      </CartProvider>
    </AuthProvider>
  );
}