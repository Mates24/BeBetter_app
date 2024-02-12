import { SafeAreaView, StyleSheet, Text, View, Image, Button, Alert,} from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcome}>
         <Text>Vitaj Mathias!</Text>
         <Text>Začni svoj deň tréningom</Text>
      </View>
      <View style={styles.status}></View>
      <View style={styles.categories}></View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  
});