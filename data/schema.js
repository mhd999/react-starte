import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from 'graphql';

let Schema = (db) => {

  class Store {}
  let store = new Store();

  let storeType = new GraphQLObjectType({
      name: 'Store',
      fields: () => ({
        items: {
          type: new GraphQLList(itemType),
          resolve: () => db.collection("items").find({}).toArray()
        }
      })
  });

  let itemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      price: { type: GraphQLInt }
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
