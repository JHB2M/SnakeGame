import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Coordinate } from '../../constants/types';


const Food = ({x,y}:Coordinate) => {
  return <Text style ={[{top:y*10,left:x*10},styles.food]}>🍎</Text>
};

export default Food;

const styles = StyleSheet.create({
  food:{
    width:30,
    height:30,
    borderRadius:10,
    position:'absolute',
  }
});
