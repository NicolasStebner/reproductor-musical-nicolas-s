import { ArtistFromJSONType } from "../types/domain";
import { Image } from "./image";

export class Artist{
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public images: Image[],
    public genres: string[]
  ){}
  
  static initialize(albumJSON: ArtistFromJSONType){
    return Object.assign(
      new Artist(
        albumJSON.id,
        albumJSON.name,
        albumJSON.type,
        albumJSON.images?.map((i)=>Image.initialize(i)),
        albumJSON.genres
      )
    )
  }
}