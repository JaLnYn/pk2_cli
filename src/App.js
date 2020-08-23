import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import AuthStackNavigator from './navigators/AuthStackNavigator'

import {AuthContext} from './contexts/AuthContext';


const RootStack = createStackNavigator();

export default function App(){
  const auth = React.useMemo(
    () => ({
      login:(email, password) => {
        console.log('login',email, password);
      },
      logout: () => {
        console.log('logout');
      },
      signup: (email, password) => {
        console.log('sign up',email, password)
      }
    }), 
    [],)
  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator}/>
        </RootStack.Navigator>
      </NavigationContainer>

    </AuthContext.Provider>
  )
}