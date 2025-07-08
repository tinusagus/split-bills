import { create } from 'zustand'

export type ItemInput = {
  name: string
  amount: string
  paidBy: string
  quantity: number
  sharedBy: {
    [participantName: string]: number
  }
}

type Bill = {
  title: string
  createdAt: string
  participants: string[]
  items: ItemInput[]
}

type Store = {
  bill: Bill
  setBill: (bill: Bill) => void
}

export const useBillStore = create<Store>((set) => ({
  bill: {
    title: '',
    createdAt: '',
    participants: [],
    items: [],
  },
  setBill: (bill) => set({ bill }),
}))
