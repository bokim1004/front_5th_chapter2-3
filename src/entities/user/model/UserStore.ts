import { create } from "zustand"
import { User } from "./UserType"
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
