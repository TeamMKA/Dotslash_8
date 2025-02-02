import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function IncidentDetails({ route }) {
  const { incident } = route.params;

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${incident.latitude},${incident.longitude}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={incident.image}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{incident.fullName}</Text>
        <Text style={styles.caseReference}>{incident.caseReference}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Case Details</Text>
        <Text style={styles.description}>{incident.description}</Text>
        <TouchableOpacity style={styles.locationButton} onPress={openMap}>
          <MaterialIcons name="location-on" size={20} color="#007AFF" />
          <Text style={styles.locationText}>View Location on Map</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status Information</Text>
        <View style={styles.statusInfo}>
          <View style={[
            styles.statusDot,
            { backgroundColor: incident.status === 'Active' ? '#FF3B30' : '#34C759' }
          ]} />
          <Text style={styles.statusText}>{incident.status}</Text>
        </View>
        <Text style={styles.lastSeen}>Last seen: {incident.lastSeen}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location Details</Text>
        <Text style={styles.coordinates}>
          Latitude: {incident.latitude}
          {'\n'}
          Longitude: {incident.longitude}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caseReference: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 15,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  locationText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 16,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#444',
  },
  lastSeen: {
    fontSize: 16,
    color: '#666',
  },
  coordinates: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
});