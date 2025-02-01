
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import PostCard from "../../components/PostCard"; // Import PostCard component
import { icons, images } from "../../constants";
import HomePageCard from '../../components/HomePageCard'
import axios from "axios";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();

  const cardData = [
    { title: "Adhaar Verfification", img: icons.adhaar, link: "/adhaar" },
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
  const data = [{"__v": 0, "_id": "66f7b2acf31173ae8e85153d", "audioFile": "http://res.cloudinary.com/dhsxyniue/video/upload/v1727509164/bngvklc4zxckp5tug9wn.ogg", "comments": [Array], "createdAt": "2024-09-28T07:39:24.515Z", "description": "Two cars collided at Junction, No casualties but heavy traffic", "dislike": 2, "imageFiles": [Array], "latitude": 19.191032, "like": 12, "location": "Malad , Mumbai", "longitude": 72.856205, "summary": "The incident occurred at Junction due to a two-vehicle collision, with an unspecified number of people involved. Hallmarks of the event were the absence of casualties, as initially stated, and the heavy traffic congestion resulting from a reported 'terrible traffic situation'.", "type": "Accident", "updatedAt": "2024-09-28T07:39:24.515Z", "videoFile": "http://res.cloudinary.com/dhsxyniue/video/upload/v1727509163/tzm2cnf6ax5mfwtpq33e.mp4"}, {"__v": 0, "_id": "66f7b39ef31173ae8e85153f", "audioFile": "http://res.cloudinary.com/dhsxyniue/video/upload/v1727509406/b2fnabtwozynfisk5mtp.ogg", "comments": [Array], "createdAt": "2024-09-28T07:43:26.716Z", "description": "A backpack was stolen from a park bench at Park. The owner left it unattended for a few minutes.", "dislike": 2, "imageFiles": [Array], "latitude": 19.175278, "like": 15, "location": "Thane", "longitude": 72.972416, "type": "Accident", "updatedAt": "2024-09-28T07:43:26.716Z", "videoFile": "http://res.cloudinary.com/dhsxyniue/video/upload/v1727509405/o5mfy5gc1wkixuzwojwt.mp4"}, {"__v": 0, "_id": "66f7b3f6f31173ae8e851541", "audioFile": "http://res.cloudinary.com/dhsxyniue/video/upload/v1727509493/tasi0j7vyxhvkjzheesh.ogg", "comments": [Array], "createdAt": "2024-09-28T07:44:54.210Z", "description": " A man was reported harassing women outside the coffee shop on 2nd Street.", "dislike": 2, "imageFiles": [Array], "latitude": 19.175278, "like": 15, "location": "Goregaon , Mumbai", "longitude": 72.972416, "type": "Harassment", "updatedAt": "2024-09-28T07:44:54.210Z", "videoFile": "http://res.cloudinary.com/dhsxyniue/video/upload/v1727509492/umefvuap27n4uglf62pk.mp4"}, {"__v": 0, "_id": "66f7b516f31173ae8e85154b", "audioFile": "http://res.cloudinary.com/dhsxyniue/video/upload/v1727509781/ogs3kkjqt6cv8zanm69h.ogg", "comments": [Array], "createdAt": "2024-09-28T07:49:42.281Z", "description": "A vehicle with no license plates has been parked near the school for over an hour.", "dislike": 2, "imageFiles": [Array], "latitude": 19.415346, "like": 15, "location": "Nalasopara , Thane", "longitude": 72.863872, "type": "Suspicious Activity", "updatedAt": "2024-09-28T07:49:42.281Z", "videoFile": "http://res.cloudinary.com/dhsxyniue/video/upload/v1727509780/ghnmnv8muw6octamopme.mp4"}]

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const response = await axios.get(
        "https://vt9hf745-4000.inc1.devtunnels.ms/api/posts/get-post"
      );
      //console.log("Fetched post data:", response.data.data); // Debugging line

      // Assuming response.data is an array of post objects
      if (response.data.data && response.data.data.length > 0) {
        setPostData(response.data.data || []);
      } 
    } catch (error) {
      console.error(
        "Error during fetching posts:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#FAF7F0] mt-10">
      <ScrollView
        contentContainerStyle="flex-grow p-4"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchData} // Call fetchData when user pulls to refresh
          />
        }
      >
        <View className="mt-10 flex-row justify-between mx-3">
          <View>
            <Text className="text-xl text-gray-500">Hello, </Text>
            <Text className="text-2xl font-extrabold">
              Hi{" "}
              {user?.data?.user?.username ? user.data.user.username : "Guest"}
            </Text>
          </View>

          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image source={images.profile} className="rounded-full h-16 w-16" />
          </TouchableOpacity>
        </View>

        <View className="bg-orange-400 rounded-md mx-4 mt-12 p-4">
          <View className="flex-row justify-around items-center">
            <Image
              source={icons.location_marker}
              className="h-16 w-16 rounded-full"
            />
            <Text className="text-white font-psemibold text-xl">
              Your Location
            </Text>
          </View>
          <Text className="text-white font-pmedium text-right mr-12">
            Bandra
          </Text>
        </View>

        <View className="flex-row flex-wrap mt-8">
          {cardData.map((card, index) => (
            <View key={index} className="w-1/3 p-2">
              <HomePageCard
                title={card.title}
                img={card.img}
                link={card.link}
              />
            </View>
          ))}
        </View>

        {/* Nearest Posts Section */}
        {/* <View className="mx-4 mt-5">
          <Text className="font-pbold text-xl mb-4">Nearest Posts</Text>
          {postData && postData.length > 0 ? (
            postData.map((post) => (
              <PostCard
                key={post._id}
                post={post}
              />
            ))
          ) : (
            <Text className="text-gray-500">No posts available.</Text>
          )}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
