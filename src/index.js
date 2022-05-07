import { ApolloServer, gql } from 'apollo-server';

// Todas as requisições são metodos POST e batem no mesmo endpoint (/graphql)
// Query -> Buscar informações (GET)
// Mutation -> Alterar informações (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Float, Boolean, ID

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World'
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server running on ${url}`));