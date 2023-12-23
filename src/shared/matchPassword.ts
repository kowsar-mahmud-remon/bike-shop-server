import bcrypt from 'bcrypt';

export const matchPassword = async (
  newPassword: string,
  oldPassword: string
) => {
  // Match the password
  const matchPassword = await bcrypt.compare(newPassword, oldPassword);

  return matchPassword;
};
