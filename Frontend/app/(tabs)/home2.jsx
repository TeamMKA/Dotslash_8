import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { db, collection, getDocs } from "../../lib/firebase";
import { icons, images } from "../../constants";
import HomePageCard from "../../components/HomePageCard"
import axios from "axios";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();
  const [missingChildrenData, setmissingChildrenData] = useState([]);

  const cardData = [
    // { title: "Adhaar Verfification", img: icons.adhaar, link: "/adhaar" },
    { title: "Safest Route", img: icons.safest_route, link: "/heatmap" },
    { title: "Book A Ride", img: icons.book_a_ride, link: "/book-a-ride" },
    { title: "Report Case", img: icons.report_incident, link: "/create" },
    {
      title: "Safety Alerts",
      img: icons.safety_alerts,
      link: "/safety-alerts",
    },
    {
      title: "Educational Resources",
      img: icons.find_nearby,
      link: "/educational-resources",
    },
    {
      title: "S. O. S.",
      img: icons.emergency_contacts,
      link: "/emergency-contacts",
    },
    { title: "Webinars & Drills", img: icons.webinar, link: "/webinar" },
    { title: "Chat Bot", img: icons.chat_bot, link: "/chatbot" },
    { title: "create2", img: icons.report_incident, link: "/create2" },
  ];

  const [postData, setPostData] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const temp = [
    {
      adhaar: "1234-5678-9101",
      fullName: "Aarav Sharma",
      age: "12",
      aliases: "Avi",
      lastLocation: "Mumbai, Maharashtra",
      lastSeenDate: "2024-01-15",
      lastSeenTime: "14:30",
      emergencyContact: {
        name: "Neha Sharma",
        phone: "9876543210",
        email: "neha.sharma@email.com",
      },
      image:
        "https://images.generated.photos/1zt-Lw23Phdy1H2m9ZGPbhRsDdKGpQj-rpPyMnBU_-U/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDE1NzMzLmpwZw.jpg",
    },
    {
      adhaar: "2345-6789-0123",
      fullName: "Sanya Gupta",
      age: "9",
      aliases: "Sanu",
      lastLocation: "Delhi",
      lastSeenDate: "2024-01-10",
      lastSeenTime: "18:00",
      emergencyContact: {
        name: "Rohit Gupta",
        phone: "9876541230",
        email: "rohit.gupta@email.com",
      },
      image:
        "https://images.generated.photos/Ue6VJO_Vpht_z8CYWPXzs8tf-Ym2SkBWk32dF9DONdg/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Nzc2MTc2LmpwZw.jpg",
    },
    {
      adhaar: "3456-7890-1234",
      fullName: "Kabir Singh",
      age: "14",
      aliases: "Kabi",
      lastLocation: "Bangalore, Karnataka",
      lastSeenDate: "2024-01-20",
      lastSeenTime: "20:00",
      emergencyContact: {
        name: "Anjali Singh",
        phone: "9876509876",
        email: "anjali.singh@email.com",
      },
      image:
        "https://images.generated.photos/YJJJkoxsyHqj1qbQdgZ9kMbZ7Z5G3ESN4mPIOoN2VfI/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzQ0Nzg5LmpwZw.jpg",
    },
  ];
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      const usersList = snapshot.docs.map((doc) => doc.data());
      setmissingChildrenData(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  

  useEffect(() => {
 

    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchUsers} // Call fetchData when user pulls to refresh
          />
        }
      >
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

        <View style={styles.locationCard}>
          <View style={styles.locationCardContent}>
            <Image
              source={icons.location_marker}
              style={styles.locationMarkerImage}
            />
            <Text style={styles.locationCardText}>Your Location</Text>
          </View>
          <Text style={styles.locationText}>Surat</Text>
        </View>

        <View style={styles.cardContainer}>
          {cardData.map((card, index) => (
            <View key={index} style={styles.cardWrapper}>
              <HomePageCard title={card.title} img={card.img} link={card.link} />
            </View>
          ))}
        </View>

        <View style={styles.missingChildrenContainer}>
          <Text style={styles.missingChildrenTitle}>Missing Children</Text>
          {missingChildrenData.length > 0 ? (
            missingChildrenData.map((child, index) => (
              <View key={index} style={styles.childCard}>
                <Image
                  source={{ uri: child.image }}
                  style={styles.childImage}
                />
                <Text style={styles.childName}>
                  {child.fullName} ({child.age} years old)
                </Text>
                <Text style={styles.childDetails}>
                  Last Seen: {child.lastLocation} on {child.lastSeenDate} at{" "}
                  {child.lastSeenTime}
                </Text>
                <Text style={styles.childDetails}>
                  Guardian: {child.emergencyContact.name} (
                  {child.emergencyContact.relationship})
                </Text>
                <Text style={styles.childDetails}>
                  Contact: {child.emergencyContact.phone}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>
              No missing children data available.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e8c1",
    paddingTop: 32,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
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
  locationCard: {
    backgroundColor: "#f97316",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 48,
    padding: 16,
  },
  locationCardContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  locationMarkerImage: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  locationCardText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
  },
  locationText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
    marginRight: 48,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 32,
  },
  cardWrapper: {
    width: "33.33%",
    padding: 8,
  },
  missingChildrenContainer: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  missingChildrenTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  childCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#eedec2",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  childImage: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  childName: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  childDetails: {
    fontSize: 14,
    color: "#4b5563",
  },
  noDataText: {
    color: "#6b7280",
  },
});

export default Home;