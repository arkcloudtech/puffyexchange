var template_tableInputs = { 
    template: `input TableBooleanFilterInput {
	ne: Boolean
	eq: Boolean
}

input TableCustomerFilterInput {
	id: TableIDFilterInput
	name: TableStringFilterInput
	phone: TableStringFilterInput
	idUrl: TableStringFilterInput
}

input TableDeliveryFilterInput {
	id: TableIDFilterInput
	summary: TableStringFilterInput
}

input TableFloatFilterInput {
	ne: Float
	eq: Float
	le: Float
	lt: Float
	ge: Float
	gt: Float
	contains: Float
	notContains: Float
	between: [Float]
}

input TableIDFilterInput {
	ne: ID
	eq: ID
	le: ID
	lt: ID
	ge: ID
	gt: ID
	contains: ID
	notContains: ID
	between: [ID]
	beginsWith: ID
}

input TableIntFilterInput {
	ne: Int
	eq: Int
	le: Int
	lt: Int
	ge: Int
	gt: Int
	contains: Int
	notContains: Int
	between: [Int]
}`}

var template_schemaEntry = {
    template: `
schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}`
}

var template_creates = {

}

var template_updates = {
    
}

var template_deletes = {
    
}

var template_inputs = {

}


var template_subscribeEntry = {
    template: `@aws_subscribe(mutations: ["SUBSCRIBE_MUTATION"])
	onCreatePuffyExchangeData(entityId: String): PuffyExchangeData`
}

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
type ${funcName} {\r\n`;
          genString += '\tid\tID!\r\n';
          for(var j = 0, tfl = type.fields.length; j < tfl; j++){
            let field = type.fields[j];
            if(field.type.name === "ID" || field.type.name === "ID!"){
              
            } else {
              field.type.name = field.type.name === "String" ? stringType : field.type.name;
              let fieldName = field.name + (field.type.kind === "OBJECT" ? '': '');
              if(field.type.kind === "LIST") {
                keyRelations.push( { table: field.name,idName: fieldName } );
                genString += '\t' + fieldName + ':\t' + "[" + field.type.ofType.name + "]" + '\r\n';
              } else {  
                genString += '\t' + fieldName + ':\t' + field.type.name + '\r\n';
              }
            }
          }
          genString += '}' + '\r\n';
          
          output.push(genString);
      }
    }

    // loop for create inputs
    for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
        let type = schema.__schema.types[i];
        let idType = 'ID!';
        let stringType = 'String';
        let keyRelations = [];
        let genString = "";
        if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
            let funcName = type.name
            genString += `
input Create${funcName}Input {\r\n`;
            for(var j = 0, tfl = type.fields.length; j < tfl; j++){
              let field = type.fields[j];
              if(field.type.name === "ID" || field.type.name === "ID!"){
                
              } else {
                field.type.name = field.type.name === "String" ? stringType : field.type.name;
                let fieldName = field.name + (field.type.kind === "OBJECT" ? '': '');
                if(field.type.kind === "LIST") {
                  keyRelations.push( { table: field.name,idName: fieldName } );
                } else if(field.type.kind === "OBJECT") {
                    genString += '\t' + fieldName + 'Id:\t' + field.type.name + 'ID' + '\r\n';
                } else {  
                  genString += '\t' + fieldName + ':\t' + field.type.name + '\r\n';
                }
              }
            }
            genString += '}' + '\r\n';
            
            output.push(genString);
        }
    }

    // loop for update inputs
    for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
        let type = schema.__schema.types[i];
        let idType = 'ID!';
        let stringType = 'String';
        let keyRelations = [];
        let genString = "";
        if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
            let funcName = type.name
            genString += `
input Update${funcName}Input {\r\n`;
genString += '\tid\tID!\r\n';
            for(var j = 0, tfl = type.fields.length; j < tfl; j++){
              let field = type.fields[j];
              if(field.type.name === "ID" || field.type.name === "ID!"){
                
              } else {
                field.type.name = field.type.name === "String" ? stringType : field.type.name;
                let fieldName = field.name + (field.type.kind === "OBJECT" ? '': '');
                if(field.type.kind === "LIST") {
                  keyRelations.push( { table: field.name,idName: fieldName } );
                } else if(field.type.kind === "OBJECT") {
                    genString += '\t' + fieldName + 'Id:\t' + field.type.name + 'ID' + '\r\n';
                } else {  
                  genString += '\t' + fieldName + ':\t' + field.type.name + '\r\n';
                }
              }
            }
            genString += '}' + '\r\n';
            
            output.push(genString);
        }
    }

    // loop for delete inputs
            for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
                let type = schema.__schema.types[i];
                let idType = 'ID!';
                let stringType = 'String';
                let keyRelations = [];
                let genString = "";
                if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
                    let funcName = type.name
                    genString += `
input Delete${funcName}Input { 
    id: ID! 
}`;
                 output.push(genString);
                }
            }

    // loop for connections
    for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
        let type = schema.__schema.types[i];
        let idType = 'ID!';
        let stringType = 'String';
        let keyRelations = [];
        let genString = "";
        if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
            let funcName = type.name
            genString += `
type ${funcName}Connection {
    items: [${funcName}]
    nextToken: String
}`;
            
         output.push(genString);
        }
    }

        // loop for create
        for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
            let type = schema.__schema.types[i];
            let idType = 'ID!';
            let stringType = 'String';
            let keyRelations = [];
            let genString = "";
            if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
                let funcName = type.name
                genString += `
create${funcName}(input: Create${funcName}Input!): ${funcName}`;
             output.push(genString);
            }
        }
        // loop for updtate
        for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
            let type = schema.__schema.types[i];
            let idType = 'ID!';
            let stringType = 'String';
            let keyRelations = [];
            let genString = "";
            if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
                let funcName = type.name
                genString += `
update${funcName}(input: Update${funcName}Input!): ${funcName}`;
             output.push(genString);
            }
        }

        // loop for delete
        for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
            let type = schema.__schema.types[i];
            let idType = 'ID!';
            let stringType = 'String';
            let keyRelations = [];
            let genString = "";
            if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
                let funcName = type.name
                genString += `
delete${funcName}(input: Delete${funcName}Input!): ${funcName}`;
             output.push(genString);
            }
        }

// loop for get query
for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
    let type = schema.__schema.types[i];
    let idType = 'ID!';
    let stringType = 'String';
    let keyRelations = [];
    let genString = "";
    if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
        let funcName = type.name
        genString += `
get${funcName}(id: ID!): ${funcName}`;
     output.push(genString);
    }
}


    // loop for onCreate Subscriptions
    for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
        let type = schema.__schema.types[i];
        let idType = 'ID!';
        let stringType = 'String';
        let keyRelations = [];
        let genString = "";
        if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
            let funcName = type.name
            genString += `
onCreate${funcName} (\r\n`;
            genString += '\tid:\tID!,\r\n';
            for(var j = 0, tfl = type.fields.length; j < tfl; j++){
              let field = type.fields[j];
              if(field.type.name === "ID" || field.type.name === "ID!"){
                
              } else {
                field.type.name = field.type.name === "String" ? stringType : field.type.name;
                let fieldName = field.name + (field.type.kind === "OBJECT" ? '': '');
                if(field.type.kind === "LIST") {
                  keyRelations.push( { table: field.name,idName: fieldName } );
                  genString += '\t' + fieldName + ':\t' + "[" + field.type.ofType.name + "]" + (j < tfl.length - 1 ? '': ',') + '\r\n';
                } else if(field.type.kind === "OBJECT") {
                    genString += '\t' + fieldName + 'Id:\t ID' + (j < tfl.length - 1? '': ',') + '\r\n';
                } else {  
                  genString += '\t' + fieldName + ':\t' + field.type.name + (j < tfl.length - 1? '': ',') + '\r\n';
                }
              }
            }
            genString += `): ${funcName}` + `\r\n@aws_subscribe(mutations: ["create${funcName}"])`;
            
            output.push(genString);
        }
      }

    // loop for onDelete Subscriptions
    for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
        let type = schema.__schema.types[i];
        let idType = 'ID!';
        let stringType = 'String';
        let keyRelations = [];
        let genString = "";
        if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
            let funcName = type.name
            genString += `
onDelete${funcName} (\r\n`;
            genString += '\tid:\tID!,\r\n';
            for(var j = 0, tfl = type.fields.length; j < tfl; j++){
              let field = type.fields[j];
              if(field.type.name === "ID" || field.type.name === "ID!"){
                
              } else {
                field.type.name = field.type.name === "String" ? stringType : field.type.name;
                let fieldName = field.name + (field.type.kind === "OBJECT" ? '': '');
                if(field.type.kind === "LIST") {
                  keyRelations.push( { table: field.name,idName: fieldName } );
                  genString += '\t' + fieldName + ':\t' + "[" + field.type.ofType.name + "]" + (j < tfl.length - 1 ? '': ',') + '\r\n';
                } else if(field.type.kind === "OBJECT") {
                    genString += '\t' + fieldName + 'Id:\t ID' + (j < tfl.length - 1? '': ',') + '\r\n';
                } else {  
                  genString += '\t' + fieldName + ':\t' + field.type.name + (j < tfl.length - 1? '': ',') + '\r\n';
                }
              }
            }
            genString += `): ${funcName}` + `\r\n@aws_subscribe(mutations: ["delete${funcName}"])`;
            
            output.push(genString);
        }
      }

    // loop for onUpdate Subscriptions
    for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
        let type = schema.__schema.types[i];
        let idType = 'ID!';
        let stringType = 'String';
        let keyRelations = [];
        let genString = "";
        if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
            let funcName = type.name
            genString += `
onUpdate${funcName} (\r\n`;
            genString += '\tid:\tID!,\r\n';
            for(var j = 0, tfl = type.fields.length; j < tfl; j++){
              let field = type.fields[j];
              if(field.type.name === "ID" || field.type.name === "ID!"){
                
              } else {
                field.type.name = field.type.name === "String" ? stringType : field.type.name;
                let fieldName = field.name + (field.type.kind === "OBJECT" ? '': '');
                if(field.type.kind === "LIST") {
                  keyRelations.push( { table: field.name,idName: fieldName } );
                  genString += '\t' + fieldName + ':\t' + "[" + field.type.ofType.name + "]" + (j < tfl.length - 1 ? '': ',') + '\r\n';
                } else if(field.type.kind === "OBJECT") {
                    genString += '\t' + fieldName + 'Id:\t ID' + (j < tfl.length - 1? '': ',') + '\r\n';
                } else {  
                  genString += '\t' + fieldName + ':\t' + field.type.name + (j < tfl.length - 1? '': ',') + '\r\n';
                }
              }
            }
            genString += `): ${funcName}` + `\r\n@aws_subscribe(mutations: ["update${funcName}"])`;
            
            output.push(genString);
        }
      }

    output.push(`\r\n${template_tableInputs.template}\r\n\r\n${template_schemaEntry.template}`);
    return output;
  }

    printCode(generate());

});

