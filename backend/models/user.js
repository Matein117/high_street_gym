export function User(
    id, 
    email, 
    password, 
    role, 
    phone, 
    firstName, 
    lastName, 
    address, 
    authenticationKey
    ) {
    return {
        id,
        email,
        password,
        role,
        phone,
        firstName,
        lastName,
        address,
        authenticationKey
    }
}

// import { create } from "./user-sql.js"

// const newUser = User(null, "test", "abc123", "test", "1234", "test", "test", "test street")
// create(newUser).then(result => {
//     console.log(result)
// }).catch(error => {
//     console.log(error)
// })


