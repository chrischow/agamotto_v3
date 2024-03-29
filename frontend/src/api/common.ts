import axios from 'axios'

import { BACKEND_PREFIX } from '../app/constants'

axios.defaults.withCredentials = true

export const get = async (resource: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await axios
    .get(`${BACKEND_PREFIX}/${resource}`)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then((res) => res.data)
}

export const put = async (resource: string, body: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await axios
    .put(`${BACKEND_PREFIX}/${resource}`, body)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then((res) => res.data)
}

export const post = async (resource: string, body: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await axios
    .post(`${BACKEND_PREFIX}/${resource}`, body)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then((res) => res.data)
}

export const deleteQuery = async (resource: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await axios
    .delete(`${BACKEND_PREFIX}/${resource}`)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .then((res) => res.data)
}
