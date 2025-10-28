import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAddress } from '../src/context/AddressContext';
import { colors } from '../src/utils/colors';

export default function AddressesScreen() {
  const router = useRouter();
  const { addresses, deleteAddress, setDefaultAddress } = useAddress();

  const handleDelete = (id, name) => {
    Alert.alert(
      'Eliminar dirección',
      `¿Estás seguro que deseas eliminar "${name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => deleteAddress(id),
        },
      ]
    );
  };

  const handleSetDefault = (id) => {
    setDefaultAddress(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Direcciones</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <View style={styles.addressHeaderLeft}>
                <Text style={styles.addressName}>{address.name}</Text>
                {address.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Predeterminada</Text>
                  </View>
                )}
              </View>
            </View>

            <Text style={styles.addressText}>{address.fullAddress}</Text>
            <Text style={styles.addressText}>{address.city}, {address.department}</Text>
            {address.instructions && (
              <Text style={styles.instructions}>📝 {address.instructions}</Text>
            )}

            <View style={styles.addressActions}>
              {!address.isDefault && (
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleSetDefault(address.id)}
                >
                  <Text style={styles.actionButtonText}>Hacer predeterminada</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push({
                  pathname: '/add-address',
                  params: { 
                    id: address.id,
                    name: address.name,
                    fullAddress: address.fullAddress,
                    city: address.city,
                    department: address.department,
                    instructions: address.instructions,
                  }
                })}
              >
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDelete(address.id, address.name)}
              >
                <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/add-address')}
      >
        <Text style={styles.addButtonText}>+ Agregar nueva dirección</Text>
      </TouchableOpacity>
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
  addressCard: {
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
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addressName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  defaultBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  addressText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  instructions: {
    fontSize: 13,
    color: colors.textLight,
    fontStyle: 'italic',
    marginTop: 8,
  },
  addressActions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  deleteButton: {
    borderColor: colors.primary,
  },
  deleteButtonText: {
    color: colors.primary,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});