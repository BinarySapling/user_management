export class CreateUserDto {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    validate() {
        const errors = [];

        // Validate name
        if (!this.name || typeof this.name !== 'string') {
            errors.push('Name is required and must be a string');
        } else if (this.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        } else if (this.name.trim().length > 50) {
            errors.push('Name must not exceed 50 characters');
        }

        // Validate email
        if (!this.email || typeof this.email !== 'string') {
            errors.push('Email is required and must be a string');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.email)) {
                errors.push('Email must be a valid email address');
            }
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// Middleware function to validate create user request
export const validateCreateUserDto = (req, res, next) => {
    const { name, email } = req.body;
    
    const dto = new CreateUserDto(name, email);
    const validation = dto.validate();

    if (!validation.isValid) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: validation.errors
        });
    }

    next();
};



