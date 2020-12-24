import React, { useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import AuthStackNavigator from './navigators/AuthStackNavigator'
import MainStackNavigator from './navigators/MainStackNavigator'
import SplashScreen from './screen/SplashScreen'

import {AuthContext} from './contexts/AuthContext';
import {UserContext} from './contexts/UserContext';
import useAuth from './hooks/useAuth'






const RootStack = createStackNavigator();

export default function App(){
  // const [token, setToken] = React.useState(null);
  // const [user_type, setUserType] = React.useState(null);
  // const [userId, setUserId] = React.useState(null);
  const {auth, user, loading} = useAuth();

  

  if(loading){
    return (<SplashScreen/>)
  }
  
  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerShown: false,}}>
          {
            user == null? (
                  <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator}/>
               )
            : (
            <RootStack.Screen name={'MainStack'}>
              { () => (
                <UserContext.Provider value={user}>
                  <MainStackNavigator/>
                </UserContext.Provider>
              )}
            </RootStack.Screen>
            )
          }
        </RootStack.Navigator>
      </NavigationContainer>

    </AuthContext.Provider>
  )
}