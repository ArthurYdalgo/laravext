import { useContext } from 'react'
import LaravextContext from './laravextContext'

export default function laravext () {
  const laravext = useContext(LaravextContext)

  if (!laravext) {
    throw new Error('This method must used within a Laravext Context')
  }

  return laravext
}