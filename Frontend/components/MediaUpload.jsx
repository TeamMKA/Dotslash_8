import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const MediaUpload = ({ formData, updateFormData }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  const pickPhotos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newPhotos = result.assets.map((asset) => asset.uri);
      updateFormData({
        media: {
          ...formData.media,
          photos: [...formData.media.photos, ...newPhotos],
        },
      });
    }
  };

  const pickVideos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const newVideos = await Promise.all(
        result.assets.map(async (asset) => {
          const thumbnail = await VideoThumbnails.getThumbnailAsync(asset.uri, {
            time: 1000,
          });
          return { uri: asset.uri, thumbnail: thumbnail.uri };
        })
      );

      updateFormData({
        media: {
          ...formData.media,
          videos: [...formData.media.videos, ...newVideos],
        },
      });
    }
  };

  const startAudioRecording = async () => {
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== "granted") return;

    const newRecording = new Audio.Recording();
    try {
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopAudioRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      updateFormData({
        media: {
          ...formData.media,
          audio: [...formData.media.audio, uri],
        },
      });
      setRecording(null);
      setIsRecording(false);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Media Upload</Text>
      <View style={styles.mediaButtonsContainer}>
        <TouchableOpacity style={styles.squareButton} onPress={pickPhotos}>
          <FontAwesome name="photo" size={30} color="#fff" />
          <Text style={styles.buttonText}>Photos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.squareButton} onPress={pickVideos}>
          <Ionicons name="videocam" size={30} color="#fff" />
          <Text style={styles.buttonText}>Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.squareButton, isRecording && styles.buttonActive]}
          onPress={isRecording ? stopAudioRecording : startAudioRecording}
        >
          <FontAwesome
            name={isRecording ? "microphone-slash" : "microphone"}
            size={30}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {isRecording ? "Stop" : "Record"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mediaPreview}>
        {formData.media.photos.map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo }}
            style={styles.previewImage}
          />
        ))}
        {formData.media.videos.map((video, index) => (
          <Image
            key={index}
            source={{ uri: video.thumbnail }}
            style={styles.previewImage}
          />
        ))}
        {formData.media.audio.map((audio, index) => (
          <Text key={index}>Audio {index + 1}</Text>
        ))}
      </View>
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
  mediaButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  squareButton: {
    width: 100,
    height: 100,
    backgroundColor: "#fda001",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonActive: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    marginTop: 5,
  },
  mediaPreview: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  previewImage: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default MediaUpload;