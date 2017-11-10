const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');
//initialise express
const app = express()


//let express use GraphQl, path takes in GraphQl configuration Object
app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql:true //boolean to toggle graphical ide
}))

//listen to port
app.listen(4000, ()=>{
  console.log("Brooo Server running on Port 4k!")
})
