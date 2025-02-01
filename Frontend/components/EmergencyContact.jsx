
import { View, Text, StyleSheet, TextInput } from "react-native"

const EmergencyContact = ({ formData, updateFormData }) => {
  const handleChange = (name, value) => {
    updateFormData({ emergencyContact: { ...formData.emergencyContact, [name]: value } })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.emergencyContact.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Relationship"
        value={formData.emergencyContact.relationship}
        onChangeText={(value) => handleChange("relationship", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={formData.emergencyContact.phone}
        onChangeText={(value) => handleChange("phone", value)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.emergencyContact.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
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
})

export default EmergencyContact
