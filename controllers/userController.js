import userModel from "../models/userModel.js";
import { hash } from "argon2";
import { verify } from "argon2";
import { generateToken } from "../utils/auth.js";
import dotenv from 'dotenv';

dotenv.config();

class userController {
    async findAll (req, res) {
        try {
            const users = await userModel.find();
            return res.status(200).json(users);
        } catch (e) {
            console.error('Error: ', e);
            return res.status(500).json({ message: 'Error finding all users' });
        }
    }

    async findByID () {

    }

    async register (req, res) {
        try {
            const { name, email, password, role, adminSecretKey } = req.body;
            const user_exist = await userModel.findOne({ email });

            if (user_exist) {
                return res.status(401).json({ error: 'User alredy exists' });
            }

            if (role === 'admin' && adminSecretKey != process.env.ADMIN_SECRET_KEY) {
                return res.status(403).json({ error: 'Invalid admin secret key' });
            }

            const hashed_password = await hash(password);
            const new_user = await userModel.create({
                name,
                email,
                password: hashed_password,
                role
            });

            return res.status(201).json({ message: 'User created' })
        } catch (e) {
            return res.status(500).json({ error: 'Error creating new user' })
        }
    }

    async login (req, res) {
        try {
            const { email, password } = req.body;
            const user_exist = await userModel.findOne({ email });

            if (!user_exist) {
                return res.status(400).json({ message: 'User doesn\'t exist' });
            }
            
            const password_valid = await verify(user_exist.password, password);

            if (!password_valid) {
                return res.status(401).json({ message: 'Unvalid password' });
            }
            
            const token = generateToken({
                id: user_exist._id,
                name: user_exist.name,
                email: user_exist.email,
                role: user_exist.role,
            });
            
            return res.status(200).json({ message: 'User logged', token });

        } catch (e) {
            console.error(e)
            return res.status(500).json({ error: 'Error loggining user' })
        }
    }

    async deleteById (req, res) {
            try {
                const { id } = req.params;
                const deleted_user = await userModel.deleteById(id);
                if (!deleted_user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                return res.status(204).json({ message: 'Deleted user' });
            } catch {
                return res.status(500).json({ error: 'Error deleting user: ' })
            }
        }

    
}

export default new userController();