import { ButtonHTMLAttributes } from "react";
import { ComponentBase } from "../types/component-base.type";
import { BlobOptions } from "buffer";
import { LoadingBehavior } from "../types/loading-behavior.types";

export type ButtonProps=ButtonHTMLAttributes<HTMLButtonElement>& ComponentBase & LoadingBehavior &
{
    isOutline?:boolean;
    isLink?:boolean;
    animatedIcoon?:boolean;
    shape?:ButtonShape;

}
export type ButtonShape ="default" |"wide " | "full" | "square";

