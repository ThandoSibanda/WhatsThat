import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';

export default class ChatListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [], 
      error: null,
      submitted: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:3333/api/1.0.0/chat', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem('whatsthat_session_token'),
        },
      });

      if (response.status >=200 && response.status<300) {
        const rJson = await response.json();
        this.setState({ chats: rJson }); 
      } else if (response.status === 403) {
        throw new Error('Forbidden');
      } else if (response.status === 404) {
        throw new Error('Server Error, Please try again later');
      } else if (response.status === 500) {
        throw new Error('Server Error, Please try again later');
      }
    } catch (error) {
      this.setState({ error, submitted: false });
    }
  }

  render() {
    const { chats } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          style={styles.list}
          data={chats}
          keyExtractor={(item) => item.chat_id.toString()}
          renderItem={({ item }) => (
            <ChatListItem
              chat_id={item.chat_id}
              chat_name={item.name}
              message={item.last_message.message}
              author_id={item.last_message.author.user_id}
              first_name={item.last_message.author.first_name}
              last_message={item.last_message.author.last_name}
              timestamp={item.last_message.timestamp}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    paddingHorizontal: 15,
  },
});
