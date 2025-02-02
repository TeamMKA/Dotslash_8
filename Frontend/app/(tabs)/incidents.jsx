import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../constants';

import dummyIncidents from '../../assets/data/dummyIncidents';

export default function IncidentsList() {
  const navigation = useNavigation();

  const handleIncidentPress = (incident) => {
    navigation.navigate('IncidentDetails', { incident });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.incidentsList}>
        {dummyIncidents.map((incident) => (
          <TouchableOpacity 
            key={incident.caseReference} 
            style={styles.incidentCard}
            onPress={() => handleIncidentPress(incident)}
          >
            <View style={styles.cardContent}>
              <Image 
                source={incident.image}
                style={styles.incidentImage}
              />
              <View style={styles.incidentDetails}>
                <Text style={styles.incidentName}>{incident.fullName}</Text>
                <Text style={styles.caseReference}>{incident.caseReference}</Text>
                <Text style={styles.incidentLocation}>
                  <MaterialIcons name="location-on" size={14} color="#666" /> 
                  {`${incident.latitude}, ${incident.longitude}`}
                </Text>
                <Text style={styles.incidentDes} numberOfLines={2}>
                  {incident.description}
                </Text>
              </View>
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusDot, 
                  { backgroundColor: incident.status === 'Active' ? '#FF3B30' : '#34C759' }
                ]} />
                <Text style={styles.lastSeen}>Last seen: {incident.lastSeen}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  incidentsList: {
    flex: 1,
    padding: 10,
  },
  incidentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 15,
  },
  incidentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  incidentDetails: {
    flex: 1,
  },
  incidentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  caseReference: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  incidentLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  incidentDes: {
    fontSize: 14,
    color: '#444',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  lastSeen: {
    fontSize: 12,
    color: '#666',
  },
});