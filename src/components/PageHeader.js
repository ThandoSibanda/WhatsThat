import {Icon} from '@rneui/themed';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';


const PageHeader = ({title, icon, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>

      <View style={styles.rightContainer}>
        <Icon name ={icon} size={20} color='black' />

      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
  },

  heading: {
    fontSize: 22,
    color: 'purple',

  },
  rightContainer: {
    margin: 5,
  },

});


export default PageHeader;
