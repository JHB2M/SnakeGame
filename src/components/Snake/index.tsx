import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Coordinate } from '../../constants/types';
import { Colors } from '../../constants/colors';

interface ISnake {
    snake:Coordinate[]
}

const Snake = ({snake}:ISnake) => {
  return (
    <>
    {snake.map((segment:Coordinate,index:number)=>{
        const segmentStyle  ={
            left:segment.x*10,
            top:segment.y*10,
        }
        return  <View key={index} style ={[styles.snake,segmentStyle]}/>
    })}
    </>
  );
};

export default Snake;

const styles = StyleSheet.create({
    snake:{
        width:15,
        height:15,
        position:'absolute',
        backgroundColor:Colors.primary,
        borderRadius:8,
    }
});
