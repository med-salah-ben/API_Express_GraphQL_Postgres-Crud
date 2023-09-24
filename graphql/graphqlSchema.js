const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
} = require("graphql");

//Validation Errors
const { errorName } = require("../SQL/constant/constant");

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
      resolve: async(_, args) => {
        try {
          const result =await ContactControllersSQL.graphContactFindPostgres();
          return result;
        } catch (error) {
          throw new Error(errorName.SERVER_ERROR);
        }
        
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
      resolve: async (_, args) => {
        if (!args.id) {
          throw new Error(errorName.ID_IS_REQUIRED);
        }
        const isExist =
          await ContactControllersSQL.graphContactFindByIDPostgres(args.id);
        console.log("isExist : ", isExist);
        if (!isExist) {
          console.log("isExist2 : ", isExist);
          throw new Error(errorName.ID_NOT_EXIST);
        }
        try {
          return isExist;
        } catch (error) {
          console.log("isExist33 : ");
          throw new Error(errorName.SERVER_ERROR);
        }
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
      resolve: async (_, args) => {
        if (!args.email) {
          throw new Error(errorName.EMAIL_IS_REQUIRED);
        }
        const isExist =
          await ContactControllersSQL.graphContactFindByEmailPostgres(
            args.email
          );
        if (!isExist) {
          throw new Error(errorName.EMAIL_NOT_EXIST);
        }
        try {
          return isExist;
        } catch (error) {
          throw new Error(errorName.SERVER_ERROR);
        }
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
        id: { type: GraphQLID },
        name: { type: GraphQLString, description: "this is the name" },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const newContact = {
          id: args.id,
          name: args.name,
          email: args.email,
          phone: args.phone,
        };

        if (!args.email || !args.name || !args.phone) {
          throw new Error(errorName.FIELDS_REQUIRED);
        }
        const result =
          await ContactControllersSQL.graphContactFindByEmailPostgres(
            args.email
          );
        // console.log(result)
        if (result) {
          throw new Error(errorName.USER_ALREADY_EXISTS);
        } else {
          try {
            await ContactControllersSQL.graphContactPostPostgres(newContact);
            return newContact;
          } catch (error) {
            // console.error(err);
            throw new Error(errorName.SERVER_ERROR);
          }
        }
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
      resolve: async (_, args) => {
        const newData = {
          id: args.id,
          name: args.name,
          email: args.email,
          phone: args.phone,
        };
        if(!args.id){
          throw new Error(errorName.ID_IS_REQUIRED);
        }
        const result =
        await ContactControllersSQL.graphContactFindByIDPostgres(
          args.id
        );
      // console.log(result)
      if (!result) {
        throw new Error(errorName.ID_NOT_EXIST);
      } else {
        try {
          const test = await ContactControllersSQL.graphContactPutPostgres(
            newData
          );
          return test;
        } catch (error) {
          throw new Error(errorName.SERVER_ERROR);
        }
      }
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
      resolve: async (_, args) => {
        if (!args.id) {
          throw new Error(errorName.ID_IS_REQUIRED);
        }

        const isExist =
          await ContactControllersSQL.graphContactFindByIDPostgres(args.id);
        if (!isExist) {
          throw new Error(errorName.ID_NOT_EXIST);
        }else{
          try {
            await ContactControllersSQL.graphContactDeletePostgres(args.id);
            console.log(true);
            return true;
          } catch (error) {
            throw new Error(errorName.SERVER_ERROR);
          }
        }

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
