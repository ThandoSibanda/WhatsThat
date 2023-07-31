import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView,} from 'react-native';

class ContactView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: props.route.params.first_name,
      last_name: props.route.params.last_name,
      email: props.route.params.email,
    };
  }


  

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userContainer}>
          <Image
            source={require('../../src/assets/images/defaultDP.jpeg')}
            style={styles.image}
          />
          <Text style={styles.name}>{this.state.first_name} {this.state.last_name}</Text>
        </View>

        <View style={styles.emailBox}>
          <Text style={styles.Text}>Email:</Text>
          <Text style={styles.emailText}>{this.state.email}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

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

export default ContactView;
