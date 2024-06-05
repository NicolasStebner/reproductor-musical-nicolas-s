import { ImageJSON } from "../types/domain";

export class Image{
  constructor(
    public height: number,
    public width: number,
    public url: string
  ) { }

  static initialize(imageJSON: ImageJSON){
    return Object.assign(
      new Image(
        imageJSON.height,
        imageJSON.width,
        imageJSON.url,
      )
    )
  }
}