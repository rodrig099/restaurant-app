import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAddress } from "../src/context/AddressContext";
import { colors } from "../src/utils/colors";

export default function AddAddressScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addAddress, updateAddress } = useAddress();

  const isEditing = !!params.id;

  const [name, setName] = useState(params.name || "");
  const [fullAddress, setFullAddress] = useState(params.fullAddress || "");
  const [city, setCity] = useState(params.city || "");
  const [department, setDepartment] = useState(params.department || "");
  const [instructions, setInstructions] = useState(params.instructions || "");

  const handleSave = () => {
    if (!name || !fullAddress || !city || !department) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return;
    }

    if (name.length < 3) {
      Alert.alert("Error", "El nombre debe tener al menos 3 caracteres");
      return;
    }

    if (fullAddress.length < 10) {
      Alert.alert("Error", "Por favor ingresa una dirección completa");
      return;
    }

    if (city.length < 3) {
      Alert.alert("Error", "Por favor ingresa una ciudad válida");
      return;
    }

    if (department.length < 3) {
      Alert.alert("Error", "Por favor ingresa un departamento válido");
      return;
    }

    const addressData = {
      name,
      fullAddress,
      city,
      department,
      instructions,
    };

    if (isEditing) {
      updateAddress(params.id, addressData);
      Alert.alert("¡Listo!", "Dirección actualizada exitosamente");
    } else {
      addAddress(addressData);
      Alert.alert("¡Listo!", "Dirección agregada exitosamente");
    }

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? "Editar Dirección" : "Nueva Dirección"}
          </Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre de la dirección *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Casa, Oficina, Apartamento"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Dirección completa *</Text>
            <TextInput
              style={styles.input}
              placeholder="Calle 123 #45-67"
              value={fullAddress}
              onChangeText={setFullAddress}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Ciudad *</Text>
              <TextInput
                style={styles.input}
                placeholder="Neiva"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <Text style={styles.label}>Departamento *</Text>
              <TextInput
                style={styles.input}
                placeholder="Huila"
                value={department}
                onChangeText={setDepartment}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Instrucciones de entrega (opcional)
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ej: Apartamento 301, timbre rojo"
              value={instructions}
              onChangeText={setInstructions}
              multiline
              numberOfLines={3}
            />
          </View>

          <Text style={styles.note}>* Campos obligatorios</Text>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {isEditing ? "Guardar cambios" : "Agregar dirección"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: colors.white,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  note: {
    fontSize: 12,
    color: colors.textLight,
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
