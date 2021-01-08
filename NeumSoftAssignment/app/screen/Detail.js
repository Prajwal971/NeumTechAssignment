import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const Detail = ({route, navigation}) => {
  const {series, char, img, gameSrs,name} = route.params;
  return (
    <>
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: img,
            }}
          />
        </View>
        <Text style={styles.textContainer}>Amiibo Series : {series}</Text>
        <Text style={styles.textContainer}>Character: {char}</Text>
        <Text style={styles.textContainer}>Game Series: {gameSrs}</Text>
        <Text style={styles.textContainer}>Name: {name}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    padding: 50,
    alignItems:'center',
  },
  tinyLogo: {
    width: 250,
    height: 250,
    resizeMode: 'stretch',
  },
  textContainer: {
    fontSize:20
  },
});
export default Detail;
