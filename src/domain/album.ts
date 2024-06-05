import { AlbumFromJSONType } from "../types/domain"
import { Artist } from "./artist"
import { Copyright } from "./copyright"
import { Image } from "./image"
import { TrackItem } from "./trackItem"
export class Album {
  constructor(
    public id: string,
    public album_type: string,
    public name: string,
    public artists: Artist[],
    public popularity: number,
    public images: Image[],
    public label: string,
    public genres: string[],
    public tracks: TrackItem[],
    public release_date: Date,
    public release_date_precision: string,
    public copyrights: Copyright[]
  ) {}
  
  static initialize(albumJSON: AlbumFromJSONType){
    return Object.assign(
      new Album(
        albumJSON.id,
        albumJSON.album_type,
        albumJSON.name,
        albumJSON.artists?.map((art)=>Artist.initialize(art)),
        albumJSON.popularity,
        albumJSON.images.map((i)=>Image.initialize(i)),
        albumJSON.label,
        albumJSON.genres,
        //@ts-ignore
        albumJSON.tracks?.items?.map((t)=>TrackItem.initialize(albumJSON.images,t)),
        new Date(albumJSON.release_date),
        albumJSON.release_date_precision,
        //@ts-ignore
        albumJSON.copyrights?.map((c)=>Copyright.initialize(c))
      )
    )
  }
  
  getReleaseYear(){
    return this.release_date.getUTCFullYear()
  }

  getMonthDayAndYear(){
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const day = this.release_date.getDate();
    const month = months[this.release_date.getMonth()];
    const year = this.release_date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  getSongsCount(): number{
    return this.tracks.length
  }

  getDurationWithMinutesAndSeconds(): string{
    const millisecondsArray = this.tracks.map((t)=>{return t.duration_ms})
    const totalMilliseconds = millisecondsArray.reduce((acc, curr) => acc + curr, 0);
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} min ${seconds} sec`;
  }
}