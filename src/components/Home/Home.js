//import liraries
import React, { Component } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { List, ListItem, Button} from 'react-native-elements'

// create a component
class Home extends React.Component {

  constructor(){
      super();

      this.state = {
        latitude: null,
        longitude: null,
        notifications: [
          {
            fromId: 'Amy Farha',
            createdTime: '21/10/2000:23h00min',
            content: 'Vice President'
          },
          {
            fromId: 'Chris Jackson',
            createdTime: '22/10/2000:00h00min',
            content: 'Vice Chairman'
          },
        ]
      };
    }

  static navigationOptions = {
    title: 'Home'
  };

  notWorking() {
    const { params } = this.props.navigation.state;
    return fetch('http://192.168.25.6:8080/drivers/update', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      	"id": params.user.id,
      	"email": params.user.email,
      	"password": params.user.password,
        "atualLatitude": params.user.atualLatitude,
        "atualLongitude": params.user.atualLongitude,
        "status": "NOT_WORKING"
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == "SUCCESSFUL") {
        ToastAndroid.show('OK', ToastAndroid.SHORT);
      } else {
        alert(JSON.stringify(responseJson));
      }
    })
    .catch((error) => {
      ToastAndroid.show('Network Failed', ToastAndroid.SHORT);
    });
  }

  working() {
    const { params } = this.props.navigation.state;
    return fetch('http://192.168.25.6:8080/drivers/update', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      	"id": params.user.id,
      	"email": params.user.email,
      	"password": params.user.password,
        "atualLatitude": this.state.latitude,
        "atualLongitude": this.state.longitude,
        "status": "WORKING"
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == "SUCCESSFUL") {
        ToastAndroid.show('OK', ToastAndroid.SHORT);
      } else {
        alert(JSON.stringify(responseJson));
      }
    })
    .catch((error) => {
      ToastAndroid.show('Network Failed', ToastAndroid.SHORT);
    });
  }

  acceptTrip() {
    const { params } = this.props.navigation.state;
    return fetch('http://192.168.25.6:8080/drivers/trips/accept', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "driver": {
          "id": params.user.id,
        	"email": params.user.email,
        	"password": params.user.password,
          "atualLatitude": this.state.latitude,
          "atualLongitude": this.state.longitude,
          "status": "WORKING"
        },
        "addressFrom": {
          "coordinate": {
            "latitude": 1,
            "longitude": 1
          }
        },
        "addressTo": {
          "coordinate": {
            "latitude": 5,
            "longitude": 5
          }
        },
        "passengers": [
          {"id": 1},
          {"id": 2}
        ]
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == "SUCCESSFUL") {
        ToastAndroid.show('OK', ToastAndroid.SHORT);
      } else {
        alert(JSON.stringify(responseJson));
      }
    })
    .catch((error) => {
      ToastAndroid.show('Network Failed', ToastAndroid.SHORT);
    });
  }

  checkNotifications() {
    const { params } = this.props.navigation.state;
    return fetch('http://192.168.25.6:8080/drivers/notifications/check', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      	"id": params.user.id
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == "SUCCESSFUL") {
        ToastAndroid.show('OK', ToastAndroid.SHORT);
        this.setState({notifications: responseJson.entity});
      } else {
        alert(JSON.stringify(responseJson));
      }
    })
    .catch((error) => {
      ToastAndroid.show('Network Failed', ToastAndroid.SHORT);
    });
  }

  tripProgressFinished() {
    const { params } = this.props.navigation.state;
    return fetch('http://192.168.25.6:8080/drivers/trips/update', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id": params.user.id
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == "SUCCESSFUL") {
        ToastAndroid.show('OK', ToastAndroid.SHORT);
        this.setState({notifications: responseJson.entity});
      } else {
        alert(JSON.stringify(responseJson));
      }
    })
    .catch((error) => {
      ToastAndroid.show('Network Failed', ToastAndroid.SHORT);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <ScrollView>
        <Text>Hello {params.user.email}</Text>
        <TextInput  autoCapitalize="none"
                    onChangeText={(latitude) => this.setState({latitude})}
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder='latitude'
                    placeholderTextColor='rgba(10,10,10,0.7)' />

        <TextInput placeholder='longitude'
                   onChangeText={(longitude) => this.setState({longitude})}
                   placeholderTextColor='rgba(10,10,10,0.7)' />
        <Button title='working' onPress={() => this.working()} />
        <Button title='not working' onPress={() => this.notWorking()} />
        <Button title='checkNotifications' onPress={() => this.checkNotifications()} />
        <List containerStyle={{marginBottom: 20}}>
          {
            this.state.notifications.map((l, i) => (
              <ListItem
                key={i}
                title={l.fromId}
                subtitle={"[" + l.createdTime + "] " + l.content}
                onPress={() => this.acceptTrip()}
              />
            ))
          }
        </List>
        <Button title="tripProgressFinished" onPress={() => this.tripProgressFinished()} />
        <Button title="logoff" onPress={() => navigate('Login')} />
      </ScrollView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title:{
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    }
});

//make this component available to the app
export default Home;
