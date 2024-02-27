import React, {useState, useEffect} from 'react';
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
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://mathiasdb.em1t.xyz/');

const MakeOwn = ({ navigation }) => {
  const [elements, setElements] = useState([]);
  const [addedElements, setAddedElements] = useState([]);

  const [text1, onChangeText1] = useState('Čas trvania: min');
  const [text2, onChangeText2] = useState('Počet op.: ');
  const [text3, onChangeText3] = useState('Čas trvania: min');

  const [text4, onChangeText4] = useState('Čas trvania: min');
  const [text5, onChangeText5] = useState('Počet op.: ');
  const [text6, onChangeText6] = useState('Čas trvania: min');

  const [userId, setUserId] = useState('');

  const Separator = () => <View style={styles.separator} />;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [programName, setProgramName] = useState('Názov');
  const [program, setProgram] = useState('');
  const [recordID, setRecordID] = useState('');

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

  useEffect(() => {
    // Load the saved program when the component mounts
    loadProgram();
    // Generate record ID when the component mounts
    generateRecordID();
  }, []);
  useEffect(() => {
    // Retrieve user ID from AsyncStorage
    retrieveUserId();
  }, []);

  const generateRecordID = async () => {
    // Generate a unique record ID (you can use any method you prefer)
    const id = Math.random().toString(36).substring(7);
    setRecordID(id);
  };

  const loadProgram = async () => {
    try {
      const savedScreen = await AsyncStorage.getItem('saved_screens');
      if (savedScreen !== null) {
        const { savedProgramName, savedProgramContent } = JSON.parse(savedScreen);
        setProgramName(savedProgramName);
        setProgram(savedProgramContent);
      }
    } catch (error) {
      console.error('Chyba pri načítaní:', error);
    }
  };


  const saveScreen = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      const screenData = JSON.stringify({
        userID: userId,
        savedProgramName: programName,
        savedProgramContent: program,
        addedElements: addedElements,
        elements: elements.map(element => element.props.children)
      });
      
      // Save to PocketBase database
      const data = {
        "recordID": recordID,
        "userID": storedUserId, // Updated to use storedUserId
        "savedProgramName": programName,
        "savedProgramContent": program,
        "elements": screenData
      };

      await pb.collection('saved_screens').update(data);
      
      // Alert user
      Alert.alert('Tréning bol úspešne uložený');
    } catch (error) {
      console.error('Error saving screen:', error);
      Alert.alert('Chyba pri ukladaní:', error.message);
    }
  };

  const deleteScreen = async () => {
    try {
      await AsyncStorage.removeItem('saved_screens');
      setProgram('');
      setProgramName('Názov');
      Alert.alert('Tréning bol úspešne vymazaný');
    } catch (error) {
      console.error('Chyba pri vymazávaní', error);
    }
  };

  const addElement = (type) => {
    // Generate a unique key for the new element
    const key = Math.random().toString(36).substring(7);
    // Create the new TouchableOpacity element based on the selected type
    const newWarmup = (
      <TouchableOpacity key={key} style={styles.warmup}>
        <Text style={{color: '#888', paddingLeft: 10,}}>{type}</Text>
        <TextInput style={{color: '#888', paddingLeft: 10, fontSize: 17, fontWeight: 'bold'}} keyboardAppearance='dark'>--</TextInput>
        <TextInput
          onChangeText={onChangeText4}
          value={text4}
          keyboardAppearance='dark'
          style={styles.inputsteps}
        />
      </TouchableOpacity>
    );
    const newExercise = (
      <TouchableOpacity key={key} style={styles.exercise}>
        <Text style={{color: '#888', paddingLeft: 10,}}>{type}</Text>
        <TextInput style={{color: '#888', paddingLeft: 10, fontSize: 17, fontWeight: 'bold'}} keyboardAppearance='dark'>--</TextInput>
        <TextInput
          onChangeText={onChangeText5}
          value={text5}
          keyboardAppearance='dark'
          style={styles.inputsteps}
        />
      </TouchableOpacity>
    );
    const newStretching = (
      <TouchableOpacity key={key} style={styles.stretching}>
        <Text style={{color: '#888', paddingLeft: 10,}}>{type}</Text>
        <TextInput style={{color: '#888', paddingLeft: 10, fontSize: 17, fontWeight: 'bold'}} keyboardAppearance='dark'>--</TextInput>
        <TextInput
          onChangeText={onChangeText6}
          value={text6}
          keyboardAppearance='dark'
          style={styles.inputsteps}
        />
      </TouchableOpacity>
    );
    // Update the state to include the new TouchableOpacity element
    if (type === "Rozcvička") {
      setElements(prevElements => [...prevElements, newWarmup]);
    } else if (type === "Cvičenie") {
      setElements(prevElements => [...prevElements, newExercise]);
    } else if (type === "Strečing") {
      setElements(prevElements => [...prevElements, newStretching]);
    }
    setAddedElements(prevElements => [...prevElements, { type, key }]);
  };

  const showElementPicker = () => {
    Alert.alert(
      'Vyberte si typ',
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

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={ () => navigation.navigate("Home")} style={styles.backbtn}>
              <Image source={require('../images/arrowL.png')} style={{height: 14, width: 14,}}/>
              <Text style={{color: '#006cff', fontSize: 16,}}>Späť</Text>
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
              <TouchableOpacity style={styles.deletebtn} onPress={deleteScreen}>
                <Text style={{color: '#ff0000', fontSize: 16}}>Vymazať</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.savebtn}>
                <Text style={{color: '#006cff', fontSize: 16,}} onPress={saveScreen}>Uložiť</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Separator/>
          <View>
            <TextInput
              value={program}
              onChangeText={setProgram}
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
            <Text style={{color: '#fff', paddingLeft: 10, fontWeight: 'bold', fontSize: 20}}>Kroky</Text>
            {/* WarmUp */}
            <TouchableOpacity style={styles.warmup}>
              <Text style={{color: '#888', paddingLeft: 10,}}>Rozcvička</Text>
              <TextInput style={{color: '#888', paddingLeft: 10, fontSize: 17, fontWeight: 'bold'}} keyboardAppearance='dark'>--</TextInput>
              <TextInput onChangeText={onChangeText1} value={text1} keyboardAppearance='dark' style={styles.inputsteps}></TextInput>
            </TouchableOpacity>
            {/* New WarmUp */}
            <View style={styles.content}>
              {elements.filter(element => element.props.style === styles.warmup).map(element => element)}
            </View>
            {/* Exercise */}
            <TouchableOpacity style={styles.exercise}>
              <Text style={{color: '#888', paddingLeft: 10,}}>Cvičenie</Text>
              <TextInput style={{color: '#888', paddingLeft: 10, fontSize: 17, fontWeight: 'bold'}} keyboardAppearance='dark'>--</TextInput>
              <TextInput onChangeText={onChangeText5} value={text2} keyboardAppearance='dark' style={styles.inputsteps}></TextInput>
            </TouchableOpacity>
            {/* New Exercise */}
            <View style={styles.content}>
              {elements.filter(element => element.props.style === styles.exercise).map(element => element)}
            </View>
            {/* Streching */}
            <TouchableOpacity style={styles.stretching}>
              <Text style={{color: '#888', paddingLeft: 10,}}>Strečing</Text>
              <TextInput style={{color: '#888', paddingLeft: 10, fontSize: 17, fontWeight: 'bold'}} keyboardAppearance='dark'>--</TextInput>
              <TextInput onChangeText={onChangeText3} value={text3} keyboardAppearance='dark' style={styles.inputsteps}></TextInput>
            </TouchableOpacity>
            {/* New Streching */}
            <View style={styles.content}>
              {elements.filter(element => element.props.style === styles.stretching).map(element => element)}
            </View>
          </View>

          <Button 
            title="Pridať krok"
            color='#999'
            onPress={showElementPicker}
          />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default MakeOwn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputsteps: {
    color: '#888',
    paddingLeft: 10,
  },

  separator: {
    marginBottom: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});