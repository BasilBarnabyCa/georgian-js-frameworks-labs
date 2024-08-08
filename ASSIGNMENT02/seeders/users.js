const bcrypt = require('bcrypt');
const airlineDataset = require('./airlines');

const saltRounds = 10;

const hashPasswords = async (airlines) => {
    const hashedAirlines = await Promise.all(
        airlines.map(async (airline) => {
            const hashedPassword = await bcrypt.hash(airline.iata, saltRounds);
            return { name: airline.name, email: `agent@${airline.iata.toLowerCase()}.com`, username: airline.iata, password: hashedPassword, role: "Agent" };
        })
    );
    return hashedAirlines;
};

const generateUsers = async () => {
    try {
        const users = [
            { name: "Administrator", username: "admin", email: "admin@email.com", password: await bcrypt.hash("admin", saltRounds), role: "Admin" },
            { name: "John Doe", username: "user", email: "user@email.com", password: await bcrypt.hash("user", saltRounds), role: "User" }
        ];
        const airlineUsers = await hashPasswords(airlineDataset);
        return users.concat(airlineUsers);
    } catch (error) {
        console.error(error);
        return [];
    }
};

module.exports = generateUsers;