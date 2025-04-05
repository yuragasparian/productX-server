import bcrypt, { hash } from 'bcryptjs';

const createHashedPassword = async (password:string) => {
    const salt = await bcrypt.genSalt(5);
    const pass = await bcrypt.hash(password, salt);
    console.log(pass);
}

createHashedPassword("admin")


export default createHashedPassword