//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';

// create a component
class LoginForm extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
      };
    }

    onButtonPress = () => {
      this.state.email="rmeloca@gmail.com"
      this.state.password="rmeloca"
      if (this.state.email + this.state.password == this.state.email || this.state.email + this.state.password == this.state.password) {
        alert("preencha corretamente");
        return;
      }
      this.login(this.state);
    };

    login(credentials) {
      return fetch('http://192.168.25.6:8080/drivers/authenticate', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == "SUCCESSFUL"){
          this.props.navigation('Home', {
            "user": {
              "email": this.state.email,
              "password": this.state.password,
              "id": responseJson.entity.id,
              "atualLatitude": responseJson.entity.atualLatitude,
              "atualLongitude": responseJson.entity.atualLongitude,
              "status": responseJson.entity.status
            }
          });
        } else {
          alert(JSON.stringify(responseJson));
        }
      })
      .catch((error) => {
        alert("network failed" + JSON.stringify(error));
      });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input}
                            autoCapitalize="none"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            onChangeText={(email) => this.setState({email})}
                            autoCorrect={false}
                            keyboardType='email-address'
                            returnKeyType="next"
                            placeholder='E-mail Address'
                            placeholderTextColor='rgba(10,10,10,0.7)'/>

                <TextInput style = {styles.input}
                           returnKeyType="go" ref={(input)=> this.passwordInput = input}
                           placeholder='Password'
                           onChangeText={(password) => this.setState({password})}
                           placeholderTextColor='rgba(10,10,10,0.7)'
                           secureTextEntry/>
                 { /* <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */ }
              <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
                    <Text  style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(40,40,40,0.2)',
        marginBottom: 20,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    }

});

//make this component available to the app
export default LoginForm;
