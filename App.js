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
import PocketBase from 'pocketbase';

const Stack = createNativeStackNavigator();

const App = () => {

  const pb = new PocketBase('https://mathiasdb.em1t.xyz/');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Introduction'>
        <Stack.Screen name="Introduction" component={Introduction} options={{headerShown: false,}}/>
        <Stack.Screen name="LogIn" component={LogIn} options={{headerShown: false,}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false,}}/>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <HomeScreen {...props} pb={pb} />}
        </Stack.Screen>
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