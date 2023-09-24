const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
} = require("graphql");

//require Mongoose Contollers
const contactContollers = require("../controllers/ContactControllers");
//import SQL Contact Controllers
const ContactControllersSQL = require("../SQL/ControllersSql/ContactsControllersSql");

// declare the Contact Type => One Contact in Our List
const contactType = new GraphQLObjectType({
  name: "Contact",
  description: "this is One Contact",
  // fields of Our Contact
  fields: {
    //- we need to take our var like the same in our database Schema
    id: { type: GraphQLID, description: "this is the ID" },
    name: { type: GraphQLString, description: "this is the name" },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    // //if list we can use GrapghQlList
    // table:{
    //     //list of String
    //     type:new GraphQLList(GraphQLString)
    // }
  },
});

const queryType = new GraphQLObjectType({
  name: "Query",
  description: "this is the query type",
  fields: {
    // Get All Contacts
    contacts: {
      //-----The list of Contact get How the contact will displayed
      type: new GraphQLList(contactType),
      description: "this is the list of contacts",
      ////----If we want to return just specific Contact we created now like test
      // resolve:(_,args)=>{
      //     return [{name:"test"}]
      // }
      //-------If we want to return all Contact make function that return all contact
      resolve: (_, args) => {
        return ContactControllersSQL.graphContactFindPostgres();
      },
    },
    oneContactById: {
      type: contactType,
      description: "this is the One contact By ID",
      args: {
        id: {
          type: GraphQLID,
          description: "this is the id of our Contact",
        },
      },
      //-------If we want to return One Contact make function that return One contact in Controllers and import it
      resolve: (_, args) => {
        return ContactControllersSQL.graphContactFindByIDPostgres(args.id);
      },
    },
    oneContactByEmail: {
      type: contactType,
      description: "this is the One contact By Email",
      args: {
        //declare what is our parameter will be
        email: {
          type: GraphQLString,
          description: "this is the Email of our Contact",
        },
      },
      //-------If we want to return One Contact make function that return One contact in Controllers and import it
      resolve: (_, args) => {
        return ContactControllersSQL.graphContactFindByEmailPostgres(args.email);
      },
    },
  },
});

// GraphQL Mutations (POST & PUT)
const mutationsType = new GraphQLObjectType({
  name: "Mutations",
  description: "This is Mutations Types",
  fields: {
    postContact: {
      type: contactType,
      description: "add contact",
      args: {
        id:{ type: GraphQLID },
        name: { type: GraphQLString, description: "this is the name" },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: (_, args) => {
        const newContact = {
          id: args.id,
          name: args.name,
          email: args.email,
          phone: args.phone,
        };
        return ContactControllersSQL.graphContactPostPostgres(newContact);
      },
    },
    EditContact: {
      type: contactType,
      description: "Edit contact : ",
      args: {
        id: {
          type: GraphQLID,
          description: "this is the id of our Contact",
        },
        name: { type: GraphQLString, description: "this is the name" },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: async(_, args) => {
        const newData = {
            id: args.id,
          name: args.name,
          email: args.email,
          phone: args.phone,
        };
        const test =  await ContactControllersSQL.graphContactPutPostgres(newData);
        return test
      },
    },
    deleteContactById: {
      type: contactType,
      description: "this is the delete contact By ID",
      args: {
        id: {
          type: GraphQLID,
          description: "this is the id of our Contact",
        },
      },
      //-------If we want to delete One Contact make function that return One contact in Controllers and import it
      resolve: (_, args) => {
        return ContactControllersSQL.graphContactDeletePostgres(args.id);
      },
    },
  },
});

//Our Schema
const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationsType,
});

exports.schema = schema;
