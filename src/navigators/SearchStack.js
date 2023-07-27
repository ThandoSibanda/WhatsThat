import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from 'react';
import { NavigationContainer } from "@react-navigation/native";

import SearchScreen from "../screens/ContactView";
const ContactNav = createNativeStackNavigator();


export default class SearchStack extends Component{

  render(){
    return (
     
        <ContactNav.Navigator>
          <ContactNav.Screen name="Search" component={SearchScreen}/>
          <ContactNav.Screen name="ContactDetails" component={ContactView}/>
        </ContactNav.Navigator>

      
      
    );
  }


}