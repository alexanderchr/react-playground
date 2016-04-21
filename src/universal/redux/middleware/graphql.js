import fetch from 'isomorphic-fetch'

const graphqlUrl = 'http://localhost:4001/graphql/graphql'

export default ({ dispatch }) => (next) => async (action) => {
  if (!action || !action.meta || !action.meta.graphql) {
    return next(action)
  }

  next(action)


  const { query, variables } = action.payload

  let response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables })
  })

  let parsedResponse = await response.json()

  dispatch({
    type: action.type + '_SUCCESS',
    payload: parsedResponse.data
  })
}
