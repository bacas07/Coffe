import coffeModel from "../models/coffeModel.js";

class coffeController {
    async findAll (req, res) { 
        try {
            const coffes = await coffeModel.find();
            return res.status(200).json(coffes);
        } catch (e) {
            console.error('error: ', e);
            return res.status(500).json({ error: 'Error finding coffes' })
        }
    }

    async findById (req, res) {
        try {
            const { id } = req.params
            const coffe = await coffeModel.findById(id);
            if (!coffe) {
                return res.status(404).json({ error: 'Coffe not found' });
            }
            return  res.status(200).json(coffe);
        } catch (e) {
            return res.status(500).json({ error: 'Error finding coffe' });
        }
    }

    async create (req, res) {
        try {
            const new_coffe = await coffeModel.create(req.body);
            return res.status(201).json(new_coffe);
        } catch (e) {
            return res.status(500).json({ error: 'Error creating new coffe' });
        }
    }

    async updateById (req, res) {
        try {
            const { id } = req.params;
            const updated_coffe = await coffeModel.updateById(id, req.body);
            if (!updated_coffe) {
                return res.status(404).json({ error: 'Coffe not found' });
            }
            return res.status(201).json(updated_coffe);
        } catch (e) {
            return res.status(500).json({ error: 'Error updating coffe' });
        }   
    }

    async deleteById (req, res) {
        try {
            const { id } = req.params;
            const deleted_coffe = await coffeModel.deleteById(id);
            if (!deleted_coffe) {
                return res.status(404).json({ error: 'Coffe not found' });
            }
            return res.status(204).json({ message: 'Deleted Coffe' });
        } catch {
            return res.status(500).json({ error: 'Error deleting coffe' })
        }
    }
}

export default new coffeController;