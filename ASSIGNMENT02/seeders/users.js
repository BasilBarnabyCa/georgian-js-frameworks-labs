const mongoose = require("mongoose");
const User = require("../models/user");
const { faker } = require('@faker-js/faker');
const airlineDataset = require('./airlines');

const generateUsers = async () => {
    try {
		await User.deleteMany({});
		
        // Initialize an array to store users
        const users = [];

        // Register admin and regular user
        users.push(await User.register(new User({
            name: "Administrator",
            email: "admin@email.com",
            role: "Admin"
        }), "admin"));

        users.push(await User.register(new User({
            name: "John Doe",
            email: "user@email.com",
            role: "User"
        }), "user"));

        // Register airline agents
        for (let airline of airlineDataset) {
            users.push(await User.register(new User({
                name: airline.name,
                email: `agent@${airline.iata.toLowerCase()}.com`,
                role: "Agent"
            }), airline.iata));
        }

        // Register subscribers
        for (let i = 1; i <= 20; i++) {
            users.push(await User.register(new User({
                name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                email: faker.internet.email(),
                role: "Subscriber"
            }), faker.internet.password()));
        }

        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
};

module.exports = generateUsers;
