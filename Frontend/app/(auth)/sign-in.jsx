import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { images } from "../../constants";
import axios from "axios";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setIsLogged, setUser, loading, setLoading } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    setLoading(true);
    const { email, password } = form;

    try {
      console.log("email:", email);
      console.log("password:", password);
      const response = await axios.post(
        "https://vt9hf745-4000.inc1.devtunnels.ms/api/users/login",
        {
          email,
          password,
        }
      );
      if (response.data) {
        setIsLogged(true);
        setUser(response.data);
        router.push("/home");
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
      Alert.alert(
        "Error",
        error.response ? error.response.data : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={images.logo}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={form.password}
        onChangeText={(value) => handleChange("password", value)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={submit}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don't have an account?
        <Text
          style={styles.footerLink}
          onPress={() => router.push("/sign-up")}
        >
          {" "}
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9e8c1",
    padding: 24,
  },
  logo: {
    width: "100%",
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#fda001",
    borderRadius: 8,
    padding: 12,
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
  footerText: {
    color: "#4b5563",
    marginTop: 16,
  },
  footerLink: {
    color: "#fda001",
    fontWeight: "600",
  },
});

export default SignIn;