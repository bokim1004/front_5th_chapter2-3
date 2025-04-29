export interface User {
  id: number
  age: number
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
