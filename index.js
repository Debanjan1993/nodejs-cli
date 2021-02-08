const mongoose = require('mongoose');


//connect to database
mongoose.connect("mongodb://localhost:27017/customercli", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

//Import model

const Customer = require('./models/customer');


//Add Customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.log('Customer is created');
        db.close();
    })
}


//Find Customer
const findCustomer = (name) => {
    //Make case insensitive
    const search = new RegExp(name, 'i');
    Customer.find({ $or: [{ firstname: search }, { lastname: search }] })
        .then(customers => {
            console.log(customers);
            console.log(`${customers.length} matches`);
            db.close();
        })
}

//Update Customer
const updateCustomer = (_id, customer) => {
    Customer.updateOne({ _id }, customer)
        .then(customer => {
            console.log('Customer Updated');
            db.close();
        })
}

//Remove Customer
const removeCustomer = (_id) => {
    Customer.remove({ _id })
        .then(customer => {
            console.log('Customer removed');
            db.close();
        })
}

//List Customers
const listCustomers = () => {
    Customer.find()
        .then(customers => {
            console.log(customers);
            console.log(`${customers.length} matches`);
            db.close();
        })
}

module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}