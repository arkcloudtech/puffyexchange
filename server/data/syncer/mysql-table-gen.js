
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

var schema = {
    "__schema": {
      "queryType": {
        "name": "RootQueryType"
      },
      "mutationType": {
        "name": "Mutation"
      },
      "subscriptionType": null,
      "types": [
        {
          "kind": "OBJECT",
          "name": "RootQueryType",
          "description": null,
          "fields": [
            {
              "name": "customer",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Customer",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "delivery",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Delivery",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "dispatcher",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Dispatcher",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "driver",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Driver",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "drivertask",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "DriverTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "gotohubtask",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "GoToHubTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "inventoryexchangecontract",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "InventoryExchangeContract",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "inventoryexchangetask",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "InventoryExchange",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "message",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Message",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "messageuser",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "MessageUser",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "order",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Order",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "ordertask",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "OrderTask",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "product",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Product",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "profile",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "user",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "customers",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Customer",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "deliveries",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Delivery",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "dispatchers",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Dispatcher",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "drivers",
              "description": null,
              "args": [
                {
                  "name": "isApproved",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "Boolean",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Driver",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "drivertasks",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DriverTask",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "gotohubtasks",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "GoToHubTask",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "inventoryexchangecontracts",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "InventoryExchangeContract",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "inventoryexchangetasks",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "InventoryExchange",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "messages",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Message",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "messageusers",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MessageUser",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "orders",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Order",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "products",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Product",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "profiles",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Profile",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "users",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "SCALAR",
          "name": "ID",
          "description": "The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `\"4\"`) or integer (such as `4`) input value will be accepted as an ID.",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "Customer",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "phone",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "idUrl",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "user",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "SCALAR",
          "name": "String",
          "description": "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "User",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "email",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "phone",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "isActive",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "SCALAR",
          "name": "Boolean",
          "description": "The `Boolean` scalar type represents `true` or `false`.",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "Delivery",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "summary",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "order",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "Order",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "deliveryLocation",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "Location",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "dispatcher",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "Dispatcher",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "driver",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "Driver",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "Order",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "customer",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "Customer",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "deliveries",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Delivery",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "products",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Product",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "Product",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "price",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "imageUrl",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "SCALAR",
          "name": "Float",
          "description": "The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). ",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "Location",
          "description": null,
          "fields": [
            {
              "name": "coordinate",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "Coordinate",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "address",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "Coordinate",
          "description": null,
          "fields": [
            {
              "name": "lon",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "lat",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "Dispatcher",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "user",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "location",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "Location",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "orders",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Order",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "drivers",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Driver",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "Driver",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "location",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "Location",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "deliveries",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Delivery",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "isApproved",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "DriverTask",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "location",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "Location",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "taskNum",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "SCALAR",
          "name": "Int",
          "description": "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. ",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "GoToHubTask",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "task",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "DriverTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "InventoryExchangeContract",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "senderId",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "recipientId",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "signatureA",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "signatureB",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "InventoryExchange",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "task",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "DriverTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "otherDriver",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "Driver",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "Message",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "text",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "time",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "isRead",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "messageOwner",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "MessageUser",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "user",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "messageUser",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "profileId",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "OrderTask",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "summary",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "task",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "DriverTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "Profile",
          "description": null,
          "fields": [
            {
              "name": "id",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "user",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "imageUrl",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "Mutation",
          "description": null,
          "fields": [
            {
              "name": "addCustomer",
              "description": null,
              "args": [
                {
                  "name": "name",
                  "description": null,
                  "type": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "String",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "name": "phone",
                  "description": null,
                  "type": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "String",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "name": "userId",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Customer",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addDelivery",
              "description": null,
              "args": [
                {
                  "name": "orderId",
                  "description": null,
                  "type": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "String",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "name": "deliveryLocation",
                  "description": null,
                  "type": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "LocationInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Delivery",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addDispatcher",
              "description": null,
              "args": [
                {
                  "name": "userId",
                  "description": null,
                  "type": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "String",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Dispatcher",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addDriver",
              "description": null,
              "args": [
                {
                  "name": "userId",
                  "description": null,
                  "type": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "String",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "name": "location",
                  "description": null,
                  "type": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "LocationInput",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Driver",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addDriverTask",
              "description": null,
              "args": [
                {
                  "name": "info",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "DriverTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addGoToHubTask",
              "description": null,
              "args": [
                {
                  "name": "info",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "GoToHubTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addInventoryExchangeContract",
              "description": null,
              "args": [
                {
                  "name": "info",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "InventoryExchangeContract",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addInventoryExchangeTask",
              "description": null,
              "args": [
                {
                  "name": "info",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "InventoryExchange",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addMessage",
              "description": null,
              "args": [
                {
                  "name": "userId",
                  "description": null,
                  "type": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "String",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "name": "imageUrl",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                },
                {
                  "name": "time",
                  "description": null,
                  "type": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "String",
                      "ofType": null
                    }
                  },
                  "defaultValue": null
                },
                {
                  "name": "text",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Message",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addMessageUser",
              "description": null,
              "args": [
                {
                  "name": "info",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "MessageUser",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addOrder",
              "description": null,
              "args": [
                {
                  "name": "info",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Order",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addOrderTask",
              "description": null,
              "args": [
                {
                  "name": "info",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "OrderTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addProduct",
              "description": null,
              "args": [
                {
                  "name": "info",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Product",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addProfile",
              "description": null,
              "args": [
                {
                  "name": "info",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "addUser",
              "description": null,
              "args": [
                {
                  "name": "info",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "assignDelivery",
              "description": null,
              "args": [
                {
                  "name": "driverId",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                },
                {
                  "name": "orderId",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Delivery",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeCustomer",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Customer",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeDelivery",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Delivery",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeDispatcher",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Dispatcher",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeDriver",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Driver",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeDriverTask",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "DriverTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeGoToHubTask",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "GoToHubTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeInventoryExchangeContract",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "InventoryExchangeContract",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeInventoryExchangeTask",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "InventoryExchange",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeMessage",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Message",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeMessageUser",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "MessageUser",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeOrder",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Order",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeOrderTask",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "OrderTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeProduct",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Product",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeProfile",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "removeUser",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateCustomer",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Customer",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateDelivery",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Delivery",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateDispatcher",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Dispatcher",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateDriver",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Driver",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateDriverTask",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "DriverTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateGoToHubTask",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "GoToHubTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateInventoryExchangeContract",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "InventoryExchangeContract",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateInventoryExchangeTask",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "InventoryExchange",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateMessage",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Message",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateMessageUser",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "MessageUser",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateOrder",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Order",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateOrderTask",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "OrderTask",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateProduct",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Product",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateProfile",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "Profile",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "updateUser",
              "description": null,
              "args": [
                {
                  "name": "id",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  },
                  "defaultValue": null
                }
              ],
              "type": {
                "kind": "OBJECT",
                "name": "User",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "INPUT_OBJECT",
          "name": "LocationInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "name": "coordinate",
              "description": null,
              "type": {
                "kind": "INPUT_OBJECT",
                "name": "CoordinateInput",
                "ofType": null
              },
              "defaultValue": null
            },
            {
              "name": "address",
              "description": null,
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "defaultValue": null
            }
          ],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "INPUT_OBJECT",
          "name": "CoordinateInput",
          "description": null,
          "fields": null,
          "inputFields": [
            {
              "name": "lon",
              "description": null,
              "type": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              },
              "defaultValue": null
            },
            {
              "name": "lat",
              "description": null,
              "type": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              },
              "defaultValue": null
            }
          ],
          "interfaces": null,
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "__Schema",
          "description": "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
          "fields": [
            {
              "name": "types",
              "description": "A list of all types supported by this server.",
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "LIST",
                  "name": null,
                  "ofType": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "OBJECT",
                      "name": "__Type",
                      "ofType": null
                    }
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "queryType",
              "description": "The type that query operations will be rooted at.",
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Type",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "mutationType",
              "description": "If this server supports mutation, the type that mutation operations will be rooted at.",
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "__Type",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "subscriptionType",
              "description": "If this server support subscription, the type that subscription operations will be rooted at.",
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "__Type",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "directives",
              "description": "A list of all directives supported by this server.",
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "LIST",
                  "name": null,
                  "ofType": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "OBJECT",
                      "name": "__Directive",
                      "ofType": null
                    }
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "__Type",
          "description": "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name and description, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
          "fields": [
            {
              "name": "kind",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "ENUM",
                  "name": "__TypeKind",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "fields",
              "description": null,
              "args": [
                {
                  "name": "includeDeprecated",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "Boolean",
                    "ofType": null
                  },
                  "defaultValue": "false"
                }
              ],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__Field",
                    "ofType": null
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "interfaces",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__Type",
                    "ofType": null
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "possibleTypes",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__Type",
                    "ofType": null
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "enumValues",
              "description": null,
              "args": [
                {
                  "name": "includeDeprecated",
                  "description": null,
                  "type": {
                    "kind": "SCALAR",
                    "name": "Boolean",
                    "ofType": null
                  },
                  "defaultValue": "false"
                }
              ],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__EnumValue",
                    "ofType": null
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "inputFields",
              "description": null,
              "args": [],
              "type": {
                "kind": "LIST",
                "name": null,
                "ofType": {
                  "kind": "NON_NULL",
                  "name": null,
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__InputValue",
                    "ofType": null
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "ofType",
              "description": null,
              "args": [],
              "type": {
                "kind": "OBJECT",
                "name": "__Type",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "ENUM",
          "name": "__TypeKind",
          "description": "An enum describing what kind of type a given `__Type` is.",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": [
            {
              "name": "SCALAR",
              "description": "Indicates this type is a scalar.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "OBJECT",
              "description": "Indicates this type is an object. `fields` and `interfaces` are valid fields.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "INTERFACE",
              "description": "Indicates this type is an interface. `fields` and `possibleTypes` are valid fields.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "UNION",
              "description": "Indicates this type is a union. `possibleTypes` is a valid field.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "ENUM",
              "description": "Indicates this type is an enum. `enumValues` is a valid field.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "INPUT_OBJECT",
              "description": "Indicates this type is an input object. `inputFields` is a valid field.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "LIST",
              "description": "Indicates this type is a list. `ofType` is a valid field.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "NON_NULL",
              "description": "Indicates this type is a non-null. `ofType` is a valid field.",
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "__Field",
          "description": "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
          "fields": [
            {
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "args",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "LIST",
                  "name": null,
                  "ofType": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "OBJECT",
                      "name": "__InputValue",
                      "ofType": null
                    }
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "type",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Type",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "isDeprecated",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "deprecationReason",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "__InputValue",
          "description": "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
          "fields": [
            {
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "type",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Type",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "defaultValue",
              "description": "A GraphQL-formatted string representing the default value for this input value.",
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "__EnumValue",
          "description": "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
          "fields": [
            {
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "isDeprecated",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "deprecationReason",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "OBJECT",
          "name": "__Directive",
          "description": "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
          "fields": [
            {
              "name": "name",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "description",
              "description": null,
              "args": [],
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "locations",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "LIST",
                  "name": null,
                  "ofType": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "ENUM",
                      "name": "__DirectiveLocation",
                      "ofType": null
                    }
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "args",
              "description": null,
              "args": [],
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "LIST",
                  "name": null,
                  "ofType": {
                    "kind": "NON_NULL",
                    "name": null,
                    "ofType": {
                      "kind": "OBJECT",
                      "name": "__InputValue",
                      "ofType": null
                    }
                  }
                }
              },
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "inputFields": null,
          "interfaces": [],
          "enumValues": null,
          "possibleTypes": null
        },
        {
          "kind": "ENUM",
          "name": "__DirectiveLocation",
          "description": "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
          "fields": null,
          "inputFields": null,
          "interfaces": null,
          "enumValues": [
            {
              "name": "QUERY",
              "description": "Location adjacent to a query operation.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "MUTATION",
              "description": "Location adjacent to a mutation operation.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "SUBSCRIPTION",
              "description": "Location adjacent to a subscription operation.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "FIELD",
              "description": "Location adjacent to a field.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "FRAGMENT_DEFINITION",
              "description": "Location adjacent to a fragment definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "FRAGMENT_SPREAD",
              "description": "Location adjacent to a fragment spread.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "INLINE_FRAGMENT",
              "description": "Location adjacent to an inline fragment.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "VARIABLE_DEFINITION",
              "description": "Location adjacent to a variable definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "SCHEMA",
              "description": "Location adjacent to a schema definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "SCALAR",
              "description": "Location adjacent to a scalar definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "OBJECT",
              "description": "Location adjacent to an object type definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "FIELD_DEFINITION",
              "description": "Location adjacent to a field definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "ARGUMENT_DEFINITION",
              "description": "Location adjacent to an argument definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "INTERFACE",
              "description": "Location adjacent to an interface definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "UNION",
              "description": "Location adjacent to a union definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "ENUM",
              "description": "Location adjacent to an enum definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "ENUM_VALUE",
              "description": "Location adjacent to an enum value definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "INPUT_OBJECT",
              "description": "Location adjacent to an input object type definition.",
              "isDeprecated": false,
              "deprecationReason": null
            },
            {
              "name": "INPUT_FIELD_DEFINITION",
              "description": "Location adjacent to an input object field definition.",
              "isDeprecated": false,
              "deprecationReason": null
            }
          ],
          "possibleTypes": null
        }
      ],
      "directives": [
        {
          "name": "include",
          "description": "Directs the executor to include this field or fragment only when the `if` argument is true.",
          "locations": [
            "FIELD",
            "FRAGMENT_SPREAD",
            "INLINE_FRAGMENT"
          ],
          "args": [
            {
              "name": "if",
              "description": "Included when true.",
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "defaultValue": null
            }
          ]
        },
        {
          "name": "skip",
          "description": "Directs the executor to skip this field or fragment when the `if` argument is true.",
          "locations": [
            "FIELD",
            "FRAGMENT_SPREAD",
            "INLINE_FRAGMENT"
          ],
          "args": [
            {
              "name": "if",
              "description": "Skipped when true.",
              "type": {
                "kind": "NON_NULL",
                "name": null,
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              },
              "defaultValue": null
            }
          ]
        },
        {
          "name": "deprecated",
          "description": "Marks an element of a GraphQL schema as no longer supported.",
          "locations": [
            "FIELD_DEFINITION",
            "ENUM_VALUE"
          ],
          "args": [
            {
              "name": "reason",
              "description": "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/).",
              "type": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              },
              "defaultValue": "\"No longer supported\""
            }
          ]
        }
      ]
    }
}

for(var i = 0, sl = schema.__schema.types.length; i < sl; i++) {
    let type = schema.__schema.types[i];
    if(type.kind === "OBJECT" && type.name[0] != '_' && type.name != 'RootQueryType' && type.name != 'Mutation') {
        console.dir(type);
        console.log(`
        function conditionallyCreate${type.name}Table(connection) {
          const createTableSQL = 'CREATE TABLE IF NOT EXISTS ${type.name.toLowerCase()} (`);
        for(var j = 0, tfl = type.fields.length; j < tfl; j++){
          console.log('\t\t\t' + type.fields[j].name + '\t' + 'SOME-TYPE' + (j == tfl.length - 1 ? '': ','));
        }
        console.log('\t\t\tPRIMARY KEY(id));');
        console.log('\t\t  return executeSQL(connection, createTableSQL)');
        console.log('\t\t}')
    }
}