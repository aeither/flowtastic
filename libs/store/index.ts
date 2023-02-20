import { create } from 'zustand'

interface State {
  targetAddress: `0x${string}`
  setTargetAddress: (targetAddress: `0x${string}`) => void
  momentNFT: string
  setMomentNFT: (targetAddress: string) => void
  playId: number
  setPlayId: (playId: number) => void
  golazosSetName: string
  setGolazosSetName: (playId: string) => void
  seriesName: string
  setSeriesName: (seriesName: string) => void
}

export const useStore = create<State>((set) => ({
  targetAddress: '0xcd2983e6eac4b9b9',
  setTargetAddress: (targetAddress) =>
    set(() => ({ targetAddress: targetAddress })),
  momentNFT: '802448578',
  setMomentNFT: (momentNFT) => set(() => ({ momentNFT: momentNFT })),
  playId: 372,
  setPlayId: (playId) => set(() => ({ playId: playId })),
  golazosSetName: 'Jugones',
  setGolazosSetName: (golazosSetName) =>
    set(() => ({ golazosSetName: golazosSetName })),
  seriesName: 'Series 1',
  setSeriesName: (seriesName) => set(() => ({ seriesName: seriesName })),
}))
