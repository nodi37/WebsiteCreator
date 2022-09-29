//https://www.npmjs.com/package/generate-password
const passwordConfig = {
    length: 10,
    numbers: true
};

const saltRounds = 10;

const jwtSecret = process.env.JWT_SECRET;

const authCookieConfig = {
    //domain: '.kolo22energetyk.radom.pl',
    //expires: new Date (Date.now() + 2592000000),
    signed: true,
    //secure: true,
    //httpOnly: true,
    //sameSite: "None"
}

const tokenConfig = {
    expiresIn: 2592000000
}

export {
    passwordConfig,
    saltRounds,
    jwtSecret,
    authCookieConfig,
    tokenConfig
}