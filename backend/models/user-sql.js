import { db } from "../database/mysql.js";
import { User } from "./user.js";

export async function getAll() {
    const [allUserResults] = await db.query("SELECT * FROM users")


    return await allUserResults.map((userResult) => 
        User(
            userResult.id?.toString() ?? '',
            userResult.email,
            userResult.password,
            userResult.role,
            userResult.phone,
            userResult.first_name,
            userResult.last_name,
            userResult.address,
            userResult.authentication_key,
        )
        
    )
}

export async function getByID(userID) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE user_id = ?", userID
    )

    if (userResults.length > 0) {
        const userResult = userResults[0]
        return Promise.resolve(
            User(
                userResult.id.toString(),
                userResult.email,
                userResult.password,
                userResult.role,
                userResult.phone,
                userResult.first_name,
                userResult.last_name,
                userResult.address,
                userResult.authentication_key,
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByEmail(email) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE user_email = ?", email
    )

    if (userResults.length > 0) {
        const userResult = userResults[0]
        return Promise.resolve(
            User(
                userResult.id.toString(),
                userResult.email,
                userResult.password,
                userResult.role,
                userResult.phone,
                userResult.first_name,
                userResult.last_name,
                userResult.address,
                userResult.authentication_key,
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function getByAuthenticationKey(authenticationKey) {
    const [userResults] = await db.query(
        "SELECT * FROM users WHERE authentication_key = ?", authenticationKey
    )

    if (userResults.length > 0) {
        const userResult = userResults[0]
        return Promise.resolve(
            User(
                userResult.id.toString(),
                userResult.email,
                userResult.password,
                userResult.role,
                userResult.phone,
                userResult.first_name,
                userResult.last_name,
                userResult.address,
                userResult.authentication_key,
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}
export async function create(user) {
    delete user.id;

    return db.query(
        "INSERT INTO users (email, password, role, phone, firstName, lastName, address) " 
        + "VALUES (?, ?, ?, ?, ?, ?, ?);", // added semicolon and changed "VALUE" to "VALUES"
        [
            user.email,
            user.password,
            user.role,
            user.phone,
            user.firstName,
            user.lastName,
            user.address
        ]
    ).then(([result]) => {
        return { ...user, id: result.insertId };
    });
}



export async function update(user) {
    return db.query(
        "UPDATE users SET "
        + "user_email = ?, "
        + "user_password = ?, "
        + "user_role = ?, "
        + "user_phone = ?, "
        + "user_firstname = ?, "
        + "user_lastname = ?, "
        + "user_address =? ,"
        + "authentication_key = ? "
        + "WHERE id = ?",
        [
            user.email,
            user.password,
            user.role,
            user.phone,
            user.first_name,
            user.last_name,
            user.address,
            user.authenticationKey,
            user.id
        ]
    ).then(([result]) => {
        return { ...user, id: result.insertId }
    })
}

export async function deleteByID(userID) {
    return db.query("DELETE FROM users WHERE user_id = ?", userID)
}
