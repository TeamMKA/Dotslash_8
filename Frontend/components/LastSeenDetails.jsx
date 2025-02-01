import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";

const LastSeenDetails = ({ formData, updateFormData }) => {
  const handleChange = (name, value) => {
    updateFormData({ [name]: value });
  };

  const handleLocationChange = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    updateFormData({
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: await getAddressFromCoordinates(
          location.coords.latitude,
          location.coords.longitude
        ),
      },
    });
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (addresses.length > 0) {
        const address = addresses[0];
        return `${address.street}, ${address.city}, ${address.region}, ${address.country}`;
      }
    } catch (error) {
      console.error("Error getting address:", error);
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Seen Details</Text>
      {/* <DateTimePicker
        value={formData.lastSeenDate ? new Date(formData.lastSeenDate) : new Date()}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || new Date()
          handleChange("lastSeenDate", currentDate.toISOString())
        }}
      /> */}
      {/*       <DateTimePicker
        value={formData.lastSeenTime ? new Date(formData.lastSeenTime) : new Date()}
        mode="time"
        display="default"
        onChange={(event, selectedTime) => {
          const currentTime = selectedTime || new Date()
          handleChange("lastSeenTime", currentTime.toISOString())
        }}
      /> */}
      <TouchableOpacity style={styles.button} onPress={handleLocationChange}>
        <Text style={styles.buttonText}>Get Current Location</Text>
      </TouchableOpacity>
      {formData.location.latitude && formData.location.longitude && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: formData.location.latitude,
            longitude: formData.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: formData.location.latitude,
              longitude: formData.location.longitude,
            }}
          />
        </MapView>
      )}
      <TextInput
        style={styles.input}
        placeholder="Last Seen Location"
        value={formData.lastLocation}
        onChangeText={(value) => handleChange("lastLocation", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Clothing Description"
        value={formData.clothingDescription}
        onChangeText={(value) => handleChange("clothingDescription", value)}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Circumstances"
        value={formData.circumstances}
        onChangeText={(value) => handleChange("circumstances", value)}
        multiline
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
    backgroundColor: "#eedec2",
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#fda001",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  map: {
    height: 200,
    marginBottom: 10,
  },
});

export default LastSeenDetails;