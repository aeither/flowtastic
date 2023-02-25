import {
  EditionData,
  FlowtasticReview,
  SeriesData,
  type NftEditions,
  type NFTMetadataDisplay,
  type NFTMetadataMedias,
  type PlayData,
  type SetData,
} from '@/libs/types'
import { useScript, useMutation } from '@flowity/react'
import { useStore } from '../store'

/**
 * /////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////
 */
export const useUploadReview = () => {
  const CADENCE_SCRIPT_UPLOAD_REVIEW = `
      import Flowtastic from 0xFLOWTASTIC

      transaction (metadata: {String: String}) {
        prepare(acct: AuthAccount) {
            if acct.borrow<&Flowtastic.Collection>(from: Flowtastic.ReviewCollectionStoragePath) != nil {
                log("Collection exists!")
            } else {
                acct.save<@Flowtastic.Collection>(<-Flowtastic.createEmptyCollection(), to: Flowtastic.ReviewCollectionStoragePath)
                acct.link<&{Flowtastic.CollectionPublic}>(Flowtastic.ReviewCollectionPublicPath, target: Flowtastic.ReviewCollectionStoragePath)
            }
    
            let collection = acct.borrow<&Flowtastic.Collection>(from: Flowtastic.ReviewCollectionStoragePath)
    
            collection?.saveReview(review: <-Flowtastic.createReview(metadata: metadata))
            log("Review created successfully, with message ")
        }
    }
      `
  const uploadReview = useMutation({
    cadence: CADENCE_SCRIPT_UPLOAD_REVIEW,
  })
  return uploadReview
}
/**
 * /////////////////////////////////////////////////////////////////////
 * /////////////////////////////////////////////////////////////////////
 */
export const useAllReviewsByOwner = ({ address }: { address?: string }) => {
  const CADENCE_SCRIPT_ALL_REVIEWS_BY_OWNER = `
  import Flowtastic from 0xFLOWTASTIC

  pub struct ReviewMetadata {
      pub let id: UInt64
      pub let rating: String 
      pub let title: String 
      pub let description: String 
      pub let editionID: String 
  
      init(id: UInt64, rating: String, title: String, description: String, editionID: String) {
          self.id = id
          self.rating = rating
          self.title = title
          self.description = description
          self.editionID = editionID
      }
  }
  
  pub fun main(account: Address): [ReviewMetadata] {
      let reviewOwner = getAccount(account)
  
      let capability = reviewOwner.getCapability<&{Flowtastic.CollectionPublic}>(Flowtastic.ReviewCollectionPublicPath)
  
      let publicRef = capability.borrow()
              ?? panic("Could not borrow public reference")
  
      let reviewIDs = publicRef.getIDs()
  
      let reviews: [ReviewMetadata] = []
  
      for reviewID in reviewIDs {
          let review = publicRef.borrowReview(id: reviewID) ?? panic("this review does not exist")
          let metadata = ReviewMetadata(id: review.id, rating: review.metadata["rating"]!, title: review.metadata["title"]!, description: review.metadata["description"]!, editionID: review.metadata["editionID"]!)
          reviews.append(metadata)
      }
  
      return reviews
  }
      `
  const medias = useScript<FlowtasticReview[]>({
    cadence: CADENCE_SCRIPT_ALL_REVIEWS_BY_OWNER,
    args: (arg, t) => [arg(address, t.Address)],
    options: {
      enabled: !!address,
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
export const useMedias = ({
  momentNFT,
  targetAddress,
}: {
  momentNFT: string
  targetAddress: string
}) => {
  const CADENCE_SCRIPT_NFT_METADATA_MEDIAS = `
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
    cadence: CADENCE_SCRIPT_NFT_METADATA_MEDIAS,
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
  const golazosSetName = useStore((state) => state.golazosSetName)
  const seriesName = useStore((state) => state.seriesName)

  /**
   * /////////////////////////////////////////////////////////////////////
   * /////////////////////////////////////////////////////////////////////
   */
  const CADENCE_SCRIPT_ALL_SET_DATAS = `
import Golazos from 0xGOLAZOSADDRESS

pub fun main(): [Golazos.SetData] {
    let sets: [Golazos.SetData] = []
    var id: UInt64 = 1
    // Note < , as nextSetID has not yet been used
    while id < Golazos.nextSetID {
        sets.append(Golazos.getSetData(id: id)!)
        id = id + 1
    }
    return sets
}
  `
  const allSetDatas = useScript<SetData[]>({
    cadence: CADENCE_SCRIPT_ALL_SET_DATAS,
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
  const CADENCE_SCRIPT_ALL_SET_NAMES = `
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(): [String] {
      return Golazos.getAllSetNames()
  }
  `
  const allSetNames = useScript<string[]>({
    cadence: CADENCE_SCRIPT_ALL_SET_DATAS,
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
    allSetDatas,
    allSetNames, // Sets: list by content types
    setData, // Sets: single set data
    allSeriesNames,
    seriesData,
    allEditions,
  }
}
