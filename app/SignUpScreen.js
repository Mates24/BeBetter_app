import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PocketBase, { AsyncAuthStore } from 'pocketbase';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Initialize Auth Store for PocketBase
  const store = new AsyncAuthStore({
    save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
    initial: AsyncStorage.getItem('pb_auth'),
  });

  // Initialize PocketBase instance
  const pb = new PocketBase('https://mathiasdb.em1t.xyz/', store);

  const handleSignUp = async () => {
    if (!username || !email || !password || !passwordConfirm) {
      Alert.alert('Please fill in all fields');
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      // Create a new user in PocketBase
      const newUser = await pb.collection('users').create({
        name: username, // Use the username as the name
        email,
        password,
        passwordConfirm,
      });

      // Display success message
      Alert.alert('Signup successful');
      navigation.navigate('LogIn');
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.code === 'EMAIL_EXISTS') {
        Alert.alert('Email already in use', 'Please use a different email address.');
      } else {
        Alert.alert('Signup failed', 'Please try again later.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ position: 'absolute', top: '8%' }}>
          <Image source={require('../images/logo-b.png')} style={{ width: 300, resizeMode: 'contain' }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', width: '80%' }}>
          <View>
            <Text style={styles.labels}>Username:</Text>
            <TextInput
              placeholder='Username'
              keyboardAppearance='dark'
              placeholderTextColor='#888'
              backgroundColor='#333'
              color='#fff'
              autoCapitalize='none'
              value={username}
              onChangeText={setUsername}
              style={{ fontSize: 20, height: 40, paddingLeft: 10, borderRadius: 10, marginTop: 5 }}
            />
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={styles.labels}>Email:</Text>
            <TextInput
              placeholder='Email'
              keyboardAppearance='dark'
              placeholderTextColor='#888'
              backgroundColor='#333'
              color='#fff'
              autoCapitalize='none'
              inputMode='email'
              value={email}
              onChangeText={setEmail}
              style={{ fontSize: 20, height: 40, paddingLeft: 10, borderRadius: 10, marginTop: 5 }}
            />
          </View>
          <View style={{ paddingTop: 15 }}>
            <Text style={styles.labels}>Password:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', borderRadius: 10, justifyContent: 'space-between', paddingRight: 10, marginTop: 5 }}>
              <TextInput
                placeholder='Password'
                keyboardAppearance='dark'
                placeholderTextColor='#888'
                backgroundColor='#333'
                color='#fff'
                secureTextEntry={!showPassword1}
                value={password}
                onChangeText={setPassword}
                style={{ fontSize: 20, height: 40, paddingLeft: 10, borderRadius: 10, width: '80%' }}
              />
              <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)}>
                <Image
                  source={showPassword1 ? require('../images/eye-off-icon.png') : require('../images/eye-icon.png')}
                  style={{ width: 25, height: 25, marginTop: 0, tintColor: '#888' }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 15 }}>
              <Text style={styles.labels}>Confirm Password:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', borderRadius: 10, justifyContent: 'space-between', paddingRight: 10, marginTop: 5 }}>
                <TextInput
                  placeholder='Confirm Password'
                  keyboardAppearance='dark'
                  placeholderTextColor='#888'
                  backgroundColor='#333'
                  color='#fff'
                  secureTextEntry={!showPassword2}
                  value={passwordConfirm}
                  onChangeText={setPasswordConfirm}
                  style={{ fontSize: 20, height: 40, paddingLeft: 10, borderRadius: 10, width: '80%' }}
                />
                <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
                  <Image
                    source={showPassword2 ? require('../images/eye-off-icon.png') : require('../images/eye-icon.png')}
                    style={{ width: 25, height: 25, marginTop: 0, tintColor: '#888' }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 15 }}>
                <Button
                  title='Sign Up'
                  color='#006cff'
                  onPress={handleSignUp}
                />
              </View>
            </View>
          </View>
          <View style={{ position: 'absolute', bottom: 0, left: '21.5%', flexDirection: 'row', gap: 10 }}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={{ color: 'red', paddingBottom: 0 }}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flex: 1,
  },
  labels: {
    color: '#fff',
    fontSize: 16,
    paddingLeft: 10,
  },
});

export default SignUp;
