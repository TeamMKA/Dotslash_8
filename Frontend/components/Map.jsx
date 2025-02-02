import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, ActivityIndicator, Text, TouchableOpacity, Image } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";
import axios from "axios";
import { images } from "../constants";

const MapScreen = () => {
  const mapTilerAPIKey = "aHUEnRceg03OQys2K9jt";
  const [mapType, setMapType] = useState("standard");
  const [showIncidents, setShowIncidents] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dummyIncidents, setDummyIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://vt9hf745-4000.inc1.devtunnels.ms/api/posts/get-post"
        );
        const data = response.data;
        setIncidents(data.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents(); // Call the function to fetch data on component mount

    // Create dummy incidents
    const dummyIncidents = [
      {
        latitude: 21.1702,
        longitude: 72.8311,
        type: "Missing Report 1",
        caseReference: "SRT-2025-001",
        fullName: "Rahul Patel",
        description: "Teenager missing near Surat Railway Station",
        image: images.mimg,
        lastSeen: "2025-01-28 15:30",
        status: "Active"
      },
      {
        latitude: 21.1756,
        longitude: 72.8278,
        type: "Missing Report 2",
        caseReference: "SRT-2025-002",
        fullName: "Priya Sharma",
        description: "Middle-aged woman reported missing from a residential area in Adajan",
        image: images.mimg,
        lastSeen: "2025-01-28 18:45",
        status: "Active"
      },
      {
        latitude: 21.1689,
        longitude: 72.8354,
        type: "Missing Report 3",
        caseReference: "SRT-2025-003",
        fullName: "Aditya Singh",
        description: "Child missing from VR Surat Mall",
        image: images.mimg,
        lastSeen: "2025-01-28 14:20",
        status: "Active"
      },
      {
        latitude: 21.1723,
        longitude: 72.8297,
        type: "Missing Report 4",
        caseReference: "SRT-2025-004",
        fullName: "Rajesh Kumar",
        description: "Man missing near Surat bus depot since morning",
        image: images.mimg,
        lastSeen: "2025-01-28 09:15",
        status: "Active"
      },
      {
        latitude: 21.1667,
        longitude: 72.8332,
        type: "Missing Report 5",
        caseReference: "SRT-2025-005",
        fullName: "Lata Deshmukh",
        description: "Elderly woman reported missing near Athwa Gate, Surat",
        image: images.mimg,
        lastSeen: "2025-01-28 11:30",
        status: "Active"
      },
      {
        latitude: 21.1781,
        longitude: 72.8256,
        type: "Missing Report 6",
        caseReference: "SRT-2025-006",
        fullName: "Arjun Mehta",
        description: "Young adult missing from a commercial area in Vesu",
        image: images.mimg,
        lastSeen: "2025-01-28 16:00",
        status: "Active"
      },
      {
        latitude: 21.1805,
        longitude: 72.8223,
        type: "Missing Report 7",
        caseReference: "SRT-2025-007",
        fullName: "James Wilson",
        description: "Tourist missing near Surat International Airport",
        image: images.mimg,
        lastSeen: "2025-01-28 13:45",
        status: "Active"
      },
      {
        latitude: 21.1712,
        longitude: 72.8345,
        type: "Missing Report 8",
        caseReference: "SRT-2025-008",
        fullName: "Sneha Patil",
        description: "Employee reported missing from office building in Piplod",
        image: images.mimg,
        lastSeen: "2025-01-28 17:20",
        status: "Active"
      },
      {
        latitude: 21.1678,
        longitude: 72.8301,
        type: "Missing Report 9",
        caseReference: "SRT-2025-009",
        fullName: "Kunal Verma",
        description: "Teenager missing from local cafe near City Light Road",
        image: images.mimg,
        lastSeen: "2025-01-28 22:30",
        status: "Active"
      },
      {
        latitude: 21.1764,
        longitude: 72.8289,
        type: "Missing Report 10",
        caseReference: "SRT-2025-010",
        fullName: "Mahesh Joshi",
        description: "Man missing after vehicle breakdown near Sarthana Nature Park",
        image: images.mimg,
        lastSeen: "2025-01-28 20:15",
        status: "Active"
      },
      {
        latitude: 21.1735,
        longitude: 72.8267,
        type: "Missing Report 11",
        caseReference: "SRT-2025-011",
        fullName: "Santosh Yadav",
        description: "Construction worker missing from site near Pal Hazira Road",
        image: images.mimg,
        lastSeen: "2025-01-28 12:45",
        status: "Active"
      },
      {
        latitude: 21.1748,
        longitude: 72.8326,
        type: "Missing Report 12",
        caseReference: "SRT-2025-012",
        fullName: "Riya Shah",
        description: "Child missing after street light malfunction near Ghod Dod Road",
        image: images.mimg,
        lastSeen: "2025-01-28 19:30",
        status: "Active"
      }
    ];

    
    setDummyIncidents(dummyIncidents);
    setIncidents((prevIncidents) => [...prevIncidents, ...dummyIncidents]);
  }, []);

  const handleMarkerPress = (incident) => {
    setSelectedIncident(incident);
  };

  const closeIncidentBox = () => {
    setSelectedIncident(null);
  };
  const toggleMapType = () => {
    setMapType((prevType) => (prevType === "standard" ? "satellite" : "standard"));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 21.1702,
          longitude: 72.8311,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <UrlTile
          urlTemplate={`https://api.maptiler.com/maps/${mapType}/256/{z}/{x}/{y}.png?key=${mapTilerAPIKey}`}
          maximumZ={19}
          flipY={false}
        />

        {showIncidents &&
          dummyIncidents.map((incident, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: incident.latitude,
                longitude: incident.longitude,
              }}
              // title={incident.type}
              // description={incident.description}
              onPress={() => handleMarkerPress(incident)}
            />
          ))}
      </MapView>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleMapType}>
        <Text style={styles.toggleButtonText}>
          {mapType === "standard" ? "Switch to Satellite View" : "Switch to Standard View"}
        </Text>
      </TouchableOpacity>

      {/* Incident Information Box */}
      {selectedIncident && (
        <View style={styles.incidentBox}>
          <View style={styles.incidentHeader}>
            <Text style={styles.incidentTitle}>{selectedIncident.type}</Text>
            <TouchableOpacity 
              onPress={closeIncidentBox}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.incidentContent}>
            <Image 
              source={images.mimg} 
              style={styles.personImage}
            />
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Case Reference:</Text>
                <Text style={styles.value}>{selectedIncident.caseReference}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.label}>Full Name:</Text>
                <Text style={styles.value}>{selectedIncident.fullName}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Status:</Text>
                <Text style={[
                  styles.value, 
                  styles.statusText,
                  {color: selectedIncident.status === 'Active' ? '#dc2626' : '#16a34a'}
                ]}>
                  {selectedIncident.status}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.label}>Last Seen:</Text>
                <Text style={styles.value}>{selectedIncident.lastSeen}</Text>
              </View>

              <View style={styles.descriptionContainer}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.description}>{selectedIncident.description}</Text>
              </View>

              <View style={styles.locationContainer}>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.value}>
                  {selectedIncident.latitude.toFixed(4)}, {selectedIncident.longitude.toFixed(4)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Loading Spinner */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  map: { flex: 1 },
  toggleButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: { color: "#fff", fontWeight: "bold" },
  incidentBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -150 }, // Half of width
      { translateY: -100 }, // Half of height
    ],
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  incidentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  incidentContent: {
    padding: 15,
  },
  incidentDescription: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  incidentLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
   
  incidentBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -175 }, // Half of width
      { translateY: -250 }, // Half of height
    ],
    width: 350,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  incidentContent: {
    padding: 15,
  },
  personImage: {
    width: '100%',
    objectFit:'contain',
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },
  detailsContainer: {
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 14,
    flex: 2,
    color: '#333',
  },
  statusText: {
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    lineHeight: 20,
  },
  locationContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

});

export default MapScreen;