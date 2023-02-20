import {
  NFTMetadataDisplay,
  NFTMetadataMedias,
  PlayData,
  SetData,
} from '@/utils/types'
import { createClient, FlowProvider, networks, useScript } from '@flowity/react'
import { FC } from 'react'

const client = createClient({
  fclConfig: {
    ...networks.mainnet,
    '0xNONFUNGIBLETOKENADDRESS': '0x1d7e57aa55817448',
    '0xGOLAZOSADDRESS': '0x87ca73a41bb50ad5',
    '0xMETADATAVIEWSADDRESS': '0x1d7e57aa55817448',
  },
})

export default function WithFlowProvider() {
  return (
    <FlowProvider client={client}>
      <h1>useScript Example</h1>
      <Custom />
    </FlowProvider>
  )
}

const NFTMetadataMediasComponent: FC = () => {
  const CADENCE_SCRIPT = `
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

  const { data, isLoading, isFetching, isError, error } =
    useScript<NFTMetadataMedias>({
      cadence: CADENCE_SCRIPT,
      args: (arg, t) => [
        arg('0xcd2983e6eac4b9b9', t.Address),
        arg('802448578', t.UInt64),
      ],
    })
  console.log('🚀 ~ file: custom.tsx:39 ~ Custom ~ data', data)
  // need index 8 for video and index 10 for idle video
  return <></>
}

const NFTMetadataDisplayComponent: FC = () => {
  const CADENCE_SCRIPT = `
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

  const { data, isLoading, isFetching, isError, error } =
    useScript<NFTMetadataDisplay>({
      cadence: CADENCE_SCRIPT,
      args: (arg, t) => [
        arg('0xcd2983e6eac4b9b9', t.Address),
        arg('802448578', t.UInt64),
      ],
    })
  console.log('🚀 ~ file: custom.tsx:39 ~ Custom ~ data', data)
  return <></>
}

const NFTPropertiesComponent: FC = () => {
  const CADENCE_SCRIPT = `
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

  const { data, isLoading, isFetching, isError, error } = useScript<string[]>({
    cadence: CADENCE_SCRIPT,
    args: (arg, t) => [
      arg('0xcd2983e6eac4b9b9', t.Address),
      arg('802448578', t.UInt64),
    ],
  })
  console.log('🚀 ~ file: custom.tsx:39 ~ Custom ~ data', data)
  return <></>
}

const CollectionIDsComponent: FC = () => {
  const CADENCE_SCRIPT = `
  import NonFungibleToken from 0xNONFUNGIBLETOKENADDRESS
  import Golazos from 0xGOLAZOSADDRESS
  
  pub fun main(address: Address): [UInt64] {
      let account = getAccount(address)
  
      let collectionRef = account.getCapability(Golazos.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>()
          ?? panic("Could not borrow capability from public collection")
      
      return collectionRef.getIDs()
  }
  `

  const { data, isLoading, isFetching, isError, error } = useScript<string[]>({
    cadence: CADENCE_SCRIPT,
    args: (arg, t) => [arg('0xcd2983e6eac4b9b9', t.Address)],
  })
  console.log('🚀 ~ file: custom.tsx:39 ~ Custom ~ data', data)
  return <></>
}

const PlayById: FC = () => {
  const CADENCE_SCRIPT = `
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(id: UInt64): Golazos.PlayData? {
      return Golazos.getPlayData(id: id)
  }
  `

  const { data, isLoading, isFetching, isError, error } = useScript<PlayData>({
    cadence: CADENCE_SCRIPT,
    args: (arg, t) => [arg(372, t.UInt64)],
  })
  console.log('🚀 ~ file: custom.tsx:39 ~ Custom ~ data', data)
  return <></>
}

const SetDataComponent: FC = () => {
  const CADENCE_SCRIPT = `
  import Golazos from 0xGOLAZOSADDRESS
  
  pub fun main(setName: String): Golazos.SetData? {
      return Golazos.getSetDataByName(name: setName)
  }
  `

  const { data, isLoading, isFetching, isError, error } = useScript<SetData>({
    cadence: CADENCE_SCRIPT,
    args: (arg, t) => [arg('Jugones', t.String)],
  })
  console.log('🚀 ~ file: custom.tsx:39 ~ Custom ~ data', data)
  return <></>
}

const AllSetNamesComponent: FC = () => {
  const CADENCE_SCRIPT = `
  import Golazos from 0xGOLAZOSADDRESS

  pub fun main(): [String] {
      return Golazos.getAllSetNames()
  }
  `

  const { data, isLoading, isFetching, isError, error } = useScript<SetData>({
    cadence: CADENCE_SCRIPT,
    args: (arg, t) => [],
  })
  console.log('🚀 ~ file: custom.tsx:39 ~ Custom ~ data', data)
  return <></>
}

function Custom() {
  return (
    <div>
      <h1>Flow App</h1>
      <p>This is it</p>
      <NFTMetadataMediasComponent />
      {/* <NFTMetadataDisplayComponent /> */}
      {/* <NFTPropertiesComponent /> */}
      {/* <CollectionIDsComponent /> */}
      {/* <PlayById /> */}
      {/* <SetDataComponent /> */}
    </div>
  )
}
