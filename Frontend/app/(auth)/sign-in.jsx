import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { images } from '../../constants';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const {setIsLogged,setUser,loading,setLoading} = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    setLoading(true);
    const { email, password } = form;

    try {
      console.log('email:', email)
      console.log('password:', password)
      const response = await axios.post('https://vt9hf745-4000.inc1.devtunnels.ms/api/users/login', {
        email,
        password
      });
      if(response.data){
        setIsLogged(true);
        setUser(response.data);
        router.push('/home');
      }
      
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
      Alert.alert("Error", error.response ? error.response.data : "An unexpected error occurred.");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Image 
        source={images.path}
        className="w-full h-[150px]"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold text-gray-800 mb-6">Sign In</Text>
      
      <TextInput
        placeholder="Email"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        keyboardType="email-address"
        value={form.email}
        onChangeText={value => handleChange('email', value)}
      />
      
      <TextInput
        placeholder="Password"
        className="border border-gray-300 rounded-lg p-3 w-full mb-4"
        secureTextEntry
        value={form.password}
        onChangeText={value => handleChange('password', value)}
      />

      <TouchableOpacity 
        className="bg-blue-500 rounded-lg p-3 w-full"
        onPress={submit}
      >
        <Text className="text-white text-center font-semibold">Sign In</Text>
      </TouchableOpacity>

      <Text className="text-gray-600 mt-4">
        Don't have an account? 
        <Text className="text-blue-500 font-semibold" onPress={() => router.push('/sign-up')}> Sign Up</Text>
      </Text>
    </View>
  );
}

export default SignIn;