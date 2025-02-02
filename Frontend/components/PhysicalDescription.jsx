
import { View, Text, StyleSheet, TextInput } from "react-native"
import { Picker } from "@react-native-picker/picker"



const PhysicalDescription = ({ formData, updateFormData }) => {
  const handleChange = (name, value) => {
    updateFormData({ [name]: value })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Physical Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Height"
        value={formData.height}
        onChangeText={(value) => handleChange("height", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={formData.weight}
        onChangeText={(value) => handleChange("weight", value)}
      />
      <Picker selectedValue={formData.complexion} onValueChange={(itemValue) => handleChange("complexion", itemValue)}>
        <Picker.Item label="Select Complexion" value="" />
        <Picker.Item label="Fair" value="fair" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Dark" value="dark" />
      </Picker>
      <Picker selectedValue={formData.hairColor} onValueChange={(itemValue) => handleChange("hairColor", itemValue)}>
        <Picker.Item label="Select Hair Color" value="" />
        <Picker.Item label="Black" value="black" />
        <Picker.Item label="Brown" value="brown" />
        <Picker.Item label="Blonde" value="blonde" />
        <Picker.Item label="Red" value="red" />
        <Picker.Item label="Gray" value="gray" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Distinguishing Features"
        value={formData.distinguishingFeatures}
        onChangeText={(value) => handleChange("distinguishingFeatures", value)}
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
})

export default PhysicalDescription
