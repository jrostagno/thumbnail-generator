import { LegacyRef, MutableRefObject, ReactNode } from "react";

export interface Layout {
  children: ReactNode;
  session: any;
}

export interface NavBar {
  session: any;
}
export interface LabelError {
  children: ReactNode;
}

export interface UploadImage {
  avatarRef: LegacyRef<HTMLImageElement> | undefined;
  setImages: (values: DataImage[]) => void;
  setIsLoading: (value: boolean) => void;
  setShowButton: (value: boolean) => void;
  setPhotoURL: (value: string) => void;
  photoURL: string;
}

export type DataImage = {
  width: number;
  height: number;
  filter: string;
  ref: string;
};

export type CropProps = { x: number; y: number };

export interface ButtonPrimary {
  children: React.ReactNode;
  onClick: () => void;
}

export interface ActionButton {
  avatarRef: MutableRefObject<any>;
  image: DataImage;
}
