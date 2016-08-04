import fetch from 'isomorphic-fetch';

export default async function fetchGraphql(query : string, variables : mixed, token : string) {
  const graphqlUrl = 'http://localhost:4001/graphql/graphql';

  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: token },
    body: JSON.stringify({ query, variables }),
  });

  return await response.json();
}
