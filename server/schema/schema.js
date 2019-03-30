const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const _ = require('lodash');
const Delivery = require('../models/delivery');
const Driver = require('../models/driver');

// dummy data
var deliveries = [
    { id: "1", summary: "summary 1", order: "order 1 name", dispatcher: "dispather 1 name", driverId: "2" },
    { id: "2", summary: "summary 2", order: "order 2 name", dispatcher: "dispather 2 name", driverId: "4" },
    { id: "3", summary: "summary 3", order: "order 3 name", dispatcher: "dispather 3 name", driverId: "1" },
    { id: "4", summary: "summary 4", order: "order 4 name", dispatcher: "dispather 4 name", driverId: "3" },
    { id: "5", summary: "summary 5", order: "order 5 name", dispatcher: "dispather 5 name", driverId: "1" },
];

var drivers = [
    { id: "1", name: "driver 1 name", location: "33.88321 -117.00399", deliveryId: "3" },
    { id: "2", name: "driver 2 name", location: "33.88321 -117.00399", deliveryId: "1" },
    { id: "3", name: "driver 3 name", location: "33.88321 -117.00399", deliveryId: "4" },
    { id: "4", name: "driver 4 name", location: "33.88321 -117.00399", deliveryId: "2" }
];

const DeliveryType = new GraphQLObjectType({
    name: 'Delivery',
    fields: () => ({
        id: { type: GraphQLID },
        order: { type: GraphQLString },
        dispatcher: { type: GraphQLString },
        driver: {
            type: DriverType,
            resolve(parent, args) {
                return _.find(drivers, { id: parent.driverId });
            }
        }
    })
});

const DriverType = new GraphQLObjectType({
    name: 'Driver',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return _.filter(deliveries, { driverId: parent.id })
            }
        },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        delivery: {
            type: DeliveryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        driver: {
            type: DriverType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get drivers
                return _.find(drivers, { id: args.id });
            }
        },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return deliveries
            }
        },
        drivers: {
            type: new GraphQLList(DriverType),
            resolve(parent, args) {
                return drivers
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDriver: {
            type: DriverType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let driver = new Driver({
                    name: args.name,
                    location: args.location
                });
                return driver.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});