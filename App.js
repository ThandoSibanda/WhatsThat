import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <View>
        <Text>Email:</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <Text>Password:</Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button
          title="Log in"
          onPress={() => login()}
        />
      </View>
    );
  }
}

export default App;
