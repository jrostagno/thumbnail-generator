import { LegacyRef, MutableRefObject, ReactNode } from "react";

export interface Layout {
  children: ReactNode;
  session: any;
}

export interface NavBar {
  session: any;
}

export interface UploadImage {
  handleOnChange: (event: React.FormEvent<HTMLInputElement>) => void;
  avatarRef: LegacyRef<HTMLImageElement> | undefined;
  preview: any;
}

export type DataImage = {
  width: number;
  height: number;
  filter: string;
  ref: string;
};

export interface ButtonPrimary {
  children: React.ReactNode;
  onClick: () => void;
}

export interface ActionButton {
  avatarRef: MutableRefObject<any>;
  image: DataImage;
}
