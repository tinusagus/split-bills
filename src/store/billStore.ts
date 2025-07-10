import { create } from 'zustand'

export type SharedEntry = {
  participantId: string
  quantity: number
}

export type ItemInput = {
  name: string
  amount: string
  paidBy: string
  quantity: number
  sharedWith: SharedEntry[]
}

export type Participant = {
  id: string
  name: string
}

type Bill = {
  title: string
  createdAt: string
  participants: Participant[]
  items: ItemInput[]
}

type Store = {
  bill: Bill
  setBill: (bill: Bill) => void
}

export const useBillStore = create<Store>((set) => ({
  // bill: {
  //   title: '',
  //   createdAt: new Date().toISOString(),
  //   participants: [],
  //   items: [],
  // },
  bill: {
    title: 'Kopi Kulo',
    createdAt: new Date().toISOString(),
    participants: [
      {
        id: '1752143601929',
        name: 'Budi',
      },
      {
        id: '1752143604243',
        name: 'Supriadi',
      },
      {
        id: '1752143605243',
        name: 'Alice',
      },
    ],
    items: [
      {
        name: 'Pizza',
        amount: '20000',
        paidBy: '1752143601929',
        quantity: 1,
        sharedWith: [],
      },
    ],
  },

  setBill: (bill) => set({ bill }),
}))
