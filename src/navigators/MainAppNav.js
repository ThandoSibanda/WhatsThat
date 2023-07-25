
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ContactStack from "./ContactStack";
import ChatsStack from './ChatsStack';



const MainAppNav = createBottomTabNavigator();



export default class MainApp extends Component{
  render(){
    return (
      <NavigationContainer>
        <MainAppNav.Navigator>
          
          <MainAppNav.Screen name='ContactStack' component={ContactStack} />
          <MainAppNav.Screen name='ChatStack' component={ChatsStack} />

        
        </MainAppNav.Navigator>
    


      </NavigationContainer>
    
     
    );
  }
}