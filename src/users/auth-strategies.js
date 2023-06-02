const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./users-model');
const { InvalidArgumentError } = require('../errors');

const bcrypt = require('bcrypt');

function verifyUser(user){
    if(!user){
        throw new InvalidArgumentError('Does not exist user with this email');
    }
}

async function verifyPassword(password, passwordHash){
    const validPassword = await bcrypt.compare(password, passwordHash);

    if(!validPassword){
        throw new InvalidArgumentError('Invalid email or password');
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, async (email, password, done) => {
        try {
            const user = await User.getByEmail(email);
            verifyUser(user);
            await verifyPassword(password, user.passwordHash);

            done(null, user);
        } catch (error) {
            done(error);
        }
    })
)