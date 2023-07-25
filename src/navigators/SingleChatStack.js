import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from 'react';
import { NavigationContainer } from "@react-navigation/native";



import ChatViewScreen from "../screens/ChatViewScreen";





const SingleChasNav = createNativeStackNavigator();


export default class SingleChatStack extends Component{

  render(){
    return (

      <NavigationContainer>

        <SingleChasNav.Navigator>

         <SingleChasNav.Screen name='ChatList' component={ChatViewScreen} />

       
        </SingleChasNav.Navigator>

      </NavigationContainer>
      
    ); 
  }

  
}