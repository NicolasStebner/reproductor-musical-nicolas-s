import { Artist } from "../domain/artist"
import { Image } from "../domain/image"

//Album
export type AlbumFromJSONType = {
  id: string
  album_type: string
  name: string
  artists: Artist[]
  popularity: number
  images: Image[]
  label: string
  genres: string[]
  tracks: TrackItemFromJSONType[]
  release_date: string
  release_date_precision: string
  copyrights: copyrightType[]
}

//Artist
export type ArtistFromJSONType = {
  id: string
  name: string
  type: string
  images: Image[]
  genres: string[]
}

//Image
export type ImageJSON = {
  height: number
  width: number
  url: string
}

//Track
export type TrackFromJSONType = {
  href: string
  items: TrackItemFromJSONType[]
}
//Item track : Track -> Items
export type TrackItemFromJSONType = {
  id: string
  name: string
  artists: ArtistFromJSONType[]
  album: AlbumFromJSONType
  duration_ms: number
  explicit: boolean
  href: string
  type: string
  track_number: number
}
//Copyright
export type copyrightType = {
  text: string
  type: string
}