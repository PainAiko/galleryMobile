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
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    const fetchImages = async () => {
        const images = await fetchImagesFromPexels()
        setImages(images);
    }
    fetchImages();
  },[])
console.log(width);
 
 const topRef = useRef();
 const thumbRef = useRef();
 const scrollToActiveIndex = (index) => {
   // console.log(index);
   // console.log(topRef.current);
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true
    })

    if(index *(IMAGE_SIZE+ SPACING) - IMAGE_SIZE/2 > width/2 ){
      thumbRef.current.scrollToOffset({
        offset: index *(IMAGE_SIZE+ SPACING) - width/2 +IMAGE_SIZE/2,
        animated:true
      })
    }
    else {
      thumbRef.current.scrollToOffset({
        offset: 0,
        animated:true
      })
    }

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
            onMomentumScrollEnd={(event) =>{//onMomentumScrollEnd appele lorsque le defilement est terminer
                console.log(event.nativeEvent.contentOffset.x);
                scrollToActiveIndex(Math.floor(event.nativeEvent.contentOffset.x/ width))
            }}
            renderItem={({item})=>{
              //console.log(StyleSheet.absoluteFillObject);
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
            renderItem={({item,index})=>{
              return (
                <TouchableOpacity 
                     onPress={() => scrollToActiveIndex(index)}
                >
                    <Image
                          style={{
                            width:IMAGE_SIZE,
                            height: IMAGE_SIZE, 
                            borderRadius: 12,
                            marginRight: SPACING,
                            borderWidth: 1,
                            borderColor: activeIndex === index ? '#fff' : 'transparent'
                          }}
                        source={{uri: item.src.portrait}}
                    />
                </TouchableOpacity>
              )
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
