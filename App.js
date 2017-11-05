import React, { Component } from 'react';
import {
  ActivityIndicator,
  ListView,
  Text,
  Button,
  TextInput,
  View,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Login from './src/components/Login/Login';
import Home from './src/components/Home/Home';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Home navigation={this.props.navigation} />
    );
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };
  render() {
    return (
      <Login navigation={this.props.navigation} />
    );
  }
}

const SimpleApp = StackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
