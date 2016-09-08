import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from 'graphql';

let Schema = (db) => {

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
        items: {
          type: new GraphQLList(itemType),
          resolve: () => db.collection("items").find({}).toArray()
        }
      })
    })
  });

  return schema
};

export default Schema;
