import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        containerStyles,
        isLoading && styles.buttonDisabled
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyles]}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.loader}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1e293b', // equivalent to bg-slate-800
    borderRadius: 12,          // equivalent to rounded-xl
    minHeight: 62,            // equivalent to min-h-[62px]
    flexDirection: 'row',     // equivalent to flex flex-row
    justifyContent: 'center', // equivalent to justify-center
    alignItems: 'center',     // equivalent to items-center
  },
  buttonDisabled: {
    opacity: 0.5,            // equivalent to opacity-50
  },
  buttonText: {
    color: '#ff924f',        // equivalent to text-white
    fontSize: 18,           // equivalent to text-lg
    fontWeight: '600',      // equivalent to font-psemibold
  },
  loader: {
    marginLeft: 8,          // equivalent to ml-2
  }
});

export default CustomButton;