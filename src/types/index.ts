import { Artist } from "../domain/artist";

//card artist
export type CardCompType ={
  avatar:AvatarType,
  title:string,
  subtitle:string
}
//card album
export type CardAlbumType = {
  image: string
  title: string
  description: string
};


//texts
export type textChild = {
  text: string
  backgroundColor?: string
  textColor?:string
  startIcon?: any
}

export type textWithLink = {
  link:string,
  text:string
}

//avatar
export type AvatarType ={
  alt:string,
  src:string,
  text?: string,
  backgroundColor?: string
  backgroundColorHover?: string
}

//Top Artist
export type TopArtistType = {
  artist: Artist
  onClicked: (id:string)=>void
};