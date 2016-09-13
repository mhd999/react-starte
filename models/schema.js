import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

//Relay helper methods
import {
  globalIdField,
  fromGlobalId,
  nodeDefinitions,
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  mutationWithClientMutationId
} from "graphql-relay";
  

let Schema = (db) => {

  let store = {};


  let itemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: (obj) => obj._id
      },
      title: { type: GraphQLString },
      price: { type: GraphQLInt }
    })
  });

  let itemConnection = connectionDefinitions({
    name: 'Item',
    nodeType: itemType
  });

  let storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      itemConnection: {
        type: itemConnection.connectionType,
        args: connectionArgs,
        resolve: (_, args) => connectionFromPromisedArray(
          db.collection("items").find({}).limit(args.first).toArray(),
          args
        )
      }
    })
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        store: {
          type: storeType,
          resolve: () => store
        }
      })
    
    })
  });

  return schema
};

export default Schema;
