import { View, Text, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";

const PersonalInformation = ({ formData, updateFormData }) => {
  const handleChange = (name, value) => {
    updateFormData({ [name]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.fullName}
        onChangeText={(value) => handleChange("fullName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Aliases"
        value={formData.aliases}
        onChangeText={(value) => handleChange("aliases", value)}
      />
      {/* <DateTimePicker
        value={formData.dob ? new Date(formData.dob) : new Date()}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || new Date();
          handleChange("dob", currentDate.toISOString());
        }}
      /> */}
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={formData.age}
        onChangeText={(value) => handleChange("age", value)}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={formData.gender}
        onValueChange={(itemValue) => handleChange("gender", itemValue)}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Adhaar Number (12 digits)"
        value={formData.adhaar}
        onChangeText={(value) => handleChange("adhaar", value)}
        keyboardType="numeric"
        maxLength={12}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    backgroundColor:'#eedec2',
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default PersonalInformation;