const program = require('commander');
const inquirer = require('inquirer');

const {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
} = require('./index');


const questions = [{
        type: 'input',
        name: 'firstname',
        message: 'Customer First Name'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Customer Last Name'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Customer Phone'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Customer Email'
    }
]

const updateQuestion = [{
    type: 'input',
    name: '_id',
    message: 'Enter customer ID to update'
}].concat(questions);

program
    .version('1.0.0')
    .description('Client Management System')

program
    .command('add')
    .alias('a')
    .description('Add a customer')
    .action(() => {
        inquirer.prompt(questions).then((answers) => addCustomer(answers));
    })


program
    .command('find')
    .alias('f')
    .description('Find a customer')
    .action(() => {
        inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'Enter candidate FirstName/LastName'
        }]).then((answer) => findCustomer(answer));
    })

program
    .command('list')
    .alias('l')
    .description('List all customers')
    .action(() => {
        listCustomers();
    })

program
    .command('update')
    .alias('u')
    .description('Update a customer')
    .action(() => {
        inquirer.prompt(updateQuestion).then((answer) => {
            updateCustomer(answer._id, { firstname: answer.firstname, lastname: answer.lastname, phone: answer.phone, email: answer.email });
        })
    })


program.parse(process.argv);