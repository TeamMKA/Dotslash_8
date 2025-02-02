// DisplayScreen.jsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import dummyIncidents from "../../assets/data/dummyIncidents";
import { MaterialIcons } from "@expo/vector-icons";
import { db, collection, getDocs } from "../../lib/firebase";
import MapScreen from "../../components/Map";

const { height } = Dimensions.get('window');

const DisplayScreen = () => {
  const [missingChildrenData, setMissingChildrenData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMissingChildrenData(usersList);
      setFilteredData(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = missingChildrenData.filter(item => {
      const searchTerm = text.toLowerCase();
      return (
        (item.name?.toLowerCase().includes(searchTerm)) ||
        (item.location?.toLowerCase().includes(searchTerm)) ||
        (item.caseId?.toLowerCase().includes(searchTerm))
      );
    });
    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={24} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, location, or case ID"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity>
            <MaterialIcons name="mic" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Section - 50% height */}
      <View style={styles.mapSection}>
        {isLoading ? (
        <></>
        ) : (
          <MapScreen data={filteredData} />
        )}
      </View>

      {/* Incidents List Section - 50% height */}
      <View style={styles.incidentsSection}>
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{dummyIncidents.length}</Text>
            <Text style={styles.statLabel}>Total Cases</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{filteredData.length}</Text>
            <Text style={styles.statLabel}>Active Cases</Text>
          </View>
        </View>

        <ScrollView style={styles.incidentsList}>
          {dummyIncidents.map((incident) => (
            <TouchableOpacity 
              key={incident.id} 
              style={styles.incidentCard}
              onPress={() => {/* Handle incident press */}}
            >
              <View style={styles.cardContent}>
                <Image 
                  source={{ uri: incident.imageUrl || 'https://via.placeholder.com/60' }}
                  style={styles.incidentImage}
                />
                <View style={styles.incidentDetails}>
                  <Text style={styles.incidentName}>{incident.fullName}</Text>
                  <Text style={styles.incidentLocation}>
                    <MaterialIcons name="location-on" size={14} color="#666" /> 
                    {incident.location}
                  </Text>
                  <Text style={styles.incidentDes}>Description: {incident.description}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#F5F5F5',
  },
  searchSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    marginTop: -2,
    
  },
  mapSection: {
    height: height * 0.45, // Approximately 50% of screen height
    borderBottomWidth: 1,

    borderBottomColor: '#E5E5E5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
   
    color: '#666',
  },
  incidentsSection: {
    flex: 1, // Takes remaining space
  },
  statsBar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  incidentsList: {
    flex: 1,
  },
  incidentCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incidentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  incidentDetails: {
    flex: 1,
  },
  incidentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  incidentLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  incidentDes: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: 12,
    color: '#999',
  },
});

export default DisplayScreen;