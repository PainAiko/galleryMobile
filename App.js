import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions,SafeAreaView,SafeAreaViewBase,Easing,TouchableOpacity } from 'react-native';
import {API_KEY,API_URL} from './src/components/constant';

const {width,heigth} = Dimensions.get('screen');

const fetchImagesFromPexels = async () => {
    const data = await fetch(API_URL,{
      headers: {
        'Authorization': API_KEY
      }
    });
    const {photos} = await data.json();
    return photos;
}




export default function App() {
  const [images, setImages] = useState(null)
  useEffect(() => {
    const fetchImages = async () => {
        const images = await fetchImagesFromPexels()
        setImages(images);
        //console.log(images);
    }
    fetchImages();
  },[])
 console.log(images);
 if (!images) {
      return(  <View style={styles.container}>
        <Text>Loading...</Text>
      </View>) 
  }
  return (              
    <View style={styles.container}>
       <Text>{API_KEY}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
