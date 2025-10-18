import { ComponentBase } from "../types/component-base.type";

export type CommentProps= Omit <ComponentBase ,'isDisabled' |'size'>&Comment; 