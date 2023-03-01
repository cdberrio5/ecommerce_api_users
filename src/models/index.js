const db = require("./../database/config");

const nodemailer = require("./../helpers/nodemailer");
const htmlTemplate = require("../templates/templates");

const random = require("./../helpers/random");

const login = async (email, password) => {
    try {
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!email) {
            throw("email is required");
        }     
        
        if(!password) {
            throw("password is required");
        }    

        if (!emailReg.test(email)) {
            throw("email is not valid");
        }

        if (!password.length > 8) {
            throw("password is not valid");
        }

        const query = `SELECT * FROM users where email = '${email}' AND password = crypt('${password}', password) limit 1`;

        const result = await db.dbQuery(query);

        if(result.rows.length == 0) {
            throw("Email or password are incorrect");
        }

        const data = result.rows[0];

        if(data.UUID_store) {
            const queryStore = `SELECT * FROM stores where "UUID" = '${data.UUID_store}' limit 1`;

            const resultStore = await db.dbQuery(queryStore);

            if(result.rows.length > 0) {
                var store = resultStore.rows[0];
            }
        }

        if(parseInt(data.state) == 2) {
            throw("The account was not activated, please activate the account from your mail");
        }

        const out = {
            success: true,
            data: {
                user: data,
                store: store ? store : {}
            }
        }

        return out;
    } catch (error) {
        const out = {
            success: false,
            error: error
        }

        return out;
    }
}

const register = async (email, password, uuid_rol, name, lastName, phone) => {
    try {

        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!email) {
            throw("email is required");
        }     
        
        if(!password) {
            throw("password is required");
        }    

        if (!emailReg.test(email)) {
            throw("email is not valid");
        }

        if (!password.length > 8) {
            throw("password is not valid");
        }

        if(!name) {
            throw("name is required");
        }

        if(!lastName) {
            throw("last name is required");
        }

        if(!phone) {
            throw("phone is required");
        }

        const validate = `SELECT * FROM users where email = '${email}' limit 1`;

        const result = await db.dbQuery(validate);

        if(result.rows.length > 0) {
            throw("Email duplicated");
        }

        const queryInsert = `INSERT INTO public.users ("email", "password", "name", "last_name", "phone" ) values ('${email}', crypt('${password}', gen_salt('bf')), '${name}', '${lastName}', '${phone}') returning "UUID"`;

        const insert = await db.dbQuery(queryInsert);

        if(insert.rows.length == 0) {
            throw("Something went wrong");
        }

        const uuid = insert.rows[0].UUID;

        await nodemailer.sendEmail(email, "Confirmacion de cuenta", await htmlTemplate.htmlConfirm(uuid));

        const out = {
            success: true
        }

        return out;
    } catch (error) {
        console.log(error);
        const out = {
            success: false,
            error: error
        }

        return out;
    }
}

const validate = async(uuid) => {
    try {
        const validate = `Update users set state = '1' where "UUID" = '${uuid}'`;

        await db.dbQuery(validate);

        const out = {
            success: true
        }

        return out;
    } catch (error) {
        const out = {
            success: false,
            error: error
        }
        
        return out;
    }
}

const forgot = async(email) => {
    try {
        const query = `SELECT * FROM users WHERE email = '${email}' and state = '1'`;

        const result = await db.dbQuery(query);

        if(result.rows.length == 0) {
            throw("The account does not exist, validate your email and try again");
        }

        const code = random.randomStr();

        await nodemailer.sendEmail(email, "Recupera tu cuenta", await htmlTemplate.sendCode(code));

        const data = {
            uuid: result["rows"][0]["UUID"],
            code: code,
            success: true
        }

        return data;
    } catch (error) {
        console.log(error);
        const out = {
            success: false,
            error: error
        }
        
        return out;
    }
}

const restore = async(password, uuid) => {
    try {
        const query = `UPDATE users SET password = crypt('${password}', gen_salt('bf')) WHERE "UUID" = '${uuid}'`;
        
        await db.dbQuery(query);

        const out = {
            success: true
        }

        return out;

    } catch (error) {
        console.log(error);
        const out = {
            success: false,
            error: error
        }
        
        return out;
    }
}

module.exports = {
    login,
    register,
    validate,
    forgot,
    restore
}