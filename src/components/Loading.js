import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../utils/colors';

const Loading = ({ size = 'large', color = colors.primary }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default Loading;