import bcrypt from "bcryptjs";

const createHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(5);
  const pass = await bcrypt.hash(password, salt);
  return pass;
};

export default createHashedPassword;
