import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PocketBase from 'pocketbase'; // Import PocketBase

// Import AsyncAuthStore
import AsyncAuthStore from './AsyncAuthStore'; // Adjust the path as needed

const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [userId, setUserId] = useState('');

  // Initialize an instance of AsyncAuthStore
  const asyncAuthStore = new AsyncAuthStore();

  // Initialize PocketBase with the AsyncAuthStore
  const pb = new PocketBase('https://mathiasdb.em1t.xyz/', asyncAuthStore);

  useEffect(() => {
    // Retrieve user ID from AsyncStorage
    retrieveUserId();
  }, []);

  useEffect(() => {
    // Load data from AsyncStorage when the user ID changes
    if (userId) {
      loadData();
    }
  }, [userId]);

  const retrieveUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId !== null) {
        setUserId(storedUserId);
      }
    } catch (error) {
      console.error('Error retrieving user ID:', error);
    }
  };

  const loadData = async () => {
    try {
      // Retrieve the user ID from AsyncStorage
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        // Query user data from the database
        const userData = await pb.collection('users').getOne(storedUserId);
        
        // Check if user data exists
        if (userData) {
          // Update the state with the fetched user data
          setName(userData.name);
          setSurname(userData.surname);
          setEmail(userData.email);
          setDob(userData.birthdate);
        } else {
          console.error('User data not found in database');
        }
      } else {
        console.error('User ID not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      // Save updated user data to the database
      await pb.collection('users').update(userId, {
        name: name,
        surname: surname,
        email: email,
        birthdate: dob,
      });
      Alert.alert('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const LogOutButton = () => {
    Alert.alert('Odhlásanie bolo úspešné', '', [
      {
        text: 'Prihlásiť sa',
        onPress: () => navigation.navigate('LogIn'),
      },
      {
        text: 'Zrušiť', onPress: () => navigation.navigate('Introduction'),
        style: 'cancel',
      },
    ])
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView scrollEnabled={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={ () => navigation.navigate("Home")} style={styles.backbtn}>
              <Image source={require('../images/arrowL.png')} style={{height: 14, width: 14,}}/>
              <Text style={{color: '#006cff', fontSize: 16,}}>Späť</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileinfo}>
            <View style={{alignItems: 'center', marginBottom: 5,}}>
              <Image source={require('../images/profile.png')} style={{height: 100, width: 100, position: 'absolute', top: -90,}}/>
            </View>
            <View style={{paddingLeft: 15,}}>
              <View>
                <View style={styles.infosections}>
                  <Text style={styles.labes}>Meno:</Text>
                  <TextInput 
                    placeholder='Meno'
                    keyboardAppearance='dark'
                    maxLength={10}
                    placeholderTextColor={'#bbb'}
                    color={'#fff'}
                    style={styles.profileinputs}
                    value={name}
                    onChangeText={setName}
                    onBlur={saveData} // Trigger saveData when input is blurred
                  />
                </View>
                <View style={styles.infosections}>
                  <Text style={styles.labes}>Priezvisko:</Text>
                  <TextInput 
                    placeholder='Priezvisko'
                    keyboardAppearance='dark'
                    maxLength={10}
                    placeholderTextColor={'#bbb'}
                    color={'#fff'}
                    style={styles.profileinputs}
                    value={surname}
                    onChangeText={setSurname}
                    onBlur={saveData} // Trigger saveData when input is blurred
                  />
                </View>
                <View style={styles.infosections}>
                  <Text style={styles.labes}>E-mail:</Text>
                  <TextInput 
                    placeholder='E-mail'
                    keyboardAppearance='dark'
                    maxLength={30}
                    placeholderTextColor={'#bbb'}
                    color={'#fff'}
                    style={styles.profileinputs}
                    value={email}
                    onChangeText={setEmail}
                    onBlur={saveData} // Trigger saveData when input is blurred
                  />
                </View>
                <View style={styles.infosections}>
                  <Text style={styles.labes}>Dátum narodenia:</Text>
                  <TextInput 
                    placeholder='Dátum narodenia'
                    keyboardAppearance='dark'
                    maxLength={10}
                    placeholderTextColor={'#bbb'}
                    color={'#fff'}
                    style={styles.profileinputs}
                    value={dob}
                    onChangeText={setDob}
                    onBlur={saveData} // Trigger saveData when input is blurred
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10, gap: 20,}}>
                <View>
                  <Button 
                    title="Uložiť"
                    color={'#006cff'}
                    onPress={saveData} // Trigger saveData when the "Uložiť" button is pressed
                  />
                </View>
                <View>
                  <Button 
                    title="Odhlásiť sa"
                    color={'red'}
                    onPress={LogOutButton}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#111',
      paddingTop: 50,
  },
  header: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginBottom: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backbtn: {
    position: 'absolute',
    top: 30,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  heading: {
    color: '#fff',
    alignItems: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  profileinfo: {
    backgroundColor: '#222',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    paddingTop: 40,
    height: 750,
  },
  infosections: {
    marginTop: 20,
  },
  labes: {
    color: '#888',
  },
  profileinputs: {
    fontSize: 20,
    marginTop: 5,
  },
})
