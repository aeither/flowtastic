import {
  EditionData,
  NftEditions,
  SeriesData,
  type NFTMetadataDisplay,
  type NFTMetadataMedias,
  type PlayData,
  type SetData,
} from '@/libs/types'
import { useScript } from '@flowity/react'
import { useStore } from '../store'

/**
 * /////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////
 */
export const useMedias = ({
  momentNFT,
  targetAddress,
}: {
  momentNFT: string
  targetAddress: string
}) => {
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
      enabled: !!momentNFT && !!targetAddress,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  })
  return medias
}

/**
 * /////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////
 */
export const useTraits = ({
  momentNFT,
  targetAddress,
}: {
  momentNFT: string
  targetAddress: string
}) => {
  const CADENCE_SCRIPT_TRAITS = `
  import Golazos from 0xGOLAZOSADDRESS
  import MetadataViews from 0xMETADATAVIEWSADDRESS
  
  pub fun main(address: Address, id: UInt64):  MetadataViews.Traits {
      let account = getAccount(address)
  
      let collectionRef = account.getCapability(Golazos.CollectionPublicPath)
              .borrow<&{Golazos.MomentNFTCollectionPublic}>()
              ?? panic("Could not borrow capability from public collection")
  
      let nft = collectionRef.borrowMomentNFT(id: id)
              ?? panic("Couldn't borrow momentNFT")
  
      return nft.resolveView(Type<MetadataViews.Traits>())! as! MetadataViews.Traits
  }
    `
  const traits = useScript<any>({
    cadence: CADENCE_SCRIPT_TRAITS,
    args: (arg, t) => [arg(targetAddress, t.Address), arg(momentNFT, t.UInt64)],
    options: {
      enabled: !!momentNFT && !!targetAddress,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  })
  return traits
}
/**
 * /////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////
 */
export const useProperties = ({
  momentNFT,
  targetAddress,
}: {
  momentNFT: string
  targetAddress: string
}) => {
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
      enabled: !!momentNFT && !!targetAddress,
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  return properties
}
/**
 * /////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////
 */
export const useCollectionIDs = ({
  targetAddress,
}: {
  targetAddress: string | undefined | null
}) => {
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
      enabled: !!targetAddress,
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  return collectionIDs
}
/**
 * /////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////
 */
export const useMomentProperties = ({
  momentNFT,
  targetAddress,
}: {
  momentNFT: string
  targetAddress: string | null | undefined
}) => {
  const CADENCE_SCRIPT_MOMENT_PROPERTIES = `
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
  const momentProperties = useScript<string[]>({
    cadence: CADENCE_SCRIPT_MOMENT_PROPERTIES,
    args: (arg, t) => [arg(targetAddress, t.Address), arg(momentNFT, t.UInt64)],
    options: {
      enabled: !!momentNFT && !!targetAddress,
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  return momentProperties
}
/**
 * /////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////
 */
export const useNftMetadata = ({
  momentNFT,
  targetAddress,
}: {
  momentNFT: string
  targetAddress: string | null | undefined
}) => {
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
      enabled: !!momentNFT && !!targetAddress,
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  return nftMetadata
}
/**
 * /////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////
 */
export const useNftEditions = ({
  momentNFT,
  targetAddress,
}: {
  momentNFT: string
  targetAddress: string | null | undefined
}) => {
  const CADENCE_SCRIPT_NFTMetadataDisplay = `
  import Golazos from 0xGOLAZOSADDRESS
  import MetadataViews from 0xMETADATAVIEWSADDRESS
  
  pub fun main(address: Address, id: UInt64): MetadataViews.Editions {
      let account = getAccount(address)
  
      let collectionRef = account.getCapability(Golazos.CollectionPublicPath)
              .borrow<&{Golazos.MomentNFTCollectionPublic}>()
              ?? panic("Could not borrow capability from public collection")
  
      let nft = collectionRef.borrowMomentNFT(id: id)
              ?? panic("Couldn't borrow momentNFT")
  
      return nft.resolveView(Type<MetadataViews.Editions>())! as! MetadataViews.Editions
  }
  `
  const nftEditions = useScript<NftEditions>({
    cadence: CADENCE_SCRIPT_NFTMetadataDisplay,
    args: (arg, t) => [arg(targetAddress, t.Address), arg(momentNFT, t.UInt64)],
    options: {
      enabled: !!momentNFT && !!targetAddress,
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  return nftEditions
}
/**
 * /////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////
 */
export const usePlayData = ({ playId }: { playId: number | undefined }) => {
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
      enabled: !!playId,
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })
  return playData
}

export function useFlow() {
  // const targetAddress = useStore((state) => state.targetAddress)
  // const momentNFT = useStore((state) => state.momentNFT)
  const playId = useStore((state) => state.playId)
  const golazosSetName = useStore((state) => state.golazosSetName)
  const seriesName = useStore((state) => state.seriesName)

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
  const CADENCE_SCRIPT_ALL_SERIES_NAMES = `
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(): [String] {
      return Golazos.getAllSeriesNames()
  }
  `
  const allSeriesNames = useScript<string[]>({
    cadence: CADENCE_SCRIPT_ALL_SERIES_NAMES,
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
  const CADENCE_SCRIPT_SERIES = `
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(seriesName: String): Golazos.SeriesData? {
      return Golazos.getSeriesDataByName(name: seriesName)
  }
  `
  const seriesData = useScript<SeriesData>({
    cadence: CADENCE_SCRIPT_SERIES,
    args: (arg, t) => [arg(seriesName, t.String)],
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
      var id: UInt64 = 1
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

  /**
   * /////////////////////////////////////////////////////////////////////
   * /////////////////////////////////////////////////////////////////////
   */
  const CADENCE_SCRIPT_ALL_EDITIONS = `
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(): [Golazos.EditionData] {
      let editions: [Golazos.EditionData] = []
      var id: UInt64 = 1
      // Note < , as nextEditionID has not yet been used
      while id < Golazos.nextEditionID {
          editions.append(Golazos.getEditionData(id: id)!)
          id = id + 1
      }
      return editions
  }
  `
  const allEditions = useScript<EditionData[]>({
    cadence: CADENCE_SCRIPT_ALL_EDITIONS,
    args: (arg, t) => [],
    options: {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  })

  /**
   * Effects
   */
  // useEffect(() => {
  //   void playData.refetch()
  // }, [playId])

  return {
    // useMedias, // MetadataViews: user's moment NFT medias
    // useProperties, // MetadataViews: user's moment NFT properties
    // useCollectionIDs, // Moment: list all user moment NFT IDs
    // useMomentProperties, // [nft.id, nft.editionID, nft.serialNumber, nft.mintingDate]
    // useNftMetadata, // MetadataViews: user's nft Metadata
    // usePlayData, // Plays: Details
    // useTraits,
    allPlays, // Plays: Last X plays
    allSetNames, // Sets: list by content types
    setData, // Sets: single set data
    allSeriesNames,
    seriesData,
    allEditions,
  }
}
