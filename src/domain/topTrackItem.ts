import { TrackItemFromJSONType } from "../types/domain";
import { msToMinutesWithSeconds } from "../util/milisegundosAMinutosConSegundos";
import { Album } from "./album";
import { Artist } from "./artist";

export class TopTrackItem{
  constructor(
    public id: string,
    public name: string,
    public artists: Artist[],
    public album: Album,
    public duration_ms: number,
    public explicit: boolean,
    public href: string,
    public type: string,
    public track_number: number
  ) {}

  static initialize(trackItemJSON: TrackItemFromJSONType){
    return Object.assign(
      new TopTrackItem(
        trackItemJSON.id,
        trackItemJSON.name,
        trackItemJSON.artists?.map((art)=>Artist.initialize(art)),
        Album.initialize(trackItemJSON.album),
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