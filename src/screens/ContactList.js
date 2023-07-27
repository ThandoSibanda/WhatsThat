import React, { Component } from 'react';
import { FlatList, View, StyleSheet, SafeAreaView } from 'react-native-web';
import ContactListItem from '../components/contactListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ContactList extends Component {
  state = {
    contacts: [],
    error: '',
    sessionToken: null,
    isLoading: false
  };

  async componentDidMount() {
    try {
      const usersToken = await AsyncStorage.getItem('usersToken');
      this.setState({ sessionToken: usersToken }, () => {
        this.fetchContacts();
      });
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }
  }

  fetchContacts = async () => {
    const { isLoading, sessionToken } = this.state;
    if (!isLoading && sessionToken) {
      this.setState({ isLoading: true });
      try {
        const response = await fetch('http://localhost:3333/api/1.0.0/contacts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionToken,
          },
        });

        if (response.status === 200) {
          const rJson = await response.json();
          this.setState({ contacts: rJson });
        } else if (response.status === 401) {
          throw 'Unauthorised Request';
        } else if (response.status === 500) {
          throw 'Server Error';
        }
      } catch (error) {
        this.setState({ error: 'Error: ' + error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    const { navigation } = this.props;
    const { contacts, isLoading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.user_id.toString()}
          data={contacts}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <ContactListItem
                id={item.user_id}
                firstname={item.first_name}
                surname={item.last_name}
                onPress={() => navigation.navigate('ContactDetails', item)}
              />
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  listItem: {
    marginTop: 3,
    backgroundColor: '#f8f8f8',
    flex: 1,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default ContactList;

