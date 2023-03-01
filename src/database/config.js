const { Client } = require('pg')

const dbQuery = async (query) => {

    try {

        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'ecommerce',
            password: 'Hisoka98',
            port: 5432,
        })

        await client.connect();

        const result = await client.query(query);
    
        await client.end();
    
        return result;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}

module.exports = {
    dbQuery
}