const customValidator = (req, res, next) => {
    const { name, email, phone, age } = req.body;

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
        return res.status(400).json({ message: 'Name is required and must be at least 3 characters long.' });
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'A valid email is required.' });
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Phone must be a 10-digit number.' });
    }

    // Validate age (if provided)
    if (age !== undefined) {
        if (typeof age !== 'number' || age < 18 || age > 65) {
            return res.status(400).json({ message: 'Age must be a number between 18 and 65.' });
        }
    }

    // If all validations pass, proceed to the next middleware
    next();
};

module.exports = customValidator;
