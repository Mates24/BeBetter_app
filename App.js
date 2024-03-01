import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Introduction from "./app/IntroductionScreen";
import LogIn from "./app/LogInScreen";
import SignUp from "./app/SignUpScreen";
import HomeScreen from "./app/HomeScreen";
import MakeOwn from "./app/MakeOwnScreen";
import DynamicTraining from "./app/DynamicScreen";
import StrengthTraining from "./app/StrengthScreen";
import EnduranceTraining from "./app/EnduranceScreen";
import Profile from "./app/Profile";

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Introduction'>
        <Stack.Screen name="Introduction" component={Introduction} options={{headerShown: false,}}/>
        <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false,}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false,}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false,}}/>
        <Stack.Screen name="MakeOwn" component={MakeOwn} options={{headerShown: false,}}/>
        <Stack.Screen name="DynamicTraining" component={DynamicTraining} options={{headerShown: false,}}/>
        <Stack.Screen name="StrengthTraining" component={StrengthTraining} options={{headerShown: false,}}/>
        <Stack.Screen name="EnduranceTraining" component={EnduranceTraining} options={{headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;