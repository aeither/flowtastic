import { ImageType, VideoType } from '../types'

export const getPlayImage = (playDataID: string, imageType: ImageType) => {
  const playImage = 'https://assets.laligagolazos.com/editions/'
    .concat(playDataID)
    .concat('/play_')
    .concat(playDataID)
    .concat('__')
    .concat(imageType)
    .concat('_2880_2880_')
    .concat('default')
    .concat('.png')
  return playImage
}

export const getPlayVideo = (playDataID: string, videoType: VideoType) => {
  const playVideo = 'https://assets.laligagolazos.com/editions/'
    .concat(playDataID)
    .concat('/play_')
    .concat(playDataID)
    .concat('__')
    .concat(videoType)
    .concat('_1080_1080_')
    .concat('default')
    .concat('.mp4')
  return playVideo
}
