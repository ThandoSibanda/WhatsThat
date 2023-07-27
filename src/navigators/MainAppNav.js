
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ContactStack from "./ContactStack";
import ChatsStack from './ChatsStack';
import SearchStack from './SearchStack';



const MainAppNav = createBottomTabNavigator();



export default class MainApp extends Component{
  render(){
    return (
      
        <MainAppNav.Navigator>
          
          <MainAppNav.Screen name='Contacts' component={ContactStack} />
          <MainAppNav.Screen name='Chats' component={ChatsStack} />
          <MainAppNav.Screen name='Search' component={SearchStack} />

        
        </MainAppNav.Navigator>
    
     
    );
  }
}