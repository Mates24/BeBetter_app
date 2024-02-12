import React, { useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity,  
  TouchableWithoutFeedback, 
  Keyboard,
  ScrollView,
} from 'react-native';

const DynamicTraining = ({navigation}) => {

  const Separator = () => <View style={styles.separator} />;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const switchPlan = (index) => {
    setSelectedPlanIndex(index);
  };
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  const plans = [
    {
      name: 'Plán 1',
      info: [
        {
          series: '4',
          break: '75 sekúnd',
          equipment: 'bedna',
        }
      ],
      warmup: [ 
        {
          name: 'Rozcvička',
          description: 'Švihadlo',
          duration: 'Čas trvania: 15min',
        }
      ],
      exercises: [
        {
          name: 'Cvičenie 1',
          description: 'Skok vzad s následným vertikálnym výskokom',
          op: 'Počet op.: 8-10',
          videoSource: 'https://www.example.com/video1.mp4',
        },
        {
          name: 'Cvičenie 2',
          description: 'Plyometrické kliky',
          op: 'Počet op.: 8-10',
          videoSource: 'https://www.example.com/video1.mp4',
        },
        {
          name: 'Cvičenie 3',
          description: 'Kliky s následným križným dotykom kolena a lakťa',
          op: 'Počet op.: 8-10',
          videoSource: 'https://www.example.com/video1.mp4',
        },
        {
          name: 'Cvičenie 4',
          description: 'Dvíhanie panvy s jednou nohou vo vzduchu',
          op: 'Počet op.: 6-8',
          videoSource: 'https://www.example.com/video1.mp4',
        },
        {
          name: 'Cvičenie 5',
          description: 'Skok do diaľky z miesta',
          op: 'Počet op.: 10',
          videoSource: 'https://www.example.com/video1.mp4',
        },
        {
          name: 'Cvičenie 6',
          description: 'Angličáky bez kliku',
          op: 'Počet op.: 10',
          videoSource: 'https://www.example.com/video1.mp4',
        },
        {
          name: 'Cvičenie 7',
          description: 'Výskoky na bednu',
          op: 'Počet op.: 8-10',
          videoSource: 'https://www.example.com/video1.mp4',
        },
        {
          name: 'Cvičenie 8',
          description: 'Tri skoky do diaľky za sebou',
          op: 'Počet op.: 6-8',
          videoSource: 'https://www.example.com/video1.mp4',
        },
        {
          name: 'Cvičenie 9',
          description: '1x horolezec s následným šprintom na 20 metrov',
          op: 'Počet op.: 6-8',
          videoSource: 'https://www.example.com/video1.mp4',
        },
      ],
      stretching: [
        {
          name: 'Strečing',
          description: 'Aktívne naťahovanie',
          duration: 'Čas trvania: 10min',
        }
      ],
    },
    {
      name: 'Plán 2',
      info: [
        {
          series: '3',
          break: '90 sekúnd',
          equipment: 'medicinbal',
        }
      ],
      warmup: [{
        name: 'Rozcvička',
        description: 'Beh na 2km',
        duration: 'Čas trvania: 15min',
      }],
      exercises: [
        {
          name: 'Cvičenie 1',
          description: 'Výskoky z výpadu: snažiť sa dopadnúť do výpadu, nezabudnúť na striedanie nôh',
          op: 'Počet op.: 3-5',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 2',
          description: 'Plank na predlaktiach',
          op: 'Čas trvania: 60s',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 3',
          description: 'Výskoky na vystretých nohách',
          op: 'Počet op.: 8-10',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 4',
          description: 'Šprinty z jedného kolena: 15 metrov,  striedať nohy v začiatočnej polohe',
          op: 'Počet op.: 8',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 5',
          description: 'Beh vzad s následným šprintom vpred (beh vzad na 5 metrov, šprint na 15 metrov)',
          op: 'Počet op.: 3x4',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 6',
          description: 'Dod medicinbalu od hrude s výskokom vpred',
          op: 'Počet op.: 3x15',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        // Add more exercises as needed
      ],
      stretching: [{
        name: 'Strečing',
        description: 'Výbeh',
        duration: 'Čas trvania: 10min',
      }],
    },
    // Add more plans as needed
    {
      name: 'Plán 3',
      info: [
        {          
          series: '3 (pri niektorých cvičeniach počet sérií v popise cvičenia)',
          break: '75 sekúnd',
          equipment: 'kettlbell, bedna, prekážky',
        }
      ],
      warmup: [{
        name: 'Rozcvička',
        description: 'Švihadlo',
        duration: 'Čas trvania: 20min',
      }],
      exercises: [
        {
          name: 'Cvičenie 1',
          description: 'Šprint na 20 metrov',
          op: 'Počet op.: 5',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 2',
          description: 'dvojitý skok do diaľky s následným šprintom na 10 metrov',
          op: 'Počet op.: 5',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 3',
          description: 'Kettlebell swings',
          op: 'Počet op.: 5x12 švihov',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 4',
          description: 'Výskoky na bednu so závažím',
          op: 'Počet op.: 6-8',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 5',
          description: 'Výstupy na bednu so švihnutím nohy',
          op: 'Počet op.: 6-8',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 6',
          description: 'Šprint zo sedu',
          op: 'Počet op.: 6',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 7',
          description: 'Preskoky vpred cez prekážky (po doskoku vydržať v podrepe 2 sekundy)',
          op: 'Počet op.: 5x3',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 8',
          description: 'Preskoky bokom cez prekážky (po doskoku vydržať v podrepe 2 sekundy)',
          op: 'Počet op.: 3x3 (na každú stranu)',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        {
          name: 'Cvičenie 9',
          description: 'Výskoky na bednu bokom',
          op: 'Počet op.: 6-8',
          videoSource: 'https://www.example.com/video2.mp4',
        },
        // Add more exercises as needed
      ],
      stretching: [{
        name: 'Strečing',
        description: 'Masážny valec',
        duration: 'Čas trvania: 15min',
      }],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView scrollEnabled>
          <View style={styles.header}>
            <TouchableOpacity onPress={ () => navigation.navigate("Home")} style={styles.backbtn}>
              <Image source={require('../images/arrowL.png')} style={{height: 14, width: 14,}}/>
              <Text style={{color: '#006cff', fontSize: 16,}}>Späť</Text>
            </TouchableOpacity>
            <Text style={styles.heading}>Dynamika</Text>
          </View>
          <Separator/>
          <View style={styles.plans}>
            <View style={styles.planswitch}>
              <TouchableOpacity onPress={() => switchPlan((selectedPlanIndex - 1 + plans.length) % plans.length)}>
                <Image source={require('../images/arrowL.png')} style={{height: 20, width: 20,}}/>
              </TouchableOpacity>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20,}}>{plans[selectedPlanIndex].name}</Text>
              <TouchableOpacity onPress={() => switchPlan((selectedPlanIndex + 1) % plans.length)}>
                <Image source={require('../images/arrowR.png')} style={{height: 20, width: 20,}}/>
              </TouchableOpacity>
            </View>
            <View style={styles.plans}>
              {plans[selectedPlanIndex].info.map((info, index) => (
                <View style={{ margin: 10, borderWidth: 1, borderColor: '#555', padding: 10, }} key={index}>
                  <Text style={{color: '#fff', fontSize: 16,}}>
                    <Text style={{fontWeight: 'bold',}}>Počet sérií: </Text>{info.series}
                  </Text>
                  <Text style={{color: '#fff', fontSize: 16,}}>
                    <Text style={{fontWeight: 'bold',}}>Pauza medzi sériami: </Text>{info.break}</Text>
                  <Text style={{color: '#fff', fontSize: 16,}}>
                    <Text style={{fontWeight: 'bold',}}>Pomôcky: </Text>{info.equipment}</Text>
                </View>
              ))}
              <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Kroky</Text>
              {plans[selectedPlanIndex].warmup.map((warmup, index) => (
                <View style={styles.warmup} key={index}>
                  <View style={{ gap: 5, }}>
                    <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10 }}>{warmup.name}</Text>
                    <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10, fontSize: 17, fontWeight: 'bold' }}>{warmup.description}</Text>
                    <Text style={styles.steps}>{warmup.duration}</Text>
                  </View>
                </View>
              ))}
              {/* Exercise sections */}
                {plans[selectedPlanIndex].exercises.map((exercise, index) => (
                  <View style={styles.exercise} key={index}>
                    <View style={{ gap: 5, }}>
                      <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10 }}>{exercise.name}</Text>
                      <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10, fontSize: 17, fontWeight: 'bold' }}>{exercise.description}</Text>
                      <Text style={styles.steps}>{exercise.op}</Text>
                    </View>
                    <Video 
                      source={{ uri: exercise.videoSource }}
                      resizeMode={ResizeMode.CONTAIN}
                      muted={true}
                      fullscrean
                      style={styles.backgroundVideo}
                    />
                  </View>
                ))}
              {/* Strečing section */}
              {plans[selectedPlanIndex].stretching.map((stretching, index) => (
                <View style={styles.stretching} key={index}>
                  <View style={{ gap: 5, }}>
                    <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10 }}>{stretching.name}</Text>
                    <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10, fontSize: 17, fontWeight: 'bold' }}>{stretching.description}</Text>
                    <Text style={styles.steps}>{stretching.duration}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default DynamicTraining;

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
    top: 18,
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
    flexDirection: 'row',
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
  steps: {
    color: '#888',
    paddingLeft: 10,
  },

  planswitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});