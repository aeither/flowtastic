export type ImageType =
  | 'capture_Hero_Black'
  | 'capture_Front_Black'
  | 'capture_Legal_Black'
  | 'capture_Details_Black'

export type VideoType =
  | 'capture_Animated_Video_Popout_Black'
  | 'capture_Animated_Video_Idle_Black'

export type Language = 'default' | 'es'

export interface EditionData {
  id: string
  seriesID: string
  setID: string
  playID: string
  maxMintSize: string
  tier: Tier
  numMinted: string
}

export enum Tier {
  Common = 'COMMON',
  Rare = 'RARE',
  Uncommon = 'UNCOMMON',
}

export interface NFTMetadataMedias {
  items: Item[]
}

export interface Item {
  file: File
  mediaType: MediaType
}

export interface File {
  url: string
}

export enum MediaType {
  ImagePNG = 'image/png',
  VideoMp4 = 'video/mp4',
}

export interface NFTMetadataDisplay {
  name: string
  description: string
  thumbnail: Thumbnail
}

export interface Thumbnail {
  url: string
}

export interface SetData {
  id: string
  name: string
  locked: boolean
  setPlaysInEditions: { [key: number]: boolean }
}

export interface SeriesData {
  id: string
  name: string
  active: boolean
}

export interface PlayData {
  id: string
  classification: string
  metadata: Metadata
}

export interface Metadata {
  PlayDataID: string
  PlayTime: string
  PlayerJerseyName: string
  MatchDate: string
  PlayerFirstName: string
  MatchHomeTeam: string
  PlayType: string
  PlayerCountry: string
  MatchAwayTeam: string
  MatchHomeScore: string
  MatchHighlightedTeam: string
  PlayHalf: string
  PlayerKnownName: string
  PlayerDataID: string
  MatchAwayScore: string
  MatchDay: string
  PlayerPosition: string
  MatchSeason: string
  PlayerNumber: string
  PlayerLastName: string
}

export interface CurrentUser {
  f_type: string
  f_vsn: string
  addr: string
  cid: string
  loggedIn: boolean
  services: Service[]
}

export interface Service {
  f_type: string
  f_vsn: string
  type: string
  uid: string
  network: string
  endpoint: string
  id?: string
  identity?: Data
  provider?: Provider
  method?: string
  data?: Data
}

export interface Data {
  address: string
  keyId?: number
}

export interface Provider {
  f_type: string
  f_vsn: string
  address: string
  name: string
  icon: string
  description: string
}
