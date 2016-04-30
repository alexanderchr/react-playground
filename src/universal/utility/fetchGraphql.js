import fetch from 'isomorphic-fetch';

export default async function fetchGraphql(query : string, variables : mixed) {
  const graphqlUrl = 'http://localhost:8000/graphql/graphql';

  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  return await response.json();
}
