import { Dispatch, SetStateAction } from "react";
import {TNavProps } from "../../components/navigation/navigation";

export interface IGlobalMenuState {
    [key: string]: TNavProps[]
}

export type MenuContextType = {
    globalMenuState: IGlobalMenuState
    lightbox: {
        isOpen: boolean,
        setLightbox: Dispatch<SetStateAction<boolean>>
    }
}