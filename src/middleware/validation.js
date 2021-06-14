const joi = require('joi');

const userValidation = data => {
    const schema = joi.object({
        email: joi.string()
            .max(255)
            .required()
            .email(),
        password: joi.string()
            .min(6)
            .max(255)
            .required(),
		role: joi.string()
			.valid('user', 'student', 'administrator')
    });
    return schema.validate(data);
};

const lessonValidation = data => {
    const schema = joi.object({
        title: joi.string()
            .max(255)
            .required(),
        description: joi.string()
            .required(),
		video: joi.string()
            .required(),
    });
    return schema.validate(data);
}

module.exports.userValidation = userValidation;
module.exports.lessonValidation = lessonValidation;