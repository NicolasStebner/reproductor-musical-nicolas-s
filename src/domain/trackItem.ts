import { TrackItemFromJSONType } from "../types/domain";
import { msToMinutesWithSeconds } from "../util/milisegundosAMinutosConSegundos";
import { Artist } from "./artist";
import { Image } from "./image";

export class TrackItem{
  constructor(
    public id: string,
    public name: string,
    public artists: Artist[],
    public images: Image[],
    public duration_ms: number,
    public explicit: boolean,
    public href: string,
    public type: string,
    public track_number: number
  ) {}

  static initialize(albumImages: Image[], trackItemJSON: TrackItemFromJSONType){
    return Object.assign(
      new TrackItem(
        trackItemJSON.id,
        trackItemJSON.name,
        trackItemJSON.artists?.map((art)=>Artist.initialize(art)),
        albumImages,
        trackItemJSON.duration_ms,
        trackItemJSON.explicit,
        trackItemJSON.href,
        trackItemJSON.type,
        trackItemJSON.track_number,
      )
    )
  }
  getDuration(){
    return msToMinutesWithSeconds(this.duration_ms);
  }
}