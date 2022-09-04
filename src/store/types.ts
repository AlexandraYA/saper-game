import { ReactElement } from "react"

export interface ILayout {
  children: ReactElement;
}

export type TSettings = {
  rows: number;
  cols: number;
  mines: number;
}

export type TLevels = {
  junior: TSettings;
  amateur: TSettings;
  profi: TSettings;
}

export type TFieldKey = keyof TLevels

export type TCell = {
  mark: string | null;
  indicator: number;
  ifOpen: boolean;
}