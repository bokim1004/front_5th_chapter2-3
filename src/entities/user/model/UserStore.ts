import { create } from "zustand"

interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  image: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
    title: string
  }
}

interface UserStore {
  selectedUser: User | null
  showUserModal: boolean
  setSelectedUser: (user: User | null) => void
  setShowUserModal: (open: boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
  selectedUser: null,
  showUserModal: false,
  setSelectedUser: (user) => set({ selectedUser: user }),
  setShowUserModal: (open) => set({ showUserModal: open }),
}))
