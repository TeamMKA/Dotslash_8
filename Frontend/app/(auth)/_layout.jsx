import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useGlobalContext } from "../../context/GlobalProvider";
import Loader from '../../components/Loader'; // Adjust the path based on your file structure

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthLayout;