import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const HomePageCard = ({ title, img, link }) => {
  return (
    <TouchableOpacity onPress={() => router.push(`${link}`)} style={styles.container}>
      <Image source={img} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#D1D5DB', // gray-300
    marginHorizontal: 'auto',
  },
  text: {
    color: '#9CA3AF', // gray-400
    textAlign: 'center',
  },
});

export default HomePageCard;