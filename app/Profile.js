import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput, Button, Alert, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PocketBase from 'pocketbase'; // Import PocketBase

const Profile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    retrieveUserData();
  }, []);

  const pb = new PocketBase('https://mathiasdb.em1t.xyz/');
  const retrieveUserData = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      const storedUserId = await AsyncStorage.getItem('userId')

      // Authenticate user with PocketBase using email and password
      const userData = await pb.collection('users').authWithPassword(storedEmail, storedPassword);
      const records = await pb.collection('users').getOne(storedUserId, {
        expand: 'name,surname,email,birthdate',
      }) 

      if (userData && records) { // Check if both userData and records are valid
        setName(records.name);
        setSurname(records.surname);
        setEmail(records.email);
        setDob(records.birthdate);
      } else {
        console.error('User data not found in PocketBase');
      }
      setLoading(false); // Set loading to false after data retrieval
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Perform any necessary data validation
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      const storedUserId = await AsyncStorage.getItem('userId');
      // Save the updated data to PocketBase
      const userData = await pb.collection('users').authWithPassword(storedEmail, storedPassword);
      if (userData && storedUserId){
        await pb.collection('users').update(storedUserId, {
            name,
            surname,
            email,
            birthdate: dob,
          });
      }  
      // Display success message
      Alert.alert('Zmeny boli uložené');
    } catch (error) {
      console.error('Error saving data:', error);
      // Handle any errors that occur during data saving
      Alert.alert('Error', 'Chyba pri ukladaní. Prosím skúste to znova neskôr.');
    }
  };

  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('userData');
      // Navigate to the login screen
      navigation.navigate('LogIn');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Chyba pri odhlasovaní. Prosím skúste to neskôr.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006cff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <ScrollView scrollEnabled={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backbtn}>
              <Image source={require('../images/arrowL.png')} style={{ height: 14, width: 14 }} />
              <Text style={{ color: '#006cff', fontSize: 16 }}>Späť</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileinfo}>
            <View style={{ alignItems: 'center', marginBottom: 5 }}>
              <Image source={require('../images/profile.png')} style={{ height: 100, width: 100, position: 'absolute', top: -90 }} />
            </View>
            <View style={{ paddingLeft: 15 }}>
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
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10, gap: 20 }}>
                <View>
                  <Button
                    title="Uložiť"
                    color={'#006cff'}
                    onPress={handleSave}
                  />
                </View>
                <View>
                  <Button
                    title="Odhlásiť sa"
                    color={'red'}
                    onPress={handleLogout}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
});
