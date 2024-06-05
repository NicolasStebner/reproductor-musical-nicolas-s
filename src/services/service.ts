import axios from "axios"
import { Album } from "../domain/album"
import { Artist } from "../domain/artist"
import { AlbumFromJSONType, ArtistFromJSONType, TrackItemFromJSONType } from "../types/domain"
import { TrackItem } from "../domain/trackItem"
import { TopTrackItem } from "../domain/topTrackItem"
import { playbackType } from "../types/player"

class Service {
  async getAlbum(id: string): Promise<Album>{
    const rta = await axios.get<any>('https://api.spotify.com/v1/albums/' + id,{
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    }
    )
    return Album.initialize(rta.data)
  }

  async getAlbumTracks(id: string): Promise<TrackItem[]>{
    const rta = await axios.get<any>('https://api.spotify.com/v1/albums/' + id + "/tracks",{
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    }
    )
    //@ts-ignore
    return rta.data.items.map((t)=>TrackItem.initialize([],t))
  }

  async getArtist(id: string): Promise<Artist>{
    const rta = await axios.get<any>('https://api.spotify.com/v1/artists/' + id,{
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    }
    )
    return Artist.initialize(rta.data)
  }

  async getAlbumOfAnArtist(id: string): Promise<Album[]>{
    const rta = await axios.get<any>('https://api.spotify.com/v1/artists/' + id + "/albums",{
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    }
    )
    return rta.data.items.map((a:AlbumFromJSONType)=>Album.initialize(a))
  }

  async getTopTracksOfAnArtist(id: string): Promise<TopTrackItem[]>{
    const rta = await axios.get<any>('https://api.spotify.com/v1/artists/' + id + "/top-tracks",{
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    }
    )
    return rta.data.tracks.map((t:TrackItemFromJSONType)=>TopTrackItem.initialize(t))
  }

  async getRelatedArtists(id: string): Promise<Artist[]>{
    const rta = await axios.get<any>('https://api.spotify.com/v1/artists/' + id + "/related-artists",{
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    }
    )
    return rta.data.artists.map((t:ArtistFromJSONType)=>Artist.initialize(t))
  }

  async getArtistSideBar(): Promise<Artist[]>{
    const rta = await axios.get<any>('https://api.spotify.com/v1/me/following?type=artist',{
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    }
    )
    //@ts-ignore
    return rta.data.artists.items.map((art)=>Artist.initialize(art))
  }

  async searchByType(query:string, type:"album" | "artist" | "track"){
    const rta = await axios.get<any>(`https://api.spotify.com/v1/search?q=${query}&type=${type}`,{
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    }
    )
    if(type=="album"){
      //@ts-ignore
      return rta.data.albums.items.map((alb)=>Album.initialize(alb))
    }
    if(type=="artist"){
      //@ts-ignore
      return rta.data.artists.items.map((art)=>Artist.initialize(art))
    }
    if(type=="track"){
      //@ts-ignore
      return rta.data.tracks.items.map((tr)=>TrackItem.initialize([],tr))
    }
  }

  async getPlaybackState():Promise<playbackType>{
    const rta = await axios.get<any>(`https://api.spotify.com/v1/me/player`,{
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    }
    )
    return rta.data
  }
  
  async modifyVolume(volume:number, deviceId:string):Promise<void>{
    await axios({
      method:"put",
      url:"https://api.spotify.com/v1/me/player/volume",
      params:{
        volume_percent:volume,
        device_id:deviceId
      },
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    })
  }

  async previousSong(deviceId:string){
    await axios({
      method:"post",
      url:"https://api.spotify.com/v1/me/player/previous",
      params:{
        device_id:deviceId
      },
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    })
  }
  async play(deviceId:string){
    await axios({
      method:"put",
      url:"https://api.spotify.com/v1/me/player/play",
      params:{
        device_id:deviceId
      },
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    })
  }
  async pause(deviceId:string){
    await axios({
      method:"put",
      url:"https://api.spotify.com/v1/me/player/pause",
      params:{
        device_id:deviceId
      },
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    })
  }

  async nextSong(deviceId:string){
    await axios({
      method:"post",
      url:"https://api.spotify.com/v1/me/player/next",
      params:{
        device_id:deviceId
      },
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    })
  }
}

export const serviceSpotify = new Service()
