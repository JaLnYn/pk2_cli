import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import SettingScreen from '../screen/SettingScreen'
const MainStack = createStackNavigator();

const headerOptions = {headerTransparent: true, headerTitle: '',}


export default function AuthStackNavigator(){
  return (
    <MainStack.Navigator mode={'modal'} >
        <MainStack.Screen name={'Splash'} component={SettingScreen} options={headerOptions}/>
    </MainStack.Navigator>
  )
}