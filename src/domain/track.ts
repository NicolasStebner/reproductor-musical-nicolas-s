import { TrackFromJSONType } from '../types/domain';
import { TrackItem } from './trackItem';

export class Track{
  constructor(
    public href: string,
    public items: TrackItem[]
  ) { }

  static initialize(trackJSON: TrackFromJSONType){
    return Object.assign(
      new Track(
        trackJSON.href,
        trackJSON.items.map((i)=>TrackItem.initialize([],i))
      )
    )
  }
}