const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, grade_level, excel_expertise } = req.body;

        if (!name || !email || !password || !grade_level || !excel_expertise) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO students
            (name, email, password, grade_level, excel_expertise, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        `;

        db.query(sql, [name, email, hashedPassword, grade_level, excel_expertise], (err) => {
            if (err) {
                console.error(err);

                // Check for duplicate email (MySQL error code 1062)
                if (err.errno === 1062) {
                    return res.status(409).json({ message: 'Email already registered' });
                }

                return res.status(400).json({ message: 'Invalid data' });
            }

            res.status(201).json({ message: 'Registration successful' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.login = (req, res) => {
    try {
        const { email, password } = req.body;

        db.query(
            'SELECT * FROM students WHERE email = ?',
            [email],
            async (err, results) => {
                if (err || results.length === 0)
                    return res.status(401).json({ message: 'Invalid credentials' });

                const student = results[0];
                const isMatch = await bcrypt.compare(password, student.password);

                if (!isMatch)
                    return res.status(401).json({ message: 'Invalid credentials' });

                const token = jwt.sign(
                    {
                        id: student.id,
                        name: student.name                    
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );

                res.json({ token, student });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
