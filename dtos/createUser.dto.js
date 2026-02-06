export class CreateUserDto {
    constructor(name, email, password, role, isActive) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
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

        // Validate password
        if (!this.password || typeof this.password !== 'string') {
            errors.push('Password is required and must be a string');
        } else if (this.password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        } else if (this.password.length > 100) {
            errors.push('Password must not exceed 100 characters');
        }

        // Validate role (optional)
        if (this.role && !['user', 'admin', 'moderator'].includes(this.role.toLowerCase())) {
            errors.push('Role must be one of: user, admin, moderator');
        }

        // Validate isActive (optional)
        if (this.isActive !== undefined && typeof this.isActive !== 'boolean') {
            errors.push('isActive must be a boolean value');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// Middleware function to validate create user request
export const validateCreateUserDto = (req, res, next) => {
    const { name, email, password, role, isActive } = req.body;
    
    const dto = new CreateUserDto(name, email, password, role, isActive);
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



