import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4o68jc20sjk01xmawk5ch2q/master',
  cache: new InMemoryCache()
})