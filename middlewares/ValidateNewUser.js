const { User } = require("../models")

module.exports = async (req, res, next) => {

    const { email, phone, password } = req.body;

    let errors = [];
    let regex;

    // CHECK IF IT'S INDEED A NEW USER
    const invalidEmail = await User.findOne({ where: { email } });
    if (invalidEmail) {
        errors.push(`O email ${email} já está cadastrado.`);
    }

    // CHECK EMAIL FORMAT
    // ...

    // CHECK PHONE FORMAT
    if (phone.length < 15) {
        errors.push(`O número de telefone ${phone} está incompleto.`);
    }
    // VALIDATE PASSWORD
    if (password.length < 8) {
        errors.push("A senha deve conter pelo menos 8 caracteres.");
    }
    regex = /[0-9]/;
    if (!regex.test(password)) {
        errors.push("A senha deve conter pelo menos 1 dígito.");
    }
    regex = /[a-z]/;
    if (!regex.test(password)) {
        errors.push("A senha deve conter pelo menos 1 letra minúscula.");
    }
    regex = /[A-Z]/;
    if (!regex.test(password)) {
        errors.push("A senha deve conter pelo menos 1 letra maiúscula.");
    }

    // THROW EVENTUAL ERRORS
    if (errors.length > 0) {
        return res.render("register-teacher", { errors });
    }

    next();
}