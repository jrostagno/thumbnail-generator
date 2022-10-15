import { FormEvent, LegacyRef, ReactNode } from "react";

export interface Layout {
  children: ReactNode;
  session: any;
}

export interface NavBar {
  session: any;
}

export interface UploadImage {
  handleOnChange: (event: FormEvent<HTMLFormElement>) => void;
  avatarRef: LegacyRef<HTMLImageElement> | undefined;
  preview: any;
}

export type DataImages = {
  width: number;
  height: number;
  filter: string;
  ref: string;
}[];
