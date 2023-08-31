import { Coordinate } from "../constants/types";
export const randomFoodCoordinate =(maxX:number,maxY:number):Coordinate =>{
    return {

        x:Math.floor(Math.random()*maxX),
        y:Math.floor(Math.random()*maxY)
    }
    
}