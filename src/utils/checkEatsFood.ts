import { Coordinate } from "../constants/types";

export const CheckEatsFood = (
    head:Coordinate,
    food:Coordinate,
    area:number,
) =>{
    const distanceBetweenFoodAndSnakeX : number = Math.abs(head.x- food.x)
    const distanceBetweenFoodAndSnakeY : number = Math.abs(head.y- food.y)
    return (
        distanceBetweenFoodAndSnakeX <area && distanceBetweenFoodAndSnakeY <area
    )
}