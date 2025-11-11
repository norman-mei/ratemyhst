'use client'

import { ReactNode, createContext, useContext } from 'react'
import { Config } from './types'

export const ConfigContext = createContext<Config>({
  LOCALE: 'en',
  BEG_THRESHOLD: 0.2,
  CITY_NAME: 'default',
  MAP_CONFIG: {
    container: 'map',
    style: 'mapbox://styles/benjamintd/clohp062g002b01o4e3lt1exh',
    bounds: [
      [-4.184549, 40.156349],
      [-3.19578, 40.62702],
    ],
    maxBounds: [
      [-5.184549, 39.156349],
      [-2.19578, 41.62702],
    ],
    minZoom: 6,
    fadeDuration: 50,
  },
  STRIPE_LINK: 'https://buy.stripe.com/bIY8x3fiCgmC9bi8wx',
  METADATA: {
    title: 'RateMyHighSchoolTeachers',
    description:
      'RateMyHST helps students share classroom experiences and celebrate great teaching.',
    openGraph: {
      title: 'RateMyHighSchoolTeachers',
      description:
        'Discover high school teachers, schools, and districts powered by student voice.',
      type: 'website',
      locale: 'en',
      url: 'https://ratemyhst.com/',
    },
  },
  LINES: {},
  LINE_GROUPS: [],
})

export const useConfig = () => useContext(ConfigContext)
export const Provider = ({
  children,
  value,
}: {
  children: ReactNode
  value: Config
}) => {
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  )
}

export default Provider
