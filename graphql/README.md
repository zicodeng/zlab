# GraphQL

## What It It?

An API query language and a server-side runtime for executing queries.

## Why Is It Better Than Traditional REST API.

### Problems with traditional REST API:

-   Client often needs to send multiple requests to get data stored in different tables or collections.
-   As the application grows, the number of endpoints starts exploding. It becomes harder to keep track of all endpoints.
-   With REST APIs, the server dictates what response will be sent to the client. **Client has no control** what data it will be getting.
-   Without actually seeing the response, the client cannot tell what response will it be getting.

### Benefits of GraphQL:

-   Usually one request gets all of the data client needs.
-   Client can control what data it wants.
-   Client can easily tell what data it will be getting.
-   Since there is one endpoint, it is very easy to maintain for the client.
-   No more overfetching or underfetching.

Some people also argue: GraphQL doesn't solve the problem of handling complex data. It simply shifts the problem from client-side to server-side.

## Related Tools

### Apollo

#### Apollo Client

#### Apollo Server

### GraphiQL

A front-end tool for testing queries against GraphQL server.

## References

https://graphql.org/learn/

https://www.quora.com/What-is-GraphQL
