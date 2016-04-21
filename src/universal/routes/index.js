// @flow

import React from 'react'
import { Link } from 'react-router'

const Index = ({ children } : { children: any }) => (
  <div>
    <p>IT wrk!</p>
    <Link to='nested'>Cic</Link>
    <Link to='other'>Clic m</Link>
    {children}
  </div>
)

const Nested = () => (
  <p>I'm nsted!</p>
)

const Other = () => (
  <p>Soi</p>
)

const NestedRoute = {
  path: 'nested',
  component: Nested
}

const IndexRoute = {
  path: '/',
  component: Index,
  childRoutes: [NestedRoute]
}


const OtherRoute = {
  path: '/other',
  component: Other
}

export default [IndexRoute, OtherRoute]
