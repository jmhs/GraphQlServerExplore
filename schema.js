const axios = require("axios");

//Bring in a bunch of stuff from graphql

// datatypes you'll be using
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

                /*
                //HardCoded data
                const customers = [
                  {id:"1", name:"John Doe", email: "jdoe@gmail.com", age:35},
                  {id:"2", name:"Steve Smith", email: "steve@gmail.com", age:25},
                  {id:"3", name:"Sara Williams", email: "sara@gmail.com", age:32},
                ]
                */

//Customer Object
// fields; define fields
const CustomerType = new GraphQLObjectType({
  name:"Customer",
  fields:()=>({
    id:{type:GraphQLString},
    name:{type:GraphQLString},
    email:{type:GraphQLString},
    age: {type:GraphQLInt},
  })
})

//Root query
const RootQuery = new GraphQLObjectType({
  // name; all object types need a name
  name: "RootQueryType",
  // customer; to fill customers data from our database
  //  to be included in fields obj
  fields:{
    customer :{
      type:CustomerType,
      // args; to fetch customer by ID
      args:{
          id:{
            type:GraphQLString
            }
      },
      //resolve the request (id) by searching for id that matches
      resolve(parentValue,args){
        /*
        for(let i = 0; i< customers.length; i++){
        //   if(customers[i].id === args.id){
        //     return customers[i];
        //returns current iteration that matches id
          */
          return axios.get("http://localhost:3000/customers/"+ args.id)
            .then(res => res.data); //fetch data from res obj
          }
        },
        customers:{
          type: new GraphQLList(CustomerType),
          resolve(parentValue, args){
            return axios.get("http://localhost:3000/customers/"+ args.id)
              .then(res => res.data); //fetch data from res obj
          }
        }
      }
  

});



//export as a module
module.exports = new GraphQLSchema ({
  //Need to take in root query - baseline for all queries
  query: RootQuery
});
