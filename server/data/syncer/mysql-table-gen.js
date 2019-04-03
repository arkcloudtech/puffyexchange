
var template = `
function conditionallyCreateCommentsTable(connection) {
  const createTableSQL = 'CREATE TABLE IF NOT EXISTS comments (
    id        VARCHAR(64) NOT NULL,
    author    VARCHAR(128) NOT NULL,
    postId    VARCHAR(64) NOT NULL,
    content   VARCHAR(255) NOT NULL,
    upvotes   INT NOT NULL,
    downvotes INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(postId) REFERENCES posts(id))';
  return executeSQL(connection, createTableSQL);
}

function conditionallyCreatePostsTable(connection) {
  const createTableSQL = 'CREATE TABLE IF NOT EXISTS posts (
    id        VARCHAR(64) NOT NULL,
    author    VARCHAR(64) NOT NULL,
    content   VARCHAR(2048) NOT NULL,
    views     INT NOT NULL,
    PRIMARY KEY(id))';
  return executeSQL(connection, createTableSQL);
}`

var fs = require("fs");
fs.readFile("./schema.json", "utf-8", function(err, buf) {
  // set schema object from schema JSON file
  eval(`var schema = ${buf}`);
    function genMySQLTable() {
      var tableGenScripts = [];
      let funcNames = [];
      for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
        let type = schema.__schema.types[i];
        let idType = 'VARCHAR(64)';
        let stringType = 'VARCHAR(255)';
        let keyRelations = [];
        let genString = "";
        if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
            let funcName = `conditionallyCreate${type.name}Table(connection)`;
            funcNames.push(funcName);
            genString += `
            function ${funcName} {
              const createTableSQL = \`CREATE TABLE IF NOT EXISTS ${type.name.toLowerCase()} (
              \tid        \t${idType} NOT NULL,\r\n`;
            for(var j = 0, tfl = type.fields.length; j < tfl; j++){
              let field = type.fields[j];
              if(field.type.name === "ID"){
    
              } else {
                field.type.name = field.type.name === "String" ? stringType : field.type.name;
                let fieldName = field.name + (field.type.kind === "OBJECT" ? 'Id': '');
                if(field.type.kind === "OBJECT") {
                  keyRelations.push( { table: field.name.toLowerCase() + 's',idName: fieldName } )
                }
                genString += '\t\t\t' + fieldName + '\t\t' + (field.type.kind === "OBJECT" ? idType : field.type.name) + (j == tfl.length - 1 ? '': ',') + '\r\n';
              }
            }
            let krString = keyRelations.length > 0 ? '\r\n' : '';
            for(var kr = 0, krl = keyRelations.length; kr < krl; kr++){
              krString += `\t\t\tFOREIGN KEY(${keyRelations[kr].idName}) REFERENCES ${keyRelations[kr].table}(id)` + (kr == krl - 1 ? '': ',\r\n');
            }
            genString += '\t\t\tPRIMARY KEY(id)' + (krString.length > 0 ? "," : "") + krString + ")\`;" + '\r\n';
            genString += '\t\treturn executeSQL(connection, createTableSQL);' + '\r\n';
            genString += '\t  }' + '\r\n';
            console.log(genString);
            tableGenScripts.push(genString);
        }
      }
      return { scripts: tableGenScripts, funcs: funcNames };
    }
    
    console.dir(genMySQLTable() );
    
    
    
    function genMyGraphQLSDL() {
      var tableGenScripts = [];
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
            for(var j = 0, tfl = type.fields.length; j < tfl; j++){
              let field = type.fields[j];
              if(field.type.name === "ID"){
    
              } else {
                field.type.name = field.type.name === "String" ? stringType : field.type.name;
                let fieldName = field.name + (field.type.kind === "OBJECT" ? '': '');
                if(field.type.kind === "OBJECT") {
                  keyRelations.push( { table: field.name,idName: fieldName } )
                }
                genString += '\t\t\t' + fieldName + ':\t\t' + (field.type.kind === "OBJECT" ? idType : field.type.name) + (j == tfl.length - 1 ? '': '') + '\r\n';
              }
            }
            genString += '\t\t}' + '\r\n';
            console.log(genString);
            tableGenScripts.push(genString);
        }
      }
      return { scripts: tableGenScripts };
    }
    genMyGraphQLSDL();
});




