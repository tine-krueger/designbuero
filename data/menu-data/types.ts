import { INavItem } from "../../components/navigation/navigation";

export interface IGlobalMenuState {
    [key: string]: INavItem[]
}

export type MenuContextType = {
    globalMenuState: IGlobalMenuState
}