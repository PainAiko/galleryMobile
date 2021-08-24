import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {API_KEY,API_URL} from './src/components/constant';

const {width,heigth} = Dimensions.get('screen');
const fetchImagesFromPexels = async () => {
    const data = await fetch(API_URL,{
      headers: {
        'Authorization': API_KEY
      }
    });
    const result = await data.json();
    return result;
}




export default function App() {
  useEffect(() => {
    const fetchImages = async () => {
        const images = await fetchImagesFromPexels()
        console.log(images);
    }
    fetchImages();
  },[])
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
