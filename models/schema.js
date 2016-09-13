import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
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
      id: globalIdField('Store'),
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

  //mutation
  let createItemMutation = mutationWithClientMutationId({
    name: 'CreateItem',

    inputFields: {
      title: {type: new GraphQLNonNull(GraphQLString)},
      price: {type: new GraphQLNonNull(GraphQLFloat)}
    },
    //return after mutateAndGetPayload
    outputFields: {
      itemEdge: {
        type: itemConnection.edgeType,
        resolve: (obj) => ({node:obj.ops[0], cursor: obj.insertedId}) 
      }, 
      store: {
        type: storeType,
        resolve: () => store
      }
    },

    mutateAndGetPayload: ({title, price}) => {
      return db.collection("items").insertOne({title, price});
    }
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
    
    }),
     mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: ()=> ({
        createItem: createItemMutation
      })
    })
  });



 

  return schema
};

export default Schema;
