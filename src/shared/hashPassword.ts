import bcrypt from 'bcrypt';
import config from '../config';

export const hashedPassword = async (password: string) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );
  return hashedPassword;
};
