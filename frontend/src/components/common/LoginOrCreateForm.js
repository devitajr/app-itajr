import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet, Image, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';



class LoginOrCreateForm extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  handleRequest() {
    const endpoint = this.props.create ? 'register' : 'login';
    const payload = { username: this.state.username, password: this.state.password } 
    
    if (this.props.create) {
      payload.first_name = this.state.firstName;
      payload.last_name = this.state.lastName;
    }
    
    axios
      .post(`/auth/${endpoint}/`, payload)
      .then(response => {
        const { token, user } = response.data;
  
        // We set the returned token as the default authorization header
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        
        // Navigate to the home screen
        Actions.main();
      })
      .catch(error => console.log(error));
  }

  onUsernameChange(text) {
    this.setState({ username: text });
  }

  onPasswordChange(text) {
    this.setState({ password: text });
  }

  onFirstNameChange(text) {
    this.setState({ firstName: text });
  }

  onLastNameChange(text) {
    this.setState({ lastName: text });
  }

  renderButton() {
    const buttonText = this.props.create ? 'Me Inscrever' : 'Entrar';

    return (
      <Button title={buttonText} onPress={this.handleRequest.bind(this)} color='rgb(27, 45, 89)'/>
    );
  }

  renderCreateForm() {
    const { fieldStyle, textInputStyle } = style;
    if (this.props.create) {
      return (
          <View style={fieldStyle}>
            <TextInput
              placeholder="Nome"
              autoCorrect={false}
              onChangeText={this.onFirstNameChange.bind(this)}
              style={textInputStyle}
            />
            <TextInput
              placeholder="Sobrenome"
              autoCorrect={false}
              onChangeText={this.onLastNameChange.bind(this)}
              style={textInputStyle}
            />
          </View>
      );
    }
  }
  renderCreateLink() {
    if (!this.props.create) {
      const { accountCreateTextStyle } = style;
      return (
        <Text style={accountCreateTextStyle}>
          Ou 
          <Text style={{ color: 'rgb(27, 45, 89)' }} onPress={() => Actions.register()}>
            {' Me inscrever'}
          </Text>
        </Text>
      );
    }
  }

  render() {
    const {
      formContainerStyle,
      fieldStyle,
      textInputStyle,
      buttonContainerStyle,
      accountCreateContainerStyle
    } = style;

    return (
	<>
      <View>	        
        <ImageBackground
            source={require('../../../images/BackHome.png')} 
            style={{width: '100%', height: 150,flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'}}
          >
            <Image
              source={require('../../../images/LogoVertical.png')}
              style={{
                height: 100,
                width: 100,
                resizeMode:'contain',
              }}
            />
          </ImageBackground>
      </View>
      <View style={{ flex: 1, backgroundColor: '#ccc', }}>
        <View style={formContainerStyle}>
          <View style={fieldStyle}>
            <TextInput
              placeholder="Login"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.onUsernameChange.bind(this)}
              style={textInputStyle}
            />
          </View>
          <View style={fieldStyle}>
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Senha"
              onChangeText={this.onPasswordChange.bind(this)}
              style={textInputStyle}
            />
          </View>
          {this.renderCreateForm()}
        </View>
        <View style={buttonContainerStyle}>
          {this.renderButton()}
          <View style={accountCreateContainerStyle}>
            {this.renderCreateLink()}
          </View>
        </View>
      </View>
</>
    );
  }
}


const style = StyleSheet.create({
  formContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    flex: 1,
    padding: 15,
    borderBottomColor: 'rgb(27, 45, 89)',
    borderBottomWidth: 0.8,
  },
  fieldStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    padding: 25
  },
  accountCreateTextStyle: {
    color: 'black'
  },
  accountCreateContainerStyle: {
    padding: 25,
    alignItems: 'center'
  }
});


export default LoginOrCreateForm;
