import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';

const CategoryCard = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        { backgroundColor: isSelected ? category.color : colors.card }
      ]}
      onPress={onPress}
    >
      <Text style={styles.icon}>{category.icon}</Text>
      <Text style={[
        styles.name,
        isSelected && styles.selectedName
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedContainer: {
    elevation: 4,
    shadowOpacity: 0.2,
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  selectedName: {
    color: colors.white,
  },
});

export default CategoryCard;