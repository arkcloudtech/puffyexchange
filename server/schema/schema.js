const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const _ = require('lodash');

// bring in models
const User = require('../models/user');
const Driver = require('../models/driver');
const Dispatcher = require('../models/dispatcher');
const DriverTask = require('../models/drivertask');
const InventoryExchangeTask = require('../models/inventoryexchangetask');
const GoToHubTask = require('../models/gotohubtask');
const OrderTask = require('../models/ordertask');
const Product = require('../models/product');
const Order = require('../models/order');
const Customer = require('../models/customer');
const Message = require('../models/message');
const InventoryExchangeContract = require('../models/inventoryexchangecontract');
const MessageUser = require('../models/messageuser');
const Profile = require('../models/profile');

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

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
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

const DispatcherType = new GraphQLObjectType({
    name: 'Dispatcher',
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

const DriverTaskType = new GraphQLObjectType({
    name: 'DriverTask',
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

const GoToHubTaskType = new GraphQLObjectType({
    name: 'GoToHubTask',
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

const InventoryExchangeContractType = new GraphQLObjectType({
    name: 'InventoryExchangeContract',
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

const InventoryExchangeTaskType = new GraphQLObjectType({
    name: 'InventoryExchange',
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

const MessageType = new GraphQLObjectType({
    name: 'Message',
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

const MessageUserType = new GraphQLObjectType({
    name: 'MessageUser',
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

const OrderType = new GraphQLObjectType({
    name: 'Order',
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

const OrderTaskType = new GraphQLObjectType({
    name: 'OrderTask',
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

const ProductType = new GraphQLObjectType({
    name: 'Product',
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

const ProfileType = new GraphQLObjectType({
    name: 'Profile',
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

const UserType = new GraphQLObjectType({
    name: 'User',
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
        customer: {
            type: CustomerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        delivery: {
            type: DeliveryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        dispatcher: {
            type: DispatcherType,
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
        drivertask: {
            type: DriverTaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        gotohub: {
            type: GoToHubTaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        inventoryexchangecontract: {
            type: InventoryExchangeContractType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        inventoryexchangetask: {
            type: InventoryExchangeTask,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        message: {
            type: MessageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        messageuser: {
            type: MessageUserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        order: {
            type: OrderType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        ordertask: {
            type: OrderTaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        profile: {
            type: ProfileType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get deliveries
                return _.find(deliveries, { id: args.id });
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args) {
                return drivers
            }
        },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return drivers
            }
        },
        dispatchers: {
            type: new GraphQLList(DispatcherType),
            resolve(parent, args) {
                return drivers
            }
        },
        drivers: {
            type: new GraphQLList(DriverType),
            resolve(parent, args) {
                return drivers
            }
        },
        drivertasks: {
            type: new GraphQLList(DriverTaskType),
            resolve(parent, args) {
                return drivers
            }
        },
        gotohubtasks: {
            type: new GraphQLList(GoToHubTaskType),
            resolve(parent, args) {
                return drivers
            }
        },
        inventoryexchangecontracts: {
            type: new GraphQLList(InventoryExchangeContractType),
            resolve(parent, args) {
                return drivers
            }
        },
        inventoryexchanges: {
            type: new GraphQLList(InventoryExchangeTaskType),
            resolve(parent, args) {
                return drivers
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve(parent, args) {
                return drivers
            }
        },
        messageusers: {
            type: new GraphQLList(MessageUserType),
            resolve(parent, args) {
                return drivers
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args) {
                return drivers
            }
        },
        ordertask: {
            type: new GraphQLList(OrderTaskType),
            resolve(parent, args) {
                return drivers
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return drivers
            }
        },
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve(parent, args) {
                return drivers
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return deliveries
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