import jwt from 'jsonwebtoken'

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    res.cookie('token', token, {
        maxaAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: 'strict',
        httpOnly: true,
    })

    return token
}

export default generateToken