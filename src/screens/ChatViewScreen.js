import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView
} from 'react-native';
import PageHeader from '../components/PageHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ChatViewScreen extends Component {
  state = {
    newMessage: '',
    message: '',
    error: '',
    isLoading: false
    
  };

  async componentDidMount() {
    try {
      const usersToken = await AsyncStorage.getItem('whatsthat_session_token');
      this.setState({ usersToken }, () => {
        this.getMessages();
      });
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }
  }

  sendMessage = () => {
    
  };

  getMessages = async () => {
    const { isLoading, usersToken } = this.state;
    if (!isLoading) {
      this.setState({ isLoading: true });
      const { chatID } = this.props.route.params;
      try {
        const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': usersToken,
          },
        });
        if (response.status === 200) {
          const rJson = await response.json();
          this.setState({ message: rJson });
        } else if (response.status === 401) {
          throw 'Unauthroised request. Please try and sign in ';
        } else if (response.status === 403) {
          throw 'No Access Granted. You do not have the permissions ';
        } else if (response.status === 500) {
          throw 'Server error. Please try again later';
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    const { chatName } = this.props;
    const { newMessage, message, isLoading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <PageHeader title={chatName} />
        <FlatList
          data={message.messages}
          keyExtractor={(item) => item.message_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.nameText}>
                {item.author.first_name} {item.author.last_name}
              </Text>
              <View style={item.author.user_id === userId ? styles.myMessage : styles.otherMessage}>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message"
            value={newMessage}
            onChangeText={(text) => this.setState({ newMessage: text })}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Icon name="paper-plane" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 60,
  },
  heading: {

  },
  messageContainer: {
    marginVertical: 5,
  },

  inputContainer: {
    flexDirection: 'row',

  },

  input: {
    height: 40,
    width: '85%',
    marginHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
  },

  sendButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 3,
    width: '10%',
    marginHorizontal: 5,
  },

  buttonText: {
    color: 'white',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'purple',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'darkgrey',
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 10,
  },
  messageText: {
    color: 'white',

  },
  nameText: {
    marginHorizontal: 10,

  },


});

export default ChatViewScreen;
