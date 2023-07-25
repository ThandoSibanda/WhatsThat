import {FlatList, View, StyleSheet, SafeAreaView} from 'react-native-web';
import ContactListItem from '../components/contactListItem';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactList = ({navigation, route}) => {
  const {usersToken} =route.params;

  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [sessionToken, setSessionToken] = useState(null);
  const [isLoading, setIsLoading]= useState(false);

  useEffect(() =>{
    setSessionToken(usersToken);
  }, [usersToken]);


  useEffect(() => {
    if (!isLoading) {


    }
    const fetchContacts = async () => {
      if (!isLoading) {
        try {
          setIsLoading(true);

          const response = await fetch('http://localhost:3333/api/1.0.0/contacts', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Authorization': usersToken,
            },
          });

          if (response.status === 200) {
            const rJson = await response.json();
            setContacts(rJson);
          } else if (response.status === 401) {
            throw 'Unauthorised Request';
          } else if (response.status === 500) {
            throw 'Server Error';
          }
        } catch (error) {
          setError('Error: ' + error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (sessionToken) {
      fetchContacts();
    }
  }, [sessionToken]);

  return (
    <SafeAreaView style={styles.container}>


      <FlatList

        keyExtractor={(item) => item.user_id.toString()}
        data={contacts}
        renderItem={({item}) =>(
          <View style={styles.listItem}>

            <ContactListItem
              id={item.user_id}
              firstname={item.first_name}
              surname={item.last_name}
              onPress ={() => navigation.navigate('ContactDetails', item)}
            />

          </View>
        )}
      />
    </SafeAreaView>
  );
};

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
