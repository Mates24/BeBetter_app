import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';

const LogIn = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.154:3306', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        // Handle successful login, e.g., navigate to the home screen
        navigation.navigate('Home');
      } else {
        // Handle unsuccessful login, e.g., display an error message
        Alert.alert('Prihlasovanie zlyhalo');
      }
    } catch (error) {
      Alert.alert('Vyskytla sa chyba:', error);
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
            <Text style={styles.labels}>Prihlasovací e-mail:</Text>
            <TextInput
              placeholder='E-mail'
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
            <Text style={styles.labels}>Heslo:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', borderRadius: 10, justifyContent: 'space-between', paddingRight: 10, marginTop: 5,}}>
              <TextInput
                placeholder='Heslo'
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
                title='Prihlásiť sa'
                color={'#006cff'}
                onPress={handleLogin}
              />
            </View>
          </View>
          <View style={{position: 'absolute', bottom: 0, left: '14%', flexDirection: 'row', gap: 10,}}>
            <Text style={{color: '#fff', textAlign: 'center',}}>Ešte nemáte účet?</Text>
            <TouchableOpacity onPress={ () => navigation.navigate("SignUp")}>
              <Text style={{color: 'red', paddingBottom: 0,}}>Registrovať sa</Text>
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