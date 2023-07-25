import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from 'react';
import { NavigationContainer } from "@react-navigation/native";

import ChatListScreen from "../screens/ChatList";
import SingleChatStack from "./SingleChatStack";




const ChatsNav = createNativeStackNavigator();

export default class ChatsStack extends Component{

  render(){
    return (
      <NavigationContainer>
        <ChatsNav.Navigator>
        <ChatsNav.Screen name='ChatList' component={ChatListScreen} />
        <ChatsNav.Screen name='SingleChat' component={SingleChatStack}/>

       
      </ChatsNav.Navigator>

      </NavigationContainer>
      
    );
    }



}
  
  

