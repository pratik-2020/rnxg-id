import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button,Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

function QrcodeScanner() {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [res, setRes] = useState(true);
    const [name, setName] = useState(null);
    const [img, setImg] = useState(null);
    const [text, setText] = useState("Not scanned yet!!");

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted')
        })()
    }

    useEffect(() => {
        askForCameraPermission()
    }, [name,img]);
    const handleScan= () =>{
        setScanned(false)
        setRes(true)
        setName(null)
        setText("PLease Scan")
        setImg(null)
    }
    const handleBarCodeScanned = ({ type, data }) => {
        console.log(data)
        axios.post('https://rnxgid-server.herokuapp.com/check', {
            reg_num: data.toLowerCase(),
          })
          .then(function (response) {
           if(response.data==="User not found"){ console.log(response);
            setName("User not from RNXG")
            setText("No permissions Granted")
            setImg("http://mommasaid.net/wp-content/uploads/2013/06/no-stamp.jpg")
            console.log(name,img)}
            else{
           // console.log(response);
            setName(response.data[0].name)
            setImg(response.data[0].url)
            console.log(name,img)}
          })
          .catch(function (error) {
            console.log(error);
          });
        setScanned(true);
        setRes(false)
        setText(data);
    }

    if(hasPermission === null){
        return(
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }

    if(hasPermission === false){
        return(
            <View>
                <Text style={{margin: 10}}>No access to camera</Text>
                <Button title='Allow Camera' onPress={() => askForCameraPermission()} />
            </View>)
    }
  return (
      <View style={styles.container}>
          <View style={styles.barcodebox}>
          {!res && (img!==null || img !== undefined )?<Image
        style={styles.tinyLogo}
        source={{
          uri: `${img}`,
        }}
      />:null}
    
          { res &&  <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400}} />}
          </View>
          {name!==null||name!= undefined ?<Text style={styles.maintext}>{name}</Text>:null}
          {name!==null||name!= undefined ?<Text style={styles.maintext}>{text}</Text>:null}
          
          { scanned && <Button title='Scan again' style={styles.btn} onPress={handleScan} color='tomato' />}
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        borderRadius:20,
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
        marginBottom:"8%"
    }, 
    tinyLogo: {
        width: "100%",
        height: "100%",
        marginBottom: "0%",
        marginTop:"0%"
      },
    maintext: {
        fontSize: 24,
        margin: 10,
        textAlign:'center',
        marginBottom:"8%"
    }
})

export default QrcodeScanner