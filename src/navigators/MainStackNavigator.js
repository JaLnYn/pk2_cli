import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screen/ProfileScreen'
import SplashScreen from '../screen/SplashScreen'
import ImageSelect from '../screen/ImageSelection'
import MessageScreen_T from '../screen/tenentScreens/MessageScreen_T'
import MessageScreen_L from '../screen/landlordScreens/MessageScreen_L'
import { UserContext } from '../contexts/UserContext';
const MainStack = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const headerOptions = {headerTransparent: true, headerTitle: '',}


function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name={'MainScreen'} component={ProfileScreen} options={{headerShown: false}}/>
      <ProfileStack.Screen name={'ImgScreen'} component={ImageSelect} options={headerOptions}/>
    </ProfileStack.Navigator>
  );
}


export default function AuthStackNavigator(){
  const user = React.useContext(UserContext);
  return (
    <MainStack.Navigator mode={'modal'} >
      
        <MainStack.Screen name="Profile" component={ProfileStackScreen} />
        <MainStack.Screen name={'Splash'} component={SplashScreen} options={headerOptions}/>
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