import React from "react";
import { Stack } from "expo-router";

const AppNavigator = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="safest-route"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="adhaar"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="create2"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="book-a-ride"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="emergency-contacts"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="educational-resources"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="webinar"
          options={{
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="chatbot"
          options={{
            headerShown: true,
          }}
        />
      </Stack>
    </>
  );
};

export default AppNavigator;