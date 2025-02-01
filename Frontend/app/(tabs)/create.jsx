import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import PersonalInformation from "../../components/PersonalInformation";
import PhysicalDescription from "../../components/PhysicalDescription";
import LastSeenDetails from "../../components/LastSeenDetails";
import MedicalCommunication from "../../components/MedicalCommunication";
import EmergencyContact from "../../components/EmergencyContact";
import MediaUpload from "../../components/MediaUpload";

const TOTAL_STEPS = 6;

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    aliases: "",
    dob: "",
    age: "",
    gender: "",
    adhaar: "",
    height: "",
    weight: "",
    complexion: "",
    hairColor: "",
    distinguishingFeatures: "",
    medicalConditions: [],
    lastSeenDate: "",
    lastSeenTime: "",
    lastLocation: "",
    clothingDescription: "",
    circumstances: "",
    medications: "",
    languages: "",
    socialMedia: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      email: "",
    },
    consent: false,
    media: {
      photos: [],
      videos: [],
      audio: [],
    },
    location: {
      latitude: null,
      longitude: null,
      address: "",
    },
  });

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformation
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <PhysicalDescription
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <LastSeenDetails
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <MedicalCommunication
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 5:
        return (
          <EmergencyContact
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 6:
        return (
          <MediaUpload formData={formData} updateFormData={updateFormData} />
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      console.log("Form submitted:", formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Missing Person Report</Text>
      
      <View style={styles.separator} />
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Step {currentStep} of {TOTAL_STEPS}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              { width: `${(currentStep / TOTAL_STEPS) * 100}%` },
            ]}
          />
        </View>
      </View>
      {renderStep()}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.button, currentStep === 1 && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={currentStep === 1}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentStep === TOTAL_STEPS ? "Submit" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    padding: 20,
    backgroundColor: "#f9e8c1",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0ff",
    marginVertical: 10,
  },
  progressContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  progress: {
    height: "100%",
    backgroundColor: "#4caf50",
    borderRadius: 5,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#fda001",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#bdbdbd",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});