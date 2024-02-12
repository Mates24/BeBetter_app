import { SafeAreaView, StyleSheet, Text, View, Image, Button, Alert,} from 'react-native';

const Introduction = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <Image 
          source={require('../images/banner.jpg')} 
          style={{resizeMode: 'contain', height: '100%',}}
        />
      </View>
      <View style={styles.content}>
        <Image 
          source={require('../images/logo-b.png')} 
          style={{resizeMode: 'contain', width: 270, position: 'absolute', top: '28%',}}
        />
        <Text style={{color: '#fff', textAlign: 'center',fontSize: 29, position: 'absolute', top: '50%',}}>
          Dosiahni s nami svoje ciele
        </Text>
        <View style={{position: 'absolute', bottom: 0,}}>
          <Button 
            title="CHCEM ZAČAŤ" 
            color='#999'
            onPress={ () => navigation.navigate("Home")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Introduction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
});