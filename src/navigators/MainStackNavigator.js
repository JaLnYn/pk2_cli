import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screen/ProfileScreen'
import SplashScreen from '../screen/SplashScreen'
import ImageSelect from '../screen/ImageSelection'
import PropEd from '../screen/landlordScreens/PropertyEdit'
import PropAdd from '../screen/landlordScreens/PropertyAdd'
import PropInfo from '../screen/landlordScreens/PropInfo'
import PickAdd from '../screen/landlordScreens/PickAddress'
import MessageScreen_T from '../screen/tenentScreens/MessageScreen_T'
import SwipeScreen from '../screen/tenentScreens/Swipe'
import MessageScreen_L from '../screen/landlordScreens/MessageScreen_L'
import { UserContext } from '../contexts/UserContext';
import Management from '../screen/landlordScreens/Management';
const MainStack = createBottomTabNavigator();
const ProfileStackNav = createStackNavigator();
const ManagementStackNav = createStackNavigator();
//const ProfileStack = createStackNavigator();
const headerOptions = {headerTransparent: true, headerTitle: '',}


function ProfileStack() {
  return (
    <ProfileStackNav.Navigator>
      <ProfileStackNav.Screen name={'ProfileScreen'} component={ProfileScreen} options={headerOptions}/>
      <ProfileStackNav.Screen name={'ProfileImageSelect'} component={ImageSelect} options={headerOptions}/>
    </ProfileStackNav.Navigator>
  );
}

function ManagementStack() {
  return (
    <ManagementStackNav.Navigator>
      <ManagementStackNav.Screen name={'Management'} component={Management} options={headerOptions}/>
      <ManagementStackNav.Screen name={'PropEd'} component={PropEd} options={headerOptions}/>
      <ManagementStackNav.Screen name={'PickAdd'} component={PickAdd} options={headerOptions}/>
      <ManagementStackNav.Screen name={'PropInfo'} component={PropInfo} options={headerOptions}/>
      <ManagementStackNav.Screen name={'PropAdd'} component={PropAdd} options={headerOptions}/>
      <ManagementStackNav.Screen name={'ManageImageSelect'} component={ImageSelect} options={headerOptions}/>
    </ManagementStackNav.Navigator>
  );
}

export default function AuthStackNavigator(){
  const user = React.useContext(UserContext);
  return (
    <MainStack.Navigator>
      <MainStack.Screen name={'ProfileStack'} component={ProfileStack} options={headerOptions}/>
      {
        user != null && JSON.parse(user).user_type == 'T' ? (
          <MainStack.Screen name={'Swipe'} component={SwipeScreen} options={headerOptions}/>
        ): (
          <MainStack.Screen name={'Manage'} component={ManagementStack}/>
        )
      }
      {
        user != null && JSON.parse(user).user_type == 'T' ? (
          <MainStack.Screen name={'Message'} component={MessageScreen_T} options={headerOptions}/>
        ): (
          <MainStack.Screen name={'Message'} component={MessageScreen_L} options={headerOptions}/>
        )
      }
    </MainStack.Navigator>
  )
}
