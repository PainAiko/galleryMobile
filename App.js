import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useRef, useState} from 'react';
import { StyleSheet, Text, View, Dimensions,SafeAreaView,SafeAreaViewBase,Easing,TouchableOpacity, FlatList,Image } from 'react-native';
import {API_KEY,API_URL} from './src/components/constant';

const {width,height} = Dimensions.get('screen');
const IMAGE_SIZE = 80;
const SPACING = 10;
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
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const fetchImages = async () => {
        const images = await fetchImagesFromPexels()
        setImages(images);
    }
    fetchImages();
  },[])
 const topRef = useRef();
 const thumbRef = useRef();
 const setActiveIndex = (index) => {
    setIndex(index);
 }
 if (!images) {
      return(  <View style={styles.container}>
        <Text>Loading...</Text>
      </View>) 
  }
  return (              
    <View style={styles.container}>
        <FlatList
            ref={topRef}
            data={images}
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            onMomentumScrollEnd={(event) =>{
                setActiveIndex(Math.floor(event.nativeEvent.contentOffset.x/ width))
            }}
            renderItem={({item})=>{
              return <View style={{width,height}}>
                 <Image
                  source={{uri: item.src.portrait}}
                  style={[StyleSheet.absoluteFillObject]}
              />
              </View>
            }}
        />
         <FlatList
            ref={thumbRef}
            data={images}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{position: 'absolute',bottom: IMAGE_SIZE}}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingHorizontal: SPACING}}
            renderItem={({item})=>{
              return <Image
                        style={{
                          width:IMAGE_SIZE,
                          height: IMAGE_SIZE, 
                          borderRadius: 12,
                          marginRight: SPACING
                        }}
                       source={{uri: item.src.portrait}}
              />
            }}
        />
        <StatusBar backgroundColor='green'/>
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
