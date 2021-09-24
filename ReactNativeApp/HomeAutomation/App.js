import React, { useRef, useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  ScrollView,
  ActivityIndicator,
  AppState,
} from 'react-native';

import { Header, Icon } from 'react-native-elements';
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

LogBox.ignoreLogs([
  'Require cycle: node_modules'
])

const App = () => {


  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  var Aes = NativeModules.Aes;

  const [loader, setLoader] = useState(true);

  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const [isEnabled6, setIsEnabled6] = useState(false);
  const [isEnabled7, setIsEnabled7] = useState(false);
  const [isEnabled8, setIsEnabled8] = useState(false);
  const [isEnabled9, setIsEnabled9] = useState(false);
  const [isEnabled10, setIsEnabled10] = useState(false);
  const [isEnabled11, setIsEnabled11] = useState(false);
  const [isEnabled12, setIsEnabled12] = useState(false);

  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
  const toggleSwitch4 = () => setIsEnabled4(previousState => !previousState);
  const toggleSwitch5 = () => setIsEnabled5(previousState => !previousState);
  const toggleSwitch6 = () => setIsEnabled6(previousState => !previousState);
  const toggleSwitch7 = () => setIsEnabled7(previousState => !previousState);
  const toggleSwitch8 = () => setIsEnabled8(previousState => !previousState);
  const toggleSwitch9 = () => setIsEnabled9(previousState => !previousState);
  const toggleSwitch10 = () => setIsEnabled10(previousState => !previousState);
  const toggleSwitch11 = () => setIsEnabled11(previousState => !previousState);
  const toggleSwitch12 = () => setIsEnabled12(previousState => !previousState);


  //Random initialization vector & key for AES encryption
  const iv = "53616c7661486173616e402323232323";
  const key = "4e4343532d5545545040496f54232323";


  
  const encryptData = (plainText) => {
    return Aes.encrypt(plainText, key, iv).then(encryptedData => ({
      encryptedData
    }))
  }

  const decryptData = (encryptedData) => {
    return Aes.decrypt(encryptedData, key, iv).then(decryptedData => ({
      decryptedData
    }))
  }

  //Switch appliances ON/OFF
  const switchState = (deviceName, deviceState, board) => {

     //Enter username and password for basic auth
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic UserName:Password");

     if (deviceState) {
      
      var formdata = new FormData();
      encryptData(deviceName)
        .then(({ encryptedData }) => {
          // console.log('encrypted:', encryptedData);
          formdata.append("deviceName", encryptedData);
          encryptData("Off")
            .then(({ encryptedData }) => {
              //   console.log('encrypted:', encryptedData);
              formdata.append("deviceState", encryptedData);

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
              };

              fetch("Enter URL here", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => {
                 // console.log('error: ', error);
                });
            });
        });
     }

     else {

       var formdata = new FormData();
       encryptData(deviceName)
        .then(({ encryptedData }) => {
          //console.log('encrypted:', encryptedData);
          formdata.append("deviceName", encryptedData);
          encryptData("On")
            .then(({ encryptedData }) => {
              //  console.log('encrypted:', encryptedData);
              formdata.append("deviceState", encryptedData);

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
              };

              fetch("Enter URL here", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => {
                //  console.log('error: ', error);
                });
            });
        });
     }
  }

  //Check initial state of the appliances as the app is launched
  const checkStatus = () => {


    //Enter username and password for basic auth
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic UserName:Password");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

     fetch("Enter URL here", requestOptions)
      .then(response => response.json())
      .then(result => {
        
        decryptData(result[0])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled1(true);
            }
          })
          .catch(error => {
           // console.log(error)
          })

        decryptData(result[1])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled2(true);
            }
          })
          .catch(error => {
           // console.log(error)
          })

          decryptData(result[2])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled3(true);
            }
          })
          .catch(error => {
          //  console.log(error)
          })

          decryptData(result[3])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled4(true);
            }
          })
          .catch(error => {
           // console.log(error)
          })
      
    }).catch(error => {
     // console.log('error: ', error)
    });
  
    fetch("Enter URL here", requestOptions)
      .then(response => response.json())
      .then(result => {
        
        decryptData(result[0])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled5(true);
            }
          })
          .catch(error => {
           // console.log(error)
          })

        decryptData(result[1])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled6(true);
            }
          })
          .catch(error => {
           // console.log(error)
          })

          decryptData(result[2])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled7(true);
            }
          })
          .catch(error => {
          //  console.log(error)
          })

          decryptData(result[3])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled8(true);
            }
          })
          .catch(error => {
          //  console.log(error)
          })
      
    }).catch(error => {
      //console.log('error: ', error)
    });

    fetch("Enter URL here", requestOptions)
      .then(response => response.json())
      .then(result => {
        
        decryptData(result[0])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled9(true);
            }
          })
          .catch(error => {
           // console.log(error)
          })

        decryptData(result[1])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled10(true);
            }
          })
          .catch(error => {
            //console.log(error)
          })

          decryptData(result[2])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled11(true);
            }
          })
          .catch(error => {
           // console.log(error)
          })

          decryptData(result[3])
          .then(({ decryptedData }) => {
            //console.log('decrypted:', decryptedData)
            if (decryptedData == 'On') {
              setIsEnabled12(true);
            }
          })
          .catch(error => {
          //  console.log(error)
          })
      
    }).catch(error => {
    //console.log('error: ', error)
    });
  //console.log("Status Updated")
  setLoader(false);
  }

  const _handleAppStateChange = (nextAppState) => {

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
   // console.log("AppState", appState.current);
    if (appState.current === "active")
    {
    //  console.log('checking')
     checkStatus();
    }
  };


  useEffect(() => {
    checkStatus();
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.Container}>
        <Header
        statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" 
        centerComponent={{ text: 'Home Automation App', style: { color: '#fff', fontSize: hp('2.2') ,fontWeight: 'bold',} }}
        />
         
        <View style={styles.Section}>
        
          <Text style={styles.Seclabel}> Board 1</Text>
              <View style={styles.ROne}>
                
                <Icon
                    disabled = {loader ? true : false}
                    reverse = {isEnabled1 ? true : false}
                    raised
                    name='fan'
                    type='material-community'
                    color='#beb07b'
                    size={35}
                    onPress={()=>{
                      toggleSwitch1();
                      switchState("Fan-1",isEnabled1,"Board1");
                    }} 
                  />  
                <Icon
                    disabled = {loader ? true : false}
                    reverse = {isEnabled2 ? true : false}
                    raised
                    name='fan'
                    type='material-community'
                    color='#beb07b'
                    size={35}
                    onPress={()=>{
                      toggleSwitch2();
                      switchState("Fan-2",isEnabled2,"Board1");
                    }}  
                  />
            
              </View>
              <View style={styles.ROne}>
                <Text style={styles.label}> 
                Fan 1
                </Text>
                <Text style={styles.label}>
                Fan 2
                </Text>
              </View>

              <View style={styles.ROne}>
                <Icon
                    disabled = {loader ? true : false}
                    reverse = {isEnabled3 ? true : false}
                    raised
                    name='lightbulb-outline'
                    type='material-community'
                    color='#beb07b'
                    size={35}
                    onPress={()=>{
                      toggleSwitch3();
                      switchState("Light-1",isEnabled3,"Board1");
                    }}
                  />
                <Icon
                    disabled = {loader ? true : false}
                    reverse = {isEnabled4 ? true : false}
                    raised
                    name='lightbulb-outline'
                    type='material-community'
                    color='#beb07b'
                    size={35}
                    onPress={()=>{
                      toggleSwitch4();
                      switchState("Light-2",isEnabled4,"Board1");
                    }}
                    
                  />
              </View>
              <View style={styles.ROne}>
                <Text style={styles.label}>
                  
                  Light 1
                </Text>
                <Text style={styles.label}>
                
                Light 2
              </Text>
              </View>
            </View>
            <View style={styles.Section}>
              <Text style={styles.Seclabel}> Board 2</Text>
                <View style={styles.ROne}>
                  
                  <Icon
                      disabled = {loader ? true : false}
                      reverse = {isEnabled5 ? true : false}
                      raised
                      name='fan'
                      type='material-community'
                      color='#beb07b'
                      size={35}
                      onPress={()=>{
                        toggleSwitch5();
                        switchState("Fan-1",isEnabled5,"Board2");
                      }} 
                    />  
                  <Icon
                      disabled = {loader ? true : false}
                      reverse = {isEnabled6 ? true : false}
                      raised
                      name='fan'
                      type='material-community'
                      color='#beb07b'
                      size={35}
                      onPress={()=>{
                        toggleSwitch6();
                        switchState("Fan-2",isEnabled6,"Board2");
                      }}  
                    />
              
                </View>
                <View style={styles.ROne}>
                  <Text style={styles.label}> 
                  Fan 1
                  </Text>
                  <Text style={styles.label}>
                  Fan 2
                  </Text>
                </View>

                <View style={styles.ROne}>
                  <Icon
                      disabled = {loader ? true : false}
                      reverse = {isEnabled7 ? true : false}
                      raised
                      name='lightbulb-outline'
                      type='material-community'
                      color='#beb07b'
                      size={35}
                      onPress={()=>{
                        toggleSwitch7();
                        switchState("Light-1",isEnabled7,"Board2");
                      }}  
                    />
                  <Icon
                      disabled = {loader ? true : false}
                      reverse = {isEnabled8 ? true : false}
                      raised
                      name='lightbulb-outline'
                      type='material-community'
                      color='#beb07b'
                      size={35}
                      onPress={()=>{
                        toggleSwitch8();
                        switchState("Light-2",isEnabled8,"Board2");
                      }} 
                    />
                </View>
                <View style={styles.ROne}>
                  <Text style={styles.label}>
                    
                    Light 1
                  </Text>
                  <Text style={styles.label}>
                  
                  Light 2
                </Text>
                </View>
            </View>
            
            <View style={styles.Section}>
              <Text style={styles.Seclabel}> Board 3</Text>
                <View style={styles.ROne}>
                  
                  <Icon
                      disabled = {loader ? true : false}
                      reverse = {isEnabled9 ? true : false}
                      raised
                      name='fan'
                      type='material-community'
                      color='#beb07b'
                      size={35}
                      onPress={()=>{
                        toggleSwitch9();
                        switchState("Fan-1",isEnabled9,"Board3");
                      }} 
                    />  
                  <Icon
                      disabled = {loader ? true : false}
                      reverse = {isEnabled10 ? true : false}
                      raised
                      name='fan'
                      type='material-community'
                      color='#beb07b'
                      size={35}
                      onPress={()=>{
                        toggleSwitch10();
                        switchState("Fan-2",isEnabled10,"Board3");
                      }}  
                    />
                </View>
                <View style={styles.ROne}>
                  <Text style={styles.label}> 
                  Fan 1
                  </Text>
                  <Text style={styles.label}>
                  Fan 2
                  </Text>
                </View>

                <View style={styles.ROne}>
                  <Icon
                      disabled = {loader ? true : false}
                      reverse = {isEnabled11 ? true : false}
                      raised
                      name='lightbulb-outline'
                      type='material-community'
                      color='#beb07b'
                      size={35}
                      onPress={()=>{
                        toggleSwitch11();
                        switchState("Light-1",isEnabled11,"Board3");
                      }}
                      
                    />    
                  <Icon
                      disabled = {loader ? true : false}
                      reverse = {isEnabled12 ? true : false}
                      raised
                      name='lightbulb-outline'
                      type='material-community'
                      color='#beb07b'
                      size={35}
                      onPress={()=>{
                        toggleSwitch12();
                        switchState("Light-2",isEnabled12,"Board3");
                      }}
                      
                    />
                </View>
                <View style={styles.ROne}>
                  <Text style={styles.label}>
                    
                    Light 1
                  </Text>
                  <Text style={styles.label}>
                  
                  Light 2
                </Text>
                </View>
            </View>
          
            { loader ? 
             (
             <View style={styles.loader}>
              <ActivityIndicator size='large' color="#193b5b" />
            </View> 
            ) : null
            }
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignContent: 'center',
    marginBottom: 10,
  },
  Section:{
    backgroundColor:'#9cc7f0',
    marginTop:10,
    marginHorizontal:10,
    padding:10,
    paddingBottom:25,
    borderRadius:20,
  },
  ROne: {
    flexDirection: 'row',
    marginVertical: 2,
    marginHorizontal:30,
    justifyContent:"space-around"
  },
  label: {
    alignSelf:'center',
    fontSize: 20,
    fontWeight:'bold',
    color: '#193b5b'
  },
  Seclabel: {
   marginBottom:15,
    fontSize: 30,
    fontWeight:'bold',
    color: '#193b5b',
    alignSelf:'center',
    letterSpacing:3
  },
  loader: {
    position:'absolute',
    alignSelf: 'center',
    marginTop: hp('50%'),
    transform: [{ scale: 2 }],
    backgroundColor: 'rgba(25, 59, 91, 0.6)',
    borderRadius: 10
  },
});

export default App;
