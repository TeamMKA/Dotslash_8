import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
import { useGlobalContext } from "./../context/GlobalProvider";
import { Video } from "expo-av";

export default function App() {
  const { isLogged } = useGlobalContext();
  useEffect(() => {
    if (isLogged) {
      router.push("/home");
    }
  }, [isLogged]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.mainContent}>
          <View style={styles.logoContainer}>
            <Image
              source={images.logo}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.videoContainer}>
            <Video
              source={require("../assets/vid.mp4")}
              style={styles.video}
              shouldPlay
              isLooping
              resizeMode="contain"
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
            Find{"                       \n     "} Protect{""}
            {"       \n                  "}
              <Text style={styles.highlightedText}>Reunite</Text>
            </Text>

            <Image
              source={images.path}
              style={styles.decorativeImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.descriptionText}>
            Because Every Missing Person Deserves to Be Found.
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles={styles.buttonContainer}
          />
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9e8c1',
  },
  scrollContainer: {
    height: '100%',
  },
  mainContent: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16, // equivalent to px-4
  },
  logoContainer: {
    width: '100%',
  },
  logoImage: {
    width: '100%',
    height: 150,
  },
  videoContainer: {
    width: '76%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 24, // for Android shadow
  },
  video: {
    width: '100%',
    height: 200,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    position: 'relative',
    marginTop: 40, // equivalent to mt-10
  },
  titleText: {
    fontSize: 30,
    color: '#334155', // slate-700
    fontWeight: 'bold',
    textAlign: 'center',
  },
  highlightedText: {
    color: '#secondary-200', // Replace with actual color code
  },
  decorativeImage: {
    width: 136,
    height: 15,
    position: 'absolute',
    bottom: -11,
    right: -32,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4b5563', // gray-600
    marginTop: 40, // equivalent to mt-10
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    bottom:20, // equivalent to mt-7
    position:'absolute'
  },
});