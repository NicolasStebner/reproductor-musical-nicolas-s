import axios from "axios"
import { Album } from "../domain/album"
import { Artist } from "../domain/artist"
import { AlbumFromJSONType, ArtistFromJSONType, TrackItemFromJSONType } from "../types/domain"
import { TrackItem } from "../domain/trackItem"
import { TopTrackItem } from "../domain/topTrackItem"
import { playbackType } from "../types/player"
import { API_URL } from './configuration';

class Service{

  async getUserData(access_token:string): Promise<any>{
    const rta = await axios.get<any>(`${API_URL}/me/`,{
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    }
    )
    return rta.data
  }

  async getAlbum(id: string, access_token:string): Promise<Album>{
    const rta = await axios.get<any>(`${API_URL}/albums/` + id,{
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    }
    )
    return Album.initialize(rta.data)
  }

  async getAlbumTracks(id: string, access_token:string): Promise<TrackItem[]>{
    const rta = await axios.get<any>(`${API_URL}/albums/` + id + "/tracks",{
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    }
    )
    //@ts-ignore
    return rta.data.items.map((t)=>TrackItem.initialize([],t))
  }

  async getArtist(id: string, access_token:string): Promise<Artist>{
    const rta = await axios.get<any>(`${API_URL}/artists/` + id,{
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    }
    )
    return Artist.initialize(rta.data)
  }

  async getAlbumOfAnArtist(id: string, access_token:string): Promise<Album[]>{
    const rta = await axios.get<any>(`${API_URL}/artists/` + id + "/albums",{
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    }
    )
    return rta.data.items.map((a:AlbumFromJSONType)=>Album.initialize(a))
  }

  async getTopTracksOfAnArtist(id: string, access_token:string): Promise<TopTrackItem[]>{
    const rta = await axios.get<any>(`${API_URL}/artists/` + id + "/top-tracks",{
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    }
    )
    return rta.data.tracks.map((t:TrackItemFromJSONType)=>TopTrackItem.initialize(t))
  }

  async getRelatedArtists(id: string, access_token:string): Promise<Artist[]>{
    const rta = await axios.get<any>(`${API_URL}/artists/` + id + "/related-artists",{
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    }
    )
    return rta.data.artists.map((t:ArtistFromJSONType)=>Artist.initialize(t))
  }

  async checkIfUser5FollowArtist(id: string, access_token:string): Promise<boolean[]>{
    const rta = await axios.get<any>(`${API_URL}/me/following/contains?type=artist&ids=${id}`,{
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    }
    )
    return rta.data
  }

  async followArtist(id:string,access_token:string):Promise<any>{
    const rta = await axios.put<any>(`${API_URL}/me/following?type=artist&ids=${id}`,{
      "ids": [
        "string"
      ]}
    ,{
      headers:{
        'Authorization': 'Bearer ' + access_token
      }
    }
    )
    return rta.data
  }
  async unfollowArtist(id:string,access_token:string):Promise<any>{
    const rta = await axios.delete<any>(`${API_URL}/me/following?type=artist&ids=${id}`,{
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
      //@ts-ignore
      "ids": [
        "string"
      ]
    }
    )
    return rta.data
  }

  async getArtistSideBar(access_token:string): Promise<Artist[]>{
    const rta = await axios.get<any>(`${API_URL}/me/following?type=artist`,{
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    }
    )
    //@ts-ignore
    return rta.data.artists.items.map((art)=>Artist.initialize(art))
  }

  async searchByType(query:string, type:"album" | "artist" | "track", access_token:string){
    const rta = await axios.get<any>(`${API_URL}/search?q=${query}&type=${type}`,{
      headers:{
        'Authorization': 'Bearer ' + access_token
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

  async getPlaybackState(access_token:string):Promise<playbackType>{
    const rta = await axios.get<any>(`${API_URL}/me/player`,{
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    }
    )
    return rta.data
  }
  
  async modifyVolume(volume:number, deviceId:string, access_token:string):Promise<void>{
    await axios({
      method:"put",
      url:`${API_URL}/me/player/volume`,
      params:{
        volume_percent:volume,
        device_id:deviceId
      },
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    })
  }

  async previousSong(deviceId:string, access_token:string){
    await axios({
      method:"post",
      url:`${API_URL}/me/player/previous`,
      params:{
        device_id:deviceId
      },
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    })
  }
  async play(deviceId:string, access_token:string){
    await axios({
      method:"put",
      url:`${API_URL}/me/player/play`,
      params:{
        device_id:deviceId
      },
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    })
  }
  async pause(deviceId:string, access_token:string){
    await axios({
      method:"put",
      url:`${API_URL}/me/player/pause`,
      params:{
        device_id:deviceId
      },
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    })
  }

  async nextSong(deviceId:string, access_token:string){
    await axios({
      method:"post",
      url: `${API_URL}/me/player/next`,
      params:{
        device_id:deviceId
      },
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    })
  }

  async shuffleChange(newState:boolean,access_token:string){
    await axios({
      method:"put",
      url:`${API_URL}/me/player/shuffle?state=${newState}`,
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    })
  }

  async repeatModeChange(newState:string,access_token:string){
    await axios({
      method:"put",
      url:`${API_URL}/me/player/repeat?state=${newState}`,
      headers:{
        'Authorization': 'Bearer ' + access_token
      },
    })
  }
}

export const serviceSpotify = new Service()
