import React, { useState } from 'react';
/* import { Video, ResizeMode } from 'expo-av'; */
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

const StrengthTraining = ({navigation}) => {

  const Separator = () => <View style={styles.separator} />;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const switchPlan = (index) => {
    setSelectedPlanIndex(index);
    setSelectedDayPlanIndex(0);
  };

  const switchDayPlan = (index) => {
    setSelectedDayPlanIndex(index);
  };

  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [selectedDayPlanIndex, setSelectedDayPlanIndex] = useState(0);

  const plans = [
    {
      name: 'Plán 1',
      days: [
        {
          name: 'Deň 1',
          warmup: [
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define warm-up exercises for Day 1
            {
              name: 'Cvičenie 1',
              description: 'Drepy s osou',
              op: 'Počet op.: 5',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Mŕtvy ťah',
              op: 'Počet op.: 5',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Bulharské drepy',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 1
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 2',
          warmup: [
            // Define warm-up exercises for Day 2
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 2
            {
              name: 'Cvičenie 1',
              description: 'Bench Press',
              op: 'Počet op.: 5',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Tricepsové kliky na bradlách',
              op: 'Počet op.: 3x do zlyhania',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Príťahy s osou na chrbát',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 2
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 3',
          warmup: [
            // Define warm-up exercises for Day 3
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 3
            {
              name: 'Cvičenie 1',
              description: 'Bench Press',
              op: 'Počet op.: 5',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Tricepsové kliky na bradlách',
              op: 'Počet op.: 3x do zlyhania',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Príťahy s osou na chrbát',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 3
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 4',
          warmup: [
            // Define warm-up exercises for Day 4
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 4
            {
              name: 'Cvičenie 1',
              description: 'Drepy s osou (vysoká váha a nízky počet opakovaná na získanie sily)',
              op: 'Počet op.: 5x3',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Mŕtvy ťah',
              op: 'Počet op.: 5x3',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Výpady s jednoručkami',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 4
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 5',
          warmup: [
            // Define warm-up exercises for Day 5
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 5
            {
              name: 'Cvičenie 1',
              description: 'Bench Press',
              op: 'Počet op.: 8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Tricepsové výpony s jednoručnou činkou',
              op: 'Počet op.: 3x12-15',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Zhyby na hrazde',
              op: 'Počet op.: 3x do svalového zlyhania',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 5
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
      ]
    },

    // Plán na druhý týždeň
    {
      name: 'Plán 2',
      days: [
        {
          name: 'Deň 1',
          warmup: [
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define warm-up exercises for Day 1
            {
              name: 'Cvičenie 1',
              description: 'Drepy s osou',
              op: 'Počet op.: 5x3',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Mŕtvy ťah',
              op: 'Počet op.: 5x3',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Rumunský mŕtvy ťah',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 1
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 2',
          warmup: [
            // Define warm-up exercises for Day 2
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 2
            {
              name: 'Cvičenie 1',
              description: 'Bench Press',
              op: 'Počet op.: 4x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Tricepsové kliky na bradlách',
              op: 'Počet op.: 3x10-12',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Príťahy s osou na chrbát',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 2
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 3',
          warmup: [
            // Define warm-up exercises for Day 3
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 3
            {
              name: 'Cvičenie 1',
              description: 'Bench Press',
              op: 'Počet op.: 5',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Tricepsové kliky na bradlách',
              op: 'Počet op.: 3x do zlyhania',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Príťahy s osou na chrbát',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 3
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 4',
          warmup: [
            // Define warm-up exercises for Day 4
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 4
            {
              name: 'Cvičenie 1',
              description: 'Drepy s osou (90% osobného maxima)',
              op: 'Počet op.: 6x2',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Mŕtvy ťah (90% osobného maxima)',
              op: 'Počet op.: 6x2',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Výpady s jednoručkami',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 4
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 5',
          warmup: [
            // Define warm-up exercises for Day 5
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 5
            {
              name: 'Cvičenie 1',
              description: 'Bench Press',
              op: 'Počet op.: 8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Tricepsové výpony s jednoručnou činkou',
              op: 'Počet op.: 3x12-15',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Zhyby na hrazde',
              op: 'Počet op.: 3x maximálny počet opakovaní',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 5
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
      ]
    },

    {
      name: 'Plán 3',
      days: [
        {
          name: 'Deň 1',
          warmup: [
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define warm-up exercises for Day 1
            {
              name: 'Cvičenie 1',
              description: 'Drepy s osou (90% osobného maxima)',
              op: 'Počet op.: 6x2',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Mŕtvy ťah (90% osobného maxima)',
              op: 'Počet op.: 6x2',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Rumunský mŕtvy ťah',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 1
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 2',
          warmup: [
            // Define warm-up exercises for Day 2
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 2
            {
              name: 'Cvičenie 1',
              description: 'Bench Press',
              op: 'Počet op.: 8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Tricepsové kliky na bradlách',
              op: 'Počet op.: 3x do svalového zlyhania',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Príťahy s osou na chrbát',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 2
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 3',
          warmup: [
            // Define warm-up exercises for Day 3
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 3
            {
              name: 'Cvičenie 1',
              description: 'Bench Press',
              op: 'Počet op.: 5',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Tricepsové kliky na bradlách',
              op: 'Počet op.: 3x do zlyhania',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Príťahy s osou na chrbát',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 3
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 4',
          warmup: [
            // Define warm-up exercises for Day 4
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 4
            {
              name: 'Cvičenie 1',
              description: 'Drepy s osou',
              op: 'Počet op.: 5x3',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Mŕtvy ťah',
              op: 'Počet op.: 5x3',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Výpady s jednoručkami',
              op: 'Počet op.: 3x8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 4
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
        {
          name: 'Deň 5',
          warmup: [
            // Define warm-up exercises for Day 5
            {
              name: 'Rozcvička',
              description: 'Švihadlo',
              duration: 'Čas trvania: 15min',
            }
          ],
          exercises: [
            // Define exercises for Day 5
            {
              name: 'Cvičenie 1',
              description: 'Bench Press',
              op: 'Počet op.: 8-10',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 2',
              description: 'Tricepsové výpony s jednoručnou činkou',
              op: 'Počet op.: 3x12-15',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
            {
              name: 'Cvičenie 3',
              description: 'Zhyby na hrazde',
              op: 'Počet op.: 3x maximálny počet opakovaní',
              /* videoSource: 'https://www.example.com/video2.mp4', */
            },
          ],
          stretching: [
            // Define stretching exercises for Day 5
            {
              name: 'Strečing',
              description: 'Aktívne naťahovanie',
              duration: 'Čas trvania: 10min',
            }
          ],
        },
      ]
    },
  ];

  const selectedPlan = plans[selectedPlanIndex];
  const selectedDayPlan = selectedPlan.days[selectedDayPlanIndex];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView scrollEnabled>
          <View style={styles.header}>
            <TouchableOpacity onPress={ () => navigation.navigate("Home")} style={styles.backbtn}>
              <Image source={require('../images/arrowL.png')} style={{height: 14, width: 14,}}/>
              <Text style={{color: '#006cff', fontSize: 16,}}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.heading}>Sila</Text>
          </View>
          <Separator/>
          <View>
            <View style={styles.planswitch}>
              <TouchableOpacity onPress={() => switchPlan((selectedPlanIndex - 1 + plans.length) % plans.length)}>
                <Image source={require('../images/arrowL.png')} style={{height: 20, width: 20,}}/>
              </TouchableOpacity>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20,}}>{selectedPlan.name}</Text>
              <TouchableOpacity onPress={() => switchPlan((selectedPlanIndex + 1) % plans.length)}>
                <Image source={require('../images/arrowR.png')} style={{height: 20, width: 20,}}/>
              </TouchableOpacity>
            </View>
            <View>
              {selectedDayPlan && (
                <View>
                  <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Denný plán</Text>
                  <ScrollView horizontal style={{marginHorizontal: 5}}>
                    {selectedPlan.days.map((day, index) => (
                      <TouchableOpacity key={index} onPress={() => switchDayPlan(index)} style={[styles.dayButton, selectedDayPlanIndex === index && styles.selectedDayButton]}>
                        <Text style={{color: '#fff'}}>{day.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
              {/* Render warm-up exercises */}
              {selectedDayPlan && selectedDayPlan.warmup.map((exercise, index) => (
                <View style={styles.warmup} key={index}>
                  <View style={{ gap: 5, }}>
                    <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10 }}>{exercise.name}</Text>
                    <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10, fontSize: 17, fontWeight: 'bold' }}>{exercise.description}</Text>
                    <Text style={styles.steps}>{exercise.duration}</Text>
                  </View>
                </View>
              ))}
              {/* Render exercises for the selected day */}
              {selectedDayPlan && selectedDayPlan.exercises.map((exercise, index) => (
                <View style={styles.exercise} key={index}>
                  <View style={{ gap: 5, }}>
                    <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10 }}>{exercise.name}</Text>
                    <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10, fontSize: 17, fontWeight: 'bold' }}>{exercise.description}</Text>
                    <Text style={styles.steps}>{exercise.op}</Text>
                  </View>
                  {/* <Video 
                    source={{ uri: exercise.videoSource }}
                    resizeMode={ResizeMode.CONTAIN}
                    muted={true}
                    fullscrean
                    style={styles.backgroundVideo}
                  /> */}
                </View>
              ))}
              {/* Render stretching exercises */}
              {selectedDayPlan && selectedDayPlan.stretching.map((exercise, index) => (
                <View style={styles.stretching} key={index}>
                  <View style={{ gap: 5, }}>
                    <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10 }}>{exercise.name}</Text>
                    <Text style={{ color: '#888', paddingLeft: 10, paddingRight: 10, fontSize: 17, fontWeight: 'bold' }}>{exercise.description}</Text>
                    <Text style={styles.steps}>{exercise.duration}</Text>
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

export default StrengthTraining;

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

  planswitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  dayButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#333',
  },

  selectedDayButton: {
    backgroundColor: '#006cff',
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

  backgroundVideo: {
    width: 150,
    height: 100,
  },
});