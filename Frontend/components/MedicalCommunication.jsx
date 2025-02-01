import { View, Text, StyleSheet, TextInput } from "react-native"
import { MultiSelect } from "react-native-element-dropdown"



const medicalConditions = [
  { label: "Diabetes", value: "diabetes" },
  { label: "Hypertension", value: "hypertension" },
  { label: "Asthma", value: "asthma" },
  { label: "Heart Disease", value: "heartDisease" },
  { label: "Alzheimer's", value: "alzheimers" },
  { label: "Other", value: "other" },
]

const MedicalCommunication = ({ formData, updateFormData }) => {
  const handleChange = (name, value) => {
    updateFormData({ [name]: value })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical & Communication</Text>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={medicalConditions}
        labelField="label"
        valueField="value"
        placeholder="Select Medical Conditions"
        value={formData.medicalConditions}
        onChange={(item) => {
          updateFormData({ medicalConditions: item })
        }}
        selectedStyle={styles.selectedStyle}
      />
      <TextInput
        style={styles.input}
        placeholder="Medications"
        value={formData.medications}
        onChangeText={(value) => handleChange("medications", value)}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Languages Spoken"
        value={formData.languages}
        onChangeText={(value) => handleChange("languages", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Social Media Accounts"
        value={formData.socialMedia}
        onChangeText={(value) => handleChange("socialMedia", value)}
        multiline
      />
    </View>
  )
}

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
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    borderRadius: 12,
  },
})

export default MedicalCommunication
