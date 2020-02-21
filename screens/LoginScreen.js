import React from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,StatusBar, LayoutAnimation} from 'react-native'
import * as firebase from 'firebase'
import * as Facebook from 'expo-facebook';
import {ImageBackground} from 'react-native'


export default class LoginScreen extends React.Component{

    static navigationOptions ={
        headerShown:false
    }
    state={
        email:"",
        password:"",
        errorMessage:null
    };

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=> {
            if (user != null) {
                console.log(user);
        
        }})
    }
    handleLogin = () =>{
        const {email,password} =this.state

        firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(error => this.setState({errorMessage:error.message}));
    };

     facebook = async () => {
        await Facebook.initializeAsync('253730718969036');
        const {type, token,email}  =   await Facebook.logInWithReadPermissionsAsync('253730718969036', ['public_profile', 'email'])
        this.email=this.setState(email)
           if(type == "success"){
               const credential =  firebase.auth.FacebookAuthProvider.credential(token)
    
               firebase.auth().signInWithCredential(credential)
               .catch(error => {
                   console.log(error)
               })
               this.props.navigation.navigate("Home")
           }
    
           
    
           }
    

    render(){
        LayoutAnimation.easeInEaseOut();
        return(
            
            <ImageBackground source={require("../assets/hot.jpg")} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>

            <StatusBar barStyle="light-content"></StatusBar>

            <Image source={require("../assets/user.png")}
            style={{marginTop:60,alignSelf:"center"}}></Image>

                <View style={styles.errorMessage}>
        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text styles={styles.inputTitle}>Email Address</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize="none" 
                        onChangeText={email=> this.setState({email})}
                        value={this.state.email}>                   
                        </TextInput>
                    </View>

                    <View style={{marginTop:32}}>
                        <Text styles={styles.inputTitle}>Password</Text>
                        <TextInput 
                        style={styles.input}
                        secureTextEntry 
                        autoCapitalize="none"
                        onChangeText={password=>this.setState({password})}
                        value={this.state.password}></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{color:"#FFF",fontWeight:"500"}}>Sign In</Text>
                </TouchableOpacity>
                
                <View>
        
                <TouchableOpacity style={styles.button2} onPress={this.facebook}>
            <Text style={{color:"#FFF",fontWeight:"500",fontFamily: "roboto-black"}}>Login with Facebook!</Text></TouchableOpacity>
      </View>
                

                <TouchableOpacity 
                style={{alignSelf:"center",marginTop:32}} 
                onPress={()=> this.props.navigation.navigate("Register")}>
                    <Text style={{color:"#414959",fontSize: 13}}>
                        News to SocialApp?<Text style={{fontWeight:"500",color:"#E9446A",fontFamily: "roboto-black"}}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            </ImageBackground>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    greeting:{
        marginTop:32,
        fontSize:18,
        fontWeight:"400",
        textAlign:"center",
        
    },
    errorMessage:{
        height:72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal:30
    },
    error:{
        color:"#E9446A",
        fontSize:13,
        fontWeight:"600",
        textAlign:"center"
    },
    form:{
        marginBottom:48,
        marginHorizontal:30
    },
    inputTitle:{
      color:"#8A8F9E",
      fontSize:10,
      textTransform:"uppercase"
      
    },
    input:{
        borderBottomColor:"#8A8F9E",
        borderBottomWidth:StyleSheet.hairlineWidth,
        height: 40,
        fontSize:15,
        color:"#161F3D"
    },
    button:{
        marginHorizontal:30,
        backgroundColor:"#E9446A",
        borderRadius:4,
        height:52,
        alignItems:"center",
        justifyContent:"center"
    },
    button2:{
        marginHorizontal:90,
        marginTop:70,
        backgroundColor:"#0844d1",
        borderRadius:8,
        height:52,
        alignItems:"center",
        justifyContent:"center"
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
})