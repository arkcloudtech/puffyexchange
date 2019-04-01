const graphql = require('graphql');
const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLBoolean, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLFloat, 
    GraphQLInt, 
    GraphQLList, 
    GraphQLNonNull,
    GraphQLInputObjectType
} = graphql;
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
const OrderProduct = require('../models/orderProducts');
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

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        coordinate: { type: CoordinateType },
        address: { type: GraphQLString }
    })
});

const LocationInputType = new GraphQLInputObjectType({
    name: 'LocationInput',
    fields: () => ({
        coordinate: { type: CoordinateInputType },
        address: { type: GraphQLString }
    })
});

const CoordinateType = new GraphQLObjectType({
    name: 'Coordinate',
    fields: () => ({
        lon: { type: GraphQLFloat },
        lat: { type: GraphQLFloat }
    })
});

const CoordinateInputType = new GraphQLInputObjectType({
    name: 'CoordinateInput',
    fields: () => ({
        lon: { type: GraphQLFloat },
        lat: { type: GraphQLFloat }
    })
});

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        idUrl: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        }
    })
});

const DeliveryType = new GraphQLObjectType({
    name: 'Delivery',
    fields: () => ({
        id: { type: GraphQLID },
        summary: { type: GraphQLString },
        order: {
            type: OrderType,
            resolve(parent, args) {
                return Order.findById(parent.orderId);
            }
        },
        deliveryLocation: { type: LocationType },
        dispatcher: {
            type: DispatcherType,
            resolve(parent, args){
                return Dispatcher.findById(parent.dispatcherId)
            }
        },
        driver: {
            type: DriverType,
            resolve(parent, args){
                return Driver.findById(parent.driverId)
            }
        },
    })
});

const DispatcherType = new GraphQLObjectType({
    name: 'Dispatcher',
    fields: () => ({
        id: { type: GraphQLID },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById( parent.userId );
            }
        },
        location: { type: LocationType },
        orders: { 
            type: new GraphQLList(OrderType), 
            resolve(parent, args){
                Order.find({})
                    .where('_id')
                    .in(deliveries.find({ 
                        dispatcherId: mongoose.Types.ObjectId(parent.id) 
                    }))
                    .exec();
            }
        },
        drivers: { 
            type: new GraphQLList(DriverType), 
            resolve(parent, args){
                Driver.find({})
                    .where('_id')
                    .in(deliveries.find({ 
                        dispatcherId: mongoose.Types.ObjectId({ dispatcherId: parent.id }) 
                    })) 
                    .exec();
            }
        }
    })
});

const DriverType = new GraphQLObjectType({
    name: 'Driver',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: LocationType },
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
        location: { type: LocationType },
        taskNum: { type: GraphQLInt }
    })
});

const GoToHubTaskType = new GraphQLObjectType({
    name: 'GoToHubTask',
    fields: () => ({
        id: { type: GraphQLID },
        task: { 
            type: DriverTaskType,
            resolve(parent, args) {
                return DriverTask.findById(parent.driverTaskId);
            }
        }
    })
});

const InventoryExchangeContractType = new GraphQLObjectType({
    name: 'InventoryExchangeContract',
    fields: () => ({
        id: { type: GraphQLID },
        senderId: { type: GraphQLID },
        recipientId: { type: GraphQLID },
        signatureA: { type: GraphQLString },
        signatureB: { type: GraphQLString }
    })
});

const InventoryExchangeTaskType = new GraphQLObjectType({
    name: 'InventoryExchange',
    fields: () => ({
        id: { type: GraphQLID },
        task: { 
            type: DriverTaskType,
            resolve(parent, args) {
                return DriverTask.findById(parent.driverTaskId);
            }
        },
        otherDriver: { 
            type: DriverType,
            resolve(parent, args){
                return Driver.findById(parent.otherDriverId);
            }
        }
    })
});

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: GraphQLString },
        time: { type: GraphQLString },
        isRead: { type: GraphQLBoolean },
        messageOwner: {
            type: UserType,
            resolve(parent, args) {
                return Users.findById(parent.messageOwnerId);
            }
        },
    })
});

const MessageUserType = new GraphQLObjectType({
    name: 'MessageUser',
    fields: () => ({
        id: { type: GraphQLID },
        user: {
            type: UserType,
            resolve(parent, args) {
                return Users.findById(parent.messageUserId);
            }
        },
        messageUser: {
            type: UserType,
            resolve(parent, args) {
                return Users.findById(parent.messageUserId);
            }
        },
        profileId: { type: GraphQLString }
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLID },
        customer: { 
            type: CustomerType,
            resolve(parent, args){
                return Customer.findById( parent.customerId );
            }
        },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                let deliveries = Delivery.find({
                    '_id': { $in: Delivery.find({ orderId: parent.id }) }
                }, function(err, docs){
                     console.log(docs);
                });
                return deliveries;
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                let products = Product.find({
                    'productId': { $in: OrderProduct.find({ orderId: parent.id }) }
                }, function(err, docs){
                     console.log(docs);
                });
                return products;
            }
        },
    })
});

const OrderTaskType = new GraphQLObjectType({
    name: 'OrderTask',
    fields: () => ({
        id: { type: GraphQLID },
        summary: { type: GraphQLString },
        task: { 
            type: DriverTaskType,
            resolve(parent, args) {
                return DriverTask.findById(parent.driverTaskId);
            }
        },
    })
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        imageUrl: { type: GraphQLString },
    })
});

const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: GraphQLID },
        user: { 
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId);
            }
        },
        description: { type: GraphQLString },
        imageUrl: { type: GraphQLString }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        isActive: { type: GraphQLBoolean }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Customer.findById(args.id);
            }
        },
        delivery: {
            type: DeliveryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return delivery.findById(args.id);
            }
        },
        dispatcher: {
            type: DispatcherType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Dispatcher.findById(args.id);
            }
        },
        driver: {
            type: DriverType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Driver.findById(args.id);
            }
        },
        drivertask: {
            type: DriverTaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return DriverTask.findById(args.id);
            }
        },
        gotohubtask: {
            type: GoToHubTaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return GoToHubTask.findById(args.id);
            }
        },
        inventoryexchangecontract: {
            type: InventoryExchangeContractType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return InventoryExchangeContract.findById(args.id);
            }
        },
        inventoryexchangetask: {
            type: InventoryExchangeTaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return InventoryExchangeTask.findById(args.id);
            }
        },
        message: {
            type: MessageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Message.findById(args.id);
            }
        },
        messageuser: {
            type: MessageUserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return MessageUser.findById(args.id);
            }
        },
        order: {
            type: OrderType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Order.findById(args.id);
            }
        },
        ordertask: {
            type: OrderTaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return OrderTask.findById(args.id);
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Product.findById(args.id);
            }
        },
        profile: {
            type: ProfileType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Profile.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args) {
                return Customer.find({});
            }
        },
        deliveries: {
            type: new GraphQLList(DeliveryType),
            resolve(parent, args) {
                return Delivery.find({});
            }
        },
        dispatchers: {
            type: new GraphQLList(DispatcherType),
            resolve(parent, args) {
                return Dispatcher.find({});
            }
        },
        drivers: {
            type: new GraphQLList(DriverType),
            resolve(parent, args) {
                return Driver.find({});
            }
        },
        drivertasks: {
            type: new GraphQLList(DriverTaskType),
            resolve(parent, args) {
                return DriverTask.find({});
            }
        },
        gotohubtasks: {
            type: new GraphQLList(GoToHubTaskType),
            resolve(parent, args) {
                return GoToHubTask.find({});
            }
        },
        inventoryexchangecontracts: {
            type: new GraphQLList(InventoryExchangeContractType),
            resolve(parent, args) {
                return InventoryExchangeContract.find({});
            }
        },
        inventoryexchangetasks: {
            type: new GraphQLList(InventoryExchangeTaskType),
            resolve(parent, args) {
                return InventoryExchangeTask.find({});
            }
        },
        messages: {
            type: new GraphQLList(MessageType),
            resolve(parent, args) {
                return Message.find({});
            }
        },
        messageusers: {
            type: new GraphQLList(MessageUserType),
            resolve(parent, args) {
                return MessageUser.find({});
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args) {
                return Order.find({});
            }
        },
        ordertask: {
            type: new GraphQLList(OrderTaskType),
            resolve(parent, args) {
                return OrderTask.find({});
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({});
            }
        },
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve(parent, args) {
                return Profile.find({});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: GraphQLString }
            },
            resolve(parent, args) {
                let customer = new Customer({
                    name: args.name,
                    phone: args.phone
                });
                return customer.save();
            }
        },
        addDelivery: {
            type: DeliveryType,
            args: {
                orderId: { type: new GraphQLNonNull(GraphQLString) },
                deliveryLocation: { type: new GraphQLNonNull(LocationInputType) }
            },
            resolve(parent, args) {
                let delivery = new Delivery({
                    orderId: args.orderId,
                    deliveryLocation: args.deliveryLocation
                });
                return delivery.save();
            }
        },
        addDispatcher: {
            type: DispatcherType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let dispatcher = new Dispatcher({
                    userId: args.userId
                });
                return dispatcher.save();
            }
        },
        addDriver: {
            type: DriverType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(LocationInputType) }
            },
            resolve(parent, args) {
                let driver = new Driver({
                    userId: args.userId,
                    location: args.location
                });
                return driver.save();
            }
        },
        addDriverTask: {
            type: DriverTaskType,
            args: {
                info: { type: GraphQLString }
            },
            resolve(parent, args) {
                let driverTask = new DriverTask({
                    name: args.name,
                    location: args.location
                });
                return driverTask.save();
            }
        },
        addGoToHubTask: {
            type: GoToHubTaskType,
            args: {
                info: { type: GraphQLString }
            },
            resolve(parent, args) {
                let goToHubTask = new GoToHubTask({
                    name: args.name,
                    location: args.location
                });
                return goToHubTask.save();
            }
        },
        addInventoryExchangeContract: {
            type: InventoryExchangeContractType,
            args: {
                info: { type: GraphQLString }
            },
            resolve(parent, args) {
                let inventoryExchangeContract = new InventoryExchangeContract({
                    name: args.name,
                    location: args.location
                });
                return inventoryExchangeContract.save();
            }
        },
        addInventoryExchangeTask: {
            type: InventoryExchangeTaskType,
            args: {
                info: { type: GraphQLString }
            },
            resolve(parent, args) {
                let inventoryExchangeTask = new InventoryExchangeTask({
                    name: args.name,
                    location: args.location
                });
                return inventoryExchangeTask.save();
            }
        },
        addMessage: {
            type: MessageType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLString) },
                imageUrl: { type: GraphQLString },
                time: { type: new GraphQLNonNull(GraphQLString) },
                text: { type: GraphQLString },
            },
            resolve(parent, args) {
                let message = new Message({
                    userId: args.userId,
                    imageUrl: args.location,
                    time: args.time,
                    text: args.text
                });
                return message.save();
            }
        },
        addMessageUser: {
            type: MessageUserType,
            args: {
                info: { type: GraphQLString }
            },
            resolve(parent, args) {
                let messageUser = new MessageUser({
                    name: args.name,
                    location: args.location
                });
                return messageUser.save();
            }
        },
        addOrder: {
            type: OrderType,
            args: {
                info: { type: GraphQLString }
            },
            resolve(parent, args) {
                let order = new Order({
                    name: args.name,
                    location: args.location
                });
                return order.save();
            }
        },
        addOrderTask: {
            type: OrderTaskType,
            args: {
                info: { type: GraphQLString }
            },
            resolve(parent, args) {
                let orderTask = new OrderTask({
                    name: args.name,
                    location: args.location
                });
                return orderTask.save();
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                info: { type: GraphQLString }
            },
            resolve(parent, args) {
                let product = new Product({
                    name: args.name,
                    location: args.location
                });
                return product.save();
            }
        },
        addProfile: {
            type: ProfileType,
            args: {
                info: { type: GraphQLString }
            },
            resolve(parent, args) {
                let profile = new Profile({
                    name: args.name,
                    location: args.location
                });
                return profile.save();
            }
        },
        addUser: {
            type: UserType,
            args: {
                info: { type: GraphQLString }
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    location: args.location
                });
                return user.save();
            }
        },
        assignDelivery: {
            type: DeliveryType,
            args: {
                driverId: { type: GraphQLID },
                orderId: { type: GraphQLID }
            },
            resolve(parent, args){
                let delivery = new Delivery({
                    driverId: args.driverId,
                    location: args.location
                });
                return delivery.save();
            }
        },/*
        signInventoryExchangeContract:  {
            type: InventoryExchangeContractType,
            args: {
                inventoryExchangeTaskId: { GraphQLID },                
                driverId: { type: GraphQLID },
                signature: { type: GraphQLString }
            }, 
            resolve(parent, args) {
                let inventoryExchangeContract = new InventoryExchangeContract({
                    inventoryExchangeTaskId: args.inventoryExchangeTaskId,
                    signatureA: args.signature,
                    signatureB: args.signature,
                    recipientId: driverId,
                    valid: true
                });
                return inventoryExchangeContract.save(); 
            }
        }*/
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});