import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';

const SearchScreen = ({route}) => {
  

  return (


    <SafeAreaView style={styles.container}>


      <View style={styles.userContainer}>
        <Image
          source={require('../../src/assets/images/defaultDP.jpeg')}
          style={styles.image}
        />
        <Text style={styles.name}>{first_name} {last_name}</Text>
      </View>

      <View style={styles.emailBox}>
        <Text style={styles.Text}> Email:</Text>

        <Text style={styles.emailText}> {email}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  userContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,

  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
  name: {
    fontSize: 32,
  },
  emailBox: {
    backgroundColor: '#ffffff',
    width: '90%',
    height: 70,
    borderRadius: 3,
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 18,
    marginLeft: 15,
  },
  Text: {
    fontSize: 14,
    marginLeft: 15,
  },
});

export default SearchScreen;
