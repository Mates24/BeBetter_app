import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity,} from 'react-native';
import axios from 'axios';

const HomeScreen = ({navigation}) => {

  const [userName, setUserName] = useState('');
  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    // Fetch user name and set it to state
    fetchUserName();

    // Set random quote
    setRandomQuote(getRandomQuote());
  }, []);

  const fetchUserName = async () => {
    try {
      // Replace this URL with your actual API endpoint to fetch the user's name
      const response = await axios.get('http://localhost:3306');
      const { name } = response.data; // Assuming the response contains the user's name
      setUserName(name);
    } catch (error) {
      console.error('Chyba pri načítaní mena:', error);
    }
  };
  const getRandomQuote = () => {
    const quotes = [
      'The only bad workout is the one that didn’t happen.',
      'Push yourself, because no one else is going to do it for you.',
      'Success is what comes after you stop making excuses.',
      // Add more quotes as needed
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
      <View style={styles.welcome}>
          <View>
            <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#fff' }}>{`Vitaj ${userName}!`}</Text>
            <Text style={{ fontSize: 18, color: '#fff', paddingTop: 5 }}>Začni svoj deň tréningom</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../images/profile.png')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222', paddingHorizontal: 10 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Motivačný citát na dnes</Text>
          <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>"{randomQuote}"</Text>
        </View>
        <View style={styles.categories}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold', position: 'absolute', top: 10,}}>Vyber si tréning</Text>
          <View style={styles.wrapper}>
            <View style={styles.row1}>
              <TouchableOpacity style={styles.makeown} onPress={ () => navigation.navigate("MakeOwn")}>
                <Image source={require('../images/search.png')} style={{height: 90, width: 90,}}/>
                <Text style={{color: '#fff', fontWeight: 'bold',}}>Prispôsobiť</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dynamic} onPress={ () => navigation.navigate("DynamicTraining")}>
                <Image source={require('../images/dynamic.png')} style={{height: 90, width: 90, tintColor: '#fff',}}/>
                <Text style={{color: '#fff', fontWeight: 'bold',}}>Tréning dynamiky</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row2}>
              <TouchableOpacity style={styles.strength} onPress={ () => navigation.navigate("StrengthTraining")}>
                <Image source={require('../images/dumbell.png')} style={{height: 90, width: 90,}}/>
                <Text style={{color: '#fff', fontWeight: 'bold',}}>Silový tréning</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.endurance} onPress={ () => navigation.navigate("EnduranceTraining")}>
                <Image source={require('../images/running.png')} style={{height: 90, width: 90,}}/>
                <Text style={{color: '#fff', fontWeight: 'bold',}}>Tréning vytrvalosti</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  subcontainer: {
    flex: 1,
    margin: 25,
  },
  welcome: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    flex: 0.5,
    backgroundColor: '#222',
  },
  categories: {
    flex: 1,
    paddingTop: 40,
  },
  wrapper: {
    flex: 1,
    gap: '20'
  },
  row1: {
    flexDirection: 'row',
    flex: 1,
    gap: 20,
    justifyContent: 'space-evenly',
  },
  row2: {
    flexDirection: 'row',
    flex: 1,
    gap: 20,
    justifyContent: 'space-evenly',
  },
  makeown: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#222',
  },
  dynamic: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#222',
  },
  strength: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#222',
  },
  endurance: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#222',
  },
});