import React from 'react';
import {View,Text,StyleSheet,ActivityIndicator} from 'react-native'
import * as firebase from 'firebase'
import * as Font from 'expo-font';

export default class LoadingScreen extends React.Component{

    state = {
        fontLoaded: false,
      };

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=> {
            this.props.navigation.navigate(user ? "App":"Auth");

                Font.loadAsync({        
                    'roboto-black': require('../assets/fonts/Roboto-Black.ttf'),
                    'roboto-bold' : require('../assets/fonts/Roboto-Bold.ttf')
      });
      this.setState({ fontLoaded: true });
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})