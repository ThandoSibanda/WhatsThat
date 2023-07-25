import {placeholder} from 'i18n-js';
import { useState } from 'react';
import {TextInput} from 'react-native-web';


const SearchScreen = ({navigation, route}) => {
  const {usersToken} =route.params;
  const [text, setText] = useState();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [sessionToken, setSessionToken] = useState(null);
  const [isLoading, setIsLoading]= useState(false);

  useEffect(() =>{
    setSessionToken(usersToken);
  }, [usersToken]);

  const getUsers = async (input) => {
    if (!isLoading) {
      try {
        setIsLoading(true);

        const response = await fetch(`http://localhost:3333/api/1.0.0/search?q=${input}&search_in=all&limit=10&offset=0`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': usersToken,
          },
        });

        if (response.status === 200) {
          const rJson = await response.json();
          setUsers(rJson);
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

  


  return (
    <SafeAreaView style={styles.container}>

 
      <TextInput style={styles.input} placeholder="Search" onChangeText={(input) =>{ setText(input); getUsers(text)  }}></TextInput>


      <FlatList

        keyExtractor={(item) => item.user_id.toString()}
        data={users}
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

export default SearchScreen;