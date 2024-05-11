import bcrypt from 'bcrypt'

// * hashing the password with non reverseable hashing algorithm
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

export const verifyPassword = async (
    hashedPassword: string,
    password: string,
) => {
    const isVerified = await bcrypt.compare(password, hashedPassword)
    return isVerified
}
