import express, { Express, Request} from 'express'
import cors from 'cors'
import { schema } from './app/graphql';
const app: Express = express();
const { graphqlHTTP } = require('express-graphql');

//middleware 
app.use(express.json())
app.use(cors())


app.use(
    '/graphql',
    graphqlHTTP((req:Request) => ({
      schema: schema,
      graphiql: true,
      context: { 
        info:"Mosiur Islam"
      }, 
    }))
);


export default app;
