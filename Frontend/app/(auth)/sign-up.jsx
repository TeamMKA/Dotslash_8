import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { images } from "../../constants";
import axios from "axios";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setIsLogged, setUser, loading, setLoading } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    console.log(form);
    const { username, email, password } = form;

    try {
      const response = await axios.post(
        "https://vt9hf745-4000.inc1.devtunnels.ms/api/users/register",
        {
          username,
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
        "Error during registration:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={form.username}
        onChangeText={(value) => handleChange("username", value)}
      />

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

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?
        <Text style={styles.signInText} onPress={() => router.push("/sign-in")}>
          Sign In
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
    color: "#4A4A4A",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
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
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  footerText: {
    color: "#6B7280",
    marginTop: 16,
  },
  signInText: {
    color: "#FF4500",
    fontWeight: "600",
  },
});

export default SignUp;
