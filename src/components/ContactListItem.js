import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const ContactListItem = ({onPress, id, firstname, surname, email}) => {
  return (


    <TouchableOpacity style={styles.container} onPress={onPress}>

      <View style={styles.container}>
        <Image
          source={require('../../src/assets/images/defaultDP.jpeg')}
          style={styles.image}
        />
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.text}>{firstname} {surname}</Text>
      </View>
    </TouchableOpacity>

  );
it};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    display: 'flex',
    alignItems: 'center',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },

  nameContainer: {
    margin: 10,
  },

  text: {
    fontSize: 18,
  },
});

export default ContactListItem;
