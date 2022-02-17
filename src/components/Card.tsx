import React, {FC} from "react";
import { useState } from "react";


export enum CardVariant{
    outlined = "outlined",
    primary = "primary"
}

interface CardProps{
    width: string,
    height?: string,
    variant: CardVariant,
    onClick?: (num: number) => void
}

const Card:FC<CardProps> = ({width, height, variant})=>{

    return (<div style={{
        width, 
        height, 
        border: variant === CardVariant.outlined? '2px solid grey' : 'none',
        background: variant=== CardVariant.primary? 'blue':'node' }}>
        </div>)
}


export default Card;