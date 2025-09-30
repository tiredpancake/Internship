import { Variant } from "./variant.type";
import { Size } from "./size.type";

export type ComponentBase={
    isDisabled?:boolean;
    className?:string;
    variant?:Variant;
    size?:Size;
}