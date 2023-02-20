import {
  type NFTMetadataDisplay,
  type NFTMetadataMedias,
  type PlayData,
  type SetData,
} from '@/libs/types'
import {
  createClient,
  FlowProvider,
  networks,
  useScript,
  useAccount,
} from '@flowity/react'
import { type FC } from 'react'
import { useStore } from '../store'

export function useFlow() {
  const targetAddress = useStore((state) => state.targetAddress)
  const momentNFT = useStore((state) => state.momentNFT)
  const playId = useStore((state) => state.playId)
  const golazosSetName = useStore((state) => state.golazosSetName)

  /**
   * /////////////////////////////////////////////////////////////////////
   * /////////////////////////////////////////////////////////////////////
   */
  const CADENCE_SCRIPT_NFTMetadataMedias = `
    import Golazos from 0xGOLAZOSADDRESS
    import MetadataViews from 0xMETADATAVIEWSADDRESS
    
    pub fun main(address: Address, id: UInt64): MetadataViews.Medias {
        let account = getAccount(address)
    
        let collectionRef = account.getCapability(Golazos.CollectionPublicPath)
                .borrow<&{Golazos.MomentNFTCollectionPublic}>()
                ?? panic("Could not borrow capability from public collection")
    
        let nft = collectionRef.borrowMomentNFT(id: id)
                ?? panic("Couldn't borrow momentNFT")
    
        return nft.resolveView(Type<MetadataViews.Medias>())! as! MetadataViews.Medias
    }
    `
  const medias = useScript<NFTMetadataMedias>({
    cadence: CADENCE_SCRIPT_NFTMetadataMedias,
    args: (arg, t) => [arg(targetAddress, t.Address), arg(momentNFT, t.UInt64)],
    options: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  })
  /**
   * /////////////////////////////////////////////////////////////////////
   * /////////////////////////////////////////////////////////////////////
   */
  const CADENCE_SCRIPT_PROPERTIES = `
  import NonFungibleToken from 0xNONFUNGIBLETOKENADDRESS
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(address: Address, id: UInt64): [AnyStruct] {
      let account = getAccount(address)

      let collectionRef = account.getCapability(Golazos.CollectionPublicPath)
          .borrow<&{Golazos.MomentNFTCollectionPublic}>()
          ?? panic("Could not borrow capability from public collection")

      let nft = collectionRef.borrowMomentNFT(id: id)
          ?? panic("Couldn't borrow momentNFT")

      return [nft.id, nft.editionID, nft.serialNumber, nft.mintingDate]
  }
  `
  const properties = useScript<string[]>({
    cadence: CADENCE_SCRIPT_PROPERTIES,
    args: (arg, t) => [arg(targetAddress, t.Address), arg(momentNFT, t.UInt64)],
    options: {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  /**
   * /////////////////////////////////////////////////////////////////////
   * /////////////////////////////////////////////////////////////////////
   */
  const CADENCE_SCRIPT_COLLECTION_IDS = `
  import NonFungibleToken from 0xNONFUNGIBLETOKENADDRESS
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(address: Address): [UInt64] {
      let account = getAccount(address)

      let collectionRef = account.getCapability(Golazos.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>()
          ?? panic("Could not borrow capability from public collection")

      return collectionRef.getIDs()
  }
  `
  const collectionIDs = useScript<string[]>({
    cadence: CADENCE_SCRIPT_COLLECTION_IDS,
    args: (arg, t) => [arg(targetAddress, t.Address)],
    options: {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  /**
   * /////////////////////////////////////////////////////////////////////
   * /////////////////////////////////////////////////////////////////////
   */
  const CADENCE_SCRIPT_NFTMetadataDisplay = `
  import Golazos from 0xGOLAZOSADDRESS
  import MetadataViews from 0xMETADATAVIEWSADDRESS

  pub fun main(address: Address, id: UInt64):  MetadataViews.Display {
      let account = getAccount(address)

      let collectionRef = account.getCapability(Golazos.CollectionPublicPath)
              .borrow<&{Golazos.MomentNFTCollectionPublic}>()
              ?? panic("Could not borrow capability from public collection")

      let nft = collectionRef.borrowMomentNFT(id: id)
              ?? panic("Couldn't borrow momentNFT")

      return nft.resolveView(Type<MetadataViews.Display>())! as! MetadataViews.Display
  }
  `
  const nftMetadata = useScript<NFTMetadataDisplay>({
    cadence: CADENCE_SCRIPT_NFTMetadataDisplay,
    args: (arg, t) => [arg(targetAddress, t.Address), arg(momentNFT, t.UInt64)],
    options: {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  /**
   * /////////////////////////////////////////////////////////////////////
   * /////////////////////////////////////////////////////////////////////
   */
  const CADENCE_SCRIPT_PLAY = `
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(id: UInt64): Golazos.PlayData? {
      return Golazos.getPlayData(id: id)
  }
  `
  const playData = useScript<PlayData>({
    cadence: CADENCE_SCRIPT_PLAY,
    args: (arg, t) => [arg(playId, t.UInt64)],
    options: {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  /**
   * /////////////////////////////////////////////////////////////////////
   * /////////////////////////////////////////////////////////////////////
   */
  const CADENCE_SCRIPT_ALL_SET_NAMES = `
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(): [String] {
      return Golazos.getAllSetNames()
  }
  `
  const allSetNames = useScript<string[]>({
    cadence: CADENCE_SCRIPT_ALL_SET_NAMES,
    args: (arg, t) => [],
    options: {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  /**
   * /////////////////////////////////////////////////////////////////////
   * /////////////////////////////////////////////////////////////////////
   */
  const CADENCE_SCRIPT_SET = `
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(setName: String): Golazos.SetData? {
      return Golazos.getSetDataByName(name: setName)
  }
  `
  const setData = useScript<SetData>({
    cadence: CADENCE_SCRIPT_SET,
    args: (arg, t) => [arg(golazosSetName, t.String)],
    options: {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })

  /**
   * /////////////////////////////////////////////////////////////////////
   * /////////////////////////////////////////////////////////////////////
   */
  const CADENCE_SCRIPT_ALL_PLAYS = `
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(): [Golazos.PlayData] {
      let plays: [Golazos.PlayData] = []
      var id: UInt64 = Golazos.nextPlayID - 10
      // Note < , as nextPlayID has not yet been used
      while id < Golazos.nextPlayID {
          plays.append(Golazos.getPlayData(id: id)!)
          id = id + 1
      }
      return plays
  }
  `
  const allPlays = useScript<PlayData[]>({
    cadence: CADENCE_SCRIPT_ALL_PLAYS,
    args: (arg, t) => [],
    options: {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  return {
    medias, // MetadataViews: user's moment NFT medias
    properties, // MetadataViews: user's moment NFT properties
    collectionIDs, // Moment: list all user moment NFT IDs
    nftMetadata, // MetadataViews: user's nft Metadata
    allPlays, // Plays: Last X plays
    playData, // Plays: Details
    allSetNames, // Sets: list by content types
    setData, // Sets: single set data
  }
}
