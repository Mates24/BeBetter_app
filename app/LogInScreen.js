import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import PocketBase from 'pocketbase'; // Import PocketBase

const LogIn = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const pb = new PocketBase('https://mathiasdb.em1t.xyz/'); // Initialize PocketBase with your API URL
      const userData = await pb.collection('users').authWithPassword(email, password); // Authenticate user with email and password
  
      // If authentication is successful, navigate to the home screen and store the user ID in AsyncStorage
      if (userData) {
        // Store the user ID in AsyncStorage
        await AsyncStorage.setItem('userId', userData.record.id);
        navigation.navigate('Home', { userId: userData.record.id });
      } else {
        // Handle unsuccessful login, e.g., display an error message
        Alert.alert('Chyba pri prihlasovaní', 'Nesprávny email alebo heslo');
      }
    } catch (error) {
      // Handle other errors, e.g., network issues
      console.log('Error occurred:', error);
      Alert.alert('Error', 'Nastala chyba. Skúste to znova neskôr.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, alignItems: 'center',}}>
        <View style={{position: 'absolute', top: '15%',}}>
          <Image source={require('../images/logo-b.png')} style={{width: 300, resizeMode: 'contain',}}/>
        </View>
        <View  style={{flex: 1, justifyContent: 'center', width: '80%',}}>
          <View>
            <Text style={styles.labels}>Email:</Text>
            <TextInput
              placeholder='Email'
              keyboardAppearance='dark'
              placeholderTextColor={'#888'}
              backgroundColor={'#333'}
              color={'#fff'}
              autoCapitalize='none'
              inputMode='email'
              onChangeText={setEmail}
              value={email}
              style={{fontSize: 20, height: 40, paddingLeft: 10, borderRadius: 10, marginTop: 5}}/>
          </View>
          <View style={{paddingTop: 15}}>
            <Text style={styles.labels}>Password:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', borderRadius: 10, justifyContent: 'space-between', paddingRight: 10, marginTop: 5,}}>
              <TextInput
                placeholder='Password'
                keyboardAppearance='dark'
                placeholderTextColor={'#888'}
                backgroundColor={'#333'}
                color={'#fff'}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
                value={password}
                style={{fontSize: 20, height: 40, paddingLeft: 10, borderRadius: 10, width: '90%'}}/>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={showPassword ? require('../images/eye-off-icon.png') : require('../images/eye-icon.png')}
                  style={{ width: 25, height: 25, marginTop: 0, tintColor: '#888'}}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 15,}}>
              <Button 
                title='Login'
                color={'#006cff'}
                onPress={handleLogin}
              />
            </View>
          </View>
          <View style={{position: 'absolute', bottom: 0, left: '14%', flexDirection: 'row', gap: 10,}}>
            <Text style={{color: '#fff', textAlign: 'center',}}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={ () => navigation.navigate("Home")}>
              <Text style={{color: 'red', paddingBottom: 0,}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LogIn;

const styles = StyleSheet.create ({
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
