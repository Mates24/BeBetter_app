import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PocketBase from 'pocketbase'; // Import PocketBase

const MakeOwn = ({ navigation }) => {
  const [elements, setElements] = useState([]);
  const [programName, setProgramName] = useState('Plán 1');
  const [description, setDescription] = useState('');
  const [recordID, setRecordID] = useState('');
  const [buttonVisible, setButtonVisible] = useState(true);
  const [screenVissible, setScreenVissible] = useState(false);

  const [loading, setLoading] = useState(true);

  const Separator = () => <View style={styles.separator} />;
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Initialize PocketBase
  const pb = new PocketBase('https://mathiasdb.em1t.xyz/');

  useEffect(() => {
    // Generate record ID when the component mounts
    generateRecordID();
    // Load saved program when component mounts
    loadSavedProgram();
  }, []);

  const generateRecordID = async () => {
    // Generate a unique record ID (you can use any method you prefer)
    const id = Math.random().toString(36).substring(7);
    setRecordID(id);
  };

  const addElement = (type) => {
    // Generate a unique key for the new element
    const key = Math.random().toString(36).substring(7);
    // Create the new element object based on the selected type
    const newElement = {
      type: type,
      key: key,
      content: '--',
      typeText: getTypeText(type)
    };
    // Update the state to include the new element in the elements array
    setElements(prevElements => [...prevElements, newElement]);
  };

  const getStyleByType = (type) => {
    switch (type) {
      case "Rozcvička":
        return styles.warmup;
      case "Cvičenie":
        return styles.exercise;
      case "Strečing":
        return styles.stretching;
      default:
        return null;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case "Rozcvička":
        return 'Čas trvania: min';
      case "Cvičenie":
        return 'Počet op.: ';
      case "Strečing":
        return 'Čas trvania: min';
      default:
        return '';
    }
  };

  const handleContentChange = (content, index) => {
    setElements(prevElements => {
      const updatedElements = [...prevElements];
      updatedElements[index] = {...updatedElements[index], content: content};
      return updatedElements;
    });
  };
  
  const handleTypeTextChange = (typeText, index) => {
    setElements(prevElements => {
      const updatedElements = [...prevElements];
      updatedElements[index] = {...updatedElements[index], typeText: typeText};
      return updatedElements;
    });
  };  

  const showElementPicker = () => {
    Alert.alert(
      'Vybrať typ',
      'Vyberte si typ tréningu, ktorý chcete pridať:',
      [
        {
          text: 'Rozcvička',
          onPress: () => addElement("Rozcvička"),
        },
        {
          text: 'Cvičenie',
          onPress: () => addElement("Cvičenie"),
        },
        {
          text: 'Strečing',
          onPress: () => addElement("Strečing"),
        },
      ],
      { cancelable: true }
    );
  };

  const NewPlan = async () =>{
    try{
      const storedEmail = await AsyncStorage.getItem('email');
        const storedPassword = await AsyncStorage.getItem('password');
        const storedUserId = await AsyncStorage.getItem('userId');
      // Authenticate with PocketBase
      const userData = await pb.collection('users').authWithPassword(storedEmail, storedPassword);
      if (userData && storedUserId){
        const newPlan = await pb.collection('plans').create({
          user: storedUserId,
          name: programName,
          description,
          elements,
        });
        if (newPlan && newPlan.id) { // Check if newPlan and newPlan.id are not undefined
          // Save the ID of the newly created plan to AsyncStorage
          await AsyncStorage.setItem('planId', newPlan.id);
          
          setButtonVisible(false);
          setScreenVissible(true);
          Alert.alert('Plán bol úspešne vytvorený');
        } else {
          console.error('Error creating plan: newPlan or newPlan.id is undefined');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    };
  };

  const handleSave = async () => {
    try {
      // Retrieve necessary data from AsyncStorage
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      const storedPlanId = await AsyncStorage.getItem('planId');

      // Authenticate with PocketBase
      const userData = await pb.collection('users').authWithPassword(storedEmail, storedPassword);

      if (userData && storedPlanId) {

        const elementsJSON = JSON.stringify(elements);

        await pb.collection('plans').update(storedPlanId, {
          name: programName,
          description: description,
          elements: elementsJSON,
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

  const deletePlan = async () => {
    try {
      // Retrieve necessary data from AsyncStorage
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      const storedPlanId = await AsyncStorage.getItem('planId');

      // Authenticate with PocketBase
      const userData = await pb.collection('users').authWithPassword(storedEmail, storedPassword);

      if (userData && storedPlanId) {
        await pb.collection('plans').delete(storedPlanId)
      }
      navigation.navigate("Home");
      // Display success message
      Alert.alert('Tréningový plán bol vymazaný');
    } catch (error) {
      console.error('Error saving data:', error);
      // Handle any errors that occur during data saving
      Alert.alert('Error', 'Chyba pri vymazávaní. Prosím skúste to znova neskôr.');
    }
  }

  const loadSavedProgram = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      const storedPlanId = await AsyncStorage.getItem('planId');

      const userData = await pb.collection('users').authWithPassword(storedEmail, storedPassword);
      
      if (userData && storedPlanId) {
        const savedProgram = await pb.collection('plans').getOne(storedPlanId, savedProgram);

        if (savedProgram) {
          const { name, description, elements } = savedProgram;
          setProgramName(name);
          setDescription(description);
          setElements(elements);
          setScreenVissible(true);
          setButtonVisible(false);
        } else {
          setScreenVissible(false);
          setButtonVisible(true);
        }
      }
    } catch (error) {
      console.error('Error loading saved program:', error);
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
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {screenVissible && (
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backbtn}>
                <Image source={require('../images/arrowL.png')} style={{ height: 14, width: 14, }} />
                <Text style={{ color: '#006cff', fontSize: 16, }}>Späť</Text>
              </TouchableOpacity>
              <TextInput
                value={programName}
                onChangeText={setProgramName}
                placeholder="Názov"
                placeholderTextColor={'#555'}
                keyboardAppearance='dark'
                multiline={true}
                style={styles.programNameInput}
              />
              <View style={styles.editbtns}>
                <TouchableOpacity style={styles.deletebtn} onPress={deletePlan}>
                  <Text style={{ color: '#ff0000', fontSize: 16 }}>Vymazať</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.savebtn} onPress={handleSave}>
                  <Text style={{ color: '#006cff', fontSize: 16, }}>Uložiť</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {screenVissible && (  
            <Separator />
          )}
          {screenVissible &&(
            <View>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                editable
                multiline
                maxLength={50}
                numberOfLines={2}
                placeholder="Poznámky"
                placeholderTextColor={'#555'}
                keyboardType="default"
                keyboardAppearance='dark'
              />
              {elements.map((element, index) => (
                <TouchableOpacity key={element.key} style={getStyleByType(element.type)}>
                  <Text style={{ color: '#888', paddingLeft: 10 }}>{element.type}</Text>
                  <TextInput
                     style={{ color: '#888', paddingLeft: 10, fontSize: 17, fontWeight: 'bold' }}
                    keyboardAppearance='dark'
                    value={element.content} // Bind value to content property
                    onChangeText={(content) => handleContentChange(content, index)} // Handle content change
                  />
                  <TextInput
                    style={styles.inputsteps}
                    keyboardAppearance='dark'
                    value={(element.typeText)}
                    onChangeText={(typeText) => handleTypeTextChange(typeText, index)} // Handle type text change
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
          {screenVissible && (
            <Button
              title="Pridať krok"
              color='#999'
              onPress={showElementPicker}
            />
          )}
          {!screenVissible && buttonVisible && (
            <View style={styles.centeredButtonContainer}>
              <Button
                title="Vytvoriť nový plán"
                color='#888'
                onPress={NewPlan}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default MakeOwn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#111',
  },
  header: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backbtn: {
    position: 'absolute',
    top: 22.5,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  programNameInput: {
    color: '#fff',
    alignItems: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    width: '35%',
    textAlign: 'center',
  },
  editbtns: {
    position: 'absolute',
    flexDirection: 'row',
    top: 22.5,
    right: 10,
    gap: 10,
  },

  input: {
    color: '#fff',
    margin: 10,
    borderWidth: 1,
    borderColor: '#555',
    padding: 10,
    fontSize: 18,
  },
  inputsteps: {
    color: '#888',
    paddingStart: 10,
  },

  separator: {
    marginBottom: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  warmup: {
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderStartWidth: 7,
    borderRadius: 12,
    borderColor: 'red',
  },
  exercise: {
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderStartWidth: 7,
    borderRadius: 12,
    borderColor: 'blue',
  },
  stretching: {
    margin: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderStartWidth: 7,
    borderRadius: 12,
    borderColor: 'green',
  },

  centeredButtonContainer: {
    flex: 2,
    paddingTop: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },

});