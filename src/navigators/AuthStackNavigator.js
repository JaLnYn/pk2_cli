import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import LoginScreen from '../screen/LoginScreen'
import SignUpScreen from '../screen/SignUpScreen'
import SignUpDetailScreen from '../screen/SignUpDetailScreen'
const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

const headerOptions = {headerTransparent: true, headerTitle: '',}


export default function AuthStackNavigator(){
  return (
    <AuthStack.Navigator mode={'modal'} >
        <AuthStack.Screen name={'Login'}  options={headerOptions}> 
          {() => (
            <LoginStack.Navigator options={headerOptions}>
              <LoginStack.Screen name={'Login'} component={LoginScreen} />
            </LoginStack.Navigator>
          )}
        </AuthStack.Screen>
        <AuthStack.Screen name={'SignUp'} component={SignUpScreen} options={headerOptions}/>
        <AuthStack.Screen name={'SignUpDetail'} component={SignUpDetailScreen} options={headerOptions}/>
    </AuthStack.Navigator>
  )
}