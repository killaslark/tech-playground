import { jsonPlaceholderInstance } from '@core/services'


export interface Address {
  street: string;
  suite: string
  city: string
  zipcode: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  company: Company
}

export type GetUsersAPIResponse = User[]

export const GET_USERS_API = '/users'

const getUsers = async () => {
  const result = await jsonPlaceholderInstance.get<GetUsersAPIResponse>(GET_USERS_API)
  return result.data
}

export default getUsers