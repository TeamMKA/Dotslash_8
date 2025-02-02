// HomeScreen.jsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput,
  Platform,
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider';
import { images } from '../../constants';
import { router } from 'expo-router';

const HomeScreen = ({ navigation }) => {
  const { user } = useGlobalContext();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Section */}
      <View style={styles.header}>
                <View>
                  <Text style={styles.greetingText}>Hello, </Text>
                  <Text style={styles.usernameText}>
                    Hi {user?.data?.user?.username ? user.data.user.username : "Guest"}
                  </Text>
                </View>
      
                <TouchableOpacity onPress={() => router.push("/profile")}>
                  <Image source={images.profile} style={styles.profileImage} />
                </TouchableOpacity>
              </View>

      <ScrollView style={styles.content}>
        {/* Emergency Actions Section */}
        <View style={styles.emergencySection}>
          <TouchableOpacity 
            style={[styles.emergencyButton, { backgroundColor: '#FF3B30' }]}
            onPress={() => router.push("/create")}
          >
            <MaterialIcons name="person-add" size={32} color="white" />
            <Text style={styles.emergencyButtonText}>Report Missing Person</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.emergencyButton, { backgroundColor: '#34C759' }]}
            onPress={() => navigation.navigate('ReportSighting')}
          >
            <MaterialIcons name="visibility" size={32} color="white" />
            <Text style={styles.emergencyButtonText}>Report Sighting</Text>
          </TouchableOpacity>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={24} color="#666" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search by name, location, or case ID"
              placeholderTextColor="#666"
            />
            <TouchableOpacity>
              <MaterialIcons name="mic" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {[
              { icon: 'family-restroom', title: 'Family Registration', route: 'FamilyReg' },
              { icon: 'location-on', title: 'Track Location', route: 'Tracking' },
              { icon: 'notification-important', title: 'Alerts', route: 'Alerts' },
              { icon: 'support-agent', title: 'Contact Support', route: 'Support' },
            ].map((action, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.actionItem}
                onPress={() => navigation.navigate(action.route)}
              >
                <MaterialIcons name={action.icon} size={32} color="#007AFF" />
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Cases Section */}
        <View style={styles.recentCases}>
          <Text style={styles.sectionTitle}>Recent Cases</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity key={item} style={styles.caseCard}>
                <View style={styles.caseImageContainer}>
                  <Image 
                    style={styles.caseImage}
                    source={{ uri: 'https://via.placeholder.com/150' }}
                  />
                  <View style={styles.caseStatus}>
                    <Text style={styles.statusText}>Active</Text>
                  </View>
                </View>
                <Text style={styles.caseName}>John Doe</Text>
                <Text style={styles.caseLocation}>Mumbai, MH</Text>
                <Text style={styles.caseDate}>Last seen: 2 days ago</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            {[
              { number: '150', label: 'Active Cases' },
              { number: '45', label: 'Found Today' },
              { number: '1.2K', label: 'Total Resolved' },
              { number: '300+', label: 'Volunteers' },
            ].map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statNumber}>{stat.number}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f9e8c1',
  },
  
  header: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  greetingText: {
    fontSize: 20,
    color: "#6b7280",
  },
  usernameText: {
    fontSize: 24,
    fontWeight: "800",
  },
  profileImage: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  menuButton: {
    padding: 8,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 20,
  },
  languageText: {
    marginLeft: 4,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  emergencySection: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  emergencyButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyButtonText: {
    color: 'white',
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchSection: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  quickActions: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionItem: {
    width: '45%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    marginTop: 8,
    color: '#333',
    textAlign: 'center',
  },
  recentCases: {
    padding: 16,
  },
  caseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    width: 180,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  caseImageContainer: {
    position: 'relative',
  },
  caseImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  caseStatus: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  caseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  caseLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  caseDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  statsSection: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    width: '45%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    marginTop: 4,
    color: '#666',
    textAlign: 'center',
  },
};

export default HomeScreen;