import bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  saltOrRound?: string | number,
): Promise<string> {
  try {
    const defaultSalt = await bcrypt.genSalt(5);
    return bcrypt.hash(password, saltOrRound ?? defaultSalt);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

export function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
}
