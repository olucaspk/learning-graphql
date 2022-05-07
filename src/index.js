import { ApolloServer, gql } from 'apollo-server';

// Todas as requisições são metodos POST e batem no mesmo endpoint (/graphql)
// Query -> Buscar informações (GET)
// Mutation -> Alterar informações (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Float, Boolean, ID


// A exclamação determina que é obrigatório o retorno
const typeDefs = gql`
    type User {
        _id: ID!,
        name: String!,
        email: String!,
        is_active: Boolean!
    }

    type Post {
        _id: ID!,
        title: String!,
        content: String!,
        author: User!
    }
    
    type Query {
        hello: String
        users: [User!]! # ! -> declara que pode retornar [] mas não pode retornar null
        getUserByEmail(email: String!): User!
    }
`;

const users = [
    { _id: String(Math.random()), name: 'Lucas', email: 'lucas@smashv.gg', is_active: true },
    { _id: String(Math.random()), name: 'Pedro', email: 'pedro@smashv.gg', is_active: false },
    { _id: String(Math.random()), name: 'Nathalia', email: 'nathalia@smashv.gg', is_active: true },
];

const resolvers = {
    Query: {
        hello: () => 'Hello World',
        users: () => users,
        getUserByEmail: (_, args) => {
            return users.find((user) => user.email === args.email);
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server running on ${url}`));