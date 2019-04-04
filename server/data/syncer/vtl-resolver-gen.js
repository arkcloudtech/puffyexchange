var printCode =(codeArray)=>{
    for(var i = 0, cl = codeArray.length; i < cl; i++) {
        console.log(codeArray[i]);
    }
}

var fs = require("fs"); 

fs.readFile(__dirname + "/schema.json", "utf-8", function(err, buf) { 
  // set schema object from schema JSON file
  eval(`var schema = ${buf}`);
  
  function generate() {
    var output = [];

    // loops per portion to keep the readability simpler (code dup and performance aren't an issue here)

    // loop for types
    for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
      let type = schema.__schema.types[i];
      let idType = 'ID!';
      let stringType = 'String';
      let keyRelations = [];
      let genString = "";
      if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
          let funcName = type.name
          genString += `
          ## PuffyExchangeAPI Resolver Documentation
          ## Below example shows how to look up ${funcName}s with a Primary Key of "id" from GraphQL arguments
          ## The helper $util.dynamodb.toDynamoDBJson automatically converts to a DynamoDB formatted request
          ## There is a "context" object with arguments, identity, headers, and parent field information you can access.
          ## It also has a shorthand notation avaialable:
          ##  - $context or $ctx is the root object
          ##  - $ctx.arguments or $ctx.args contains arguments
          ##  - $ctx.identity has caller information, such as $ctx.identity.username
          ##  - $ctx.request.headers contains headers, such as $context.request.headers.xyz
          ##  - $ctx.source is a map of the parent field, for instance $ctx.source.xyz
          ## Read more: https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference.html
      
          {
              "version": "2017-02-28",
              "operation": "Get${funcName}",
              "key": {
                  "id": $util.dynamodb.toDynamoDBJson($ctx.args.id),
              }
          }
          `;
          
          output.push(genString);
      }
    }

    return output;
  }

    printCode(generate());

});

