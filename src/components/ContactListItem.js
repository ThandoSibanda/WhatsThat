import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

class ContactListItem extends Component {
  state = {
    profileImageUrl: null
  };

  componentDidMount() {
    this.getProfilePicture();
  }

  getProfilePicture = () => {
    const { userID, sessionToken } = this.props;
    fetch(`http://localhost:3333/api/1.0.0/user/${userID}/photo`, {
      method: 'GET',
      headers: {
        'X-Authorization': sessionToken
      },
    })
    .then((res) => res.blob())
    .then((resBlob) => {
      const img = URL.createObjectURL(resBlob);
      this.setState({ profileImageUrl: img });
    })
    .catch(() => {
      this.setState({ profileImageUrl: '../../src/assets/images/defaultDP.jpeg' });
    });
  }

  render() {
    const { onPress, firstname, surname } = this.props;
    const { profileImageUrl } = this.state;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={profileImageUrl ? { uri: profileImageUrl } : require('../../src/assets/images/defaultDP.jpeg')}
              style={styles.image}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.text}>{firstname} {surname}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  nameContainer: {
    margin: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default ContactListItem;
