/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   TouchableOpacity
} from 'react-native';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
import firebase from 'firebase'

var config = {
   apiKey: 'AIzaSyDcimeA-s3sqUiVFqgX6XlFKp6uLB7bkCo',
   authDomain: 'fir-authentication-9f070.firebaseapp.com/',
   databaseURL: 'https://fir-authentication-9f070.firebaseio.com/'
}

const firebaseRef = firebase.initializeApp(config)

export default class FacebookFirebaseAuthentication extends Component {

   _fbAuth() {
      LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
         function(result) {
            if (result.isCancelled) {
               alert('Login cancelled');
            } else {

               AccessToken.getCurrentAccessToken().then((accessTokenData) => {
                  const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
                  firebase.auth().signInWithCredential(credential).then((result) => {
                     // Promise was succesful
                  }, (error) => {
                     // Promise was rejected
                     console.log(error)
                  })
               }, (error => {
                  console.log('Some error occured: ' + error)
               }))
            }
         },
         function(error) {
            alert('Login fail with error: ' + error);
         }
      );
   }

   render() {
      return (
         <View style={styles.container}>
            <TouchableOpacity onPress={this._fbAuth}>
               <Text>Login with Facebook</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
   },
   welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   },
});

AppRegistry.registerComponent('FacebookFirebaseAuthentication', () => FacebookFirebaseAuthentication);
