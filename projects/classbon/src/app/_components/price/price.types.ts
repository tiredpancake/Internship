import { ComponentBase } from "../types/component-base.type";

export type PriceProps=Omit<ComponentBase, 'isDisabled' |'varient'>&{

    price?:number;
    text?:string


}