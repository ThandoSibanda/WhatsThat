import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatListItem = ({navigate, chat_id, chat_name, message, author_id, first_name, last_name, timestamp}) => {
  const [userId, setUserId] = useState(null);
  const [authorName, setAuthorName] = useState('');


  const getTimeDiff = (timestamp) => {
    const currentTime = new Date().getTime();
    const Diff = currentTime - (timestamp * 1000);

    const seconds = Math.floor(Diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

  const getID = async () => {
    try {
      const token = await AsyncStorage.getItem('whatsthat_user_id');
      return token;
    } catch (error) {
      throw 'Session Token Not found';
    }
  };

  const checkUser = async (author_id) => {
    try {
      const id = await getID();
      if (getID()=== author_id) {
        setAuthorName('You');
      } else {
        setAuthorName(`${first_name} ${last_name}` );
      }
    } catch (error) {
      setAuthorName('Unknown');
      return;
    }
  };

  useEffect(() => {
    checkUser(author_id);
  }, [author_id]);

  return (


    <TouchableOpacity style={styles.container} onPress={navigate('ChatViewScreeen', ({chatID: chat_id}) )}>

      <View style={styles.chatContainer}>
        <Text style={styles.title}>{chat_name}</Text>
        <Text style={styles.summary}>{authorName}:{message}</Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{getTimeDiff(timestamp)}</Text>
      </View>


    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,

  },

  chatContainer: {
    flex: 1,
    marginRight: 10,
  },

  title: {
    color: 'purple',
    fontSize: 18,
  },
  summary: {
    color: '#333',
    fontSize: 12,
  },

  timeContainer: {
    alignItems: 'flex-end',
  },

  timeText: {
    color: '#666',
    fontSize: 12,
  },
});


export default ChatListItem;
