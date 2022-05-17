import { ApolloClient, createHttpLink, InMemoryCache, makeVar, split } from "@apollo/client";
import {setContext} from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from "@apollo/client/utilities";
import { LOCALSTORAGE_TOKEN } from "./constants/constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN)
export const isLoggedInVar = makeVar(Boolean(token)); 
export const authTokenVar = makeVar(token)


const wsLink = new WebSocketLink({
    uri: process.env.NODE_ENV === "production" ? "wss://crave-eat-backend.herokuapp.com/graphql" : `ws://localhost:4000/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            "x-jwt": authTokenVar() || "",
        }
    }

})
const httpLink = createHttpLink({
    uri: process.env.NODE_ENV === "production" ? "https://crave-eat-backend.herokuapp.com/graphql" : 'http://localhost:4000/graphql'
})




const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            "x-jwt": authTokenVar() || "",
        }
    }
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read() {
                            return isLoggedInVar();
                        }
                    },
                    token: {
                        read(){
                            return authTokenVar();
                        }
                    },
                    myMessages: {
                        merge(existing, incoming) {
                            return incoming;
                        }
                    }
                }
            }
        }
    })
});
