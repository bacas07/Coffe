import coffe from "../schemas/coffeSchema.js";

class coffeModel {
    async find () {
        try {
            return await coffe.find();
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async findById (id) {
        try {
            return await coffe.findById(id);
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async findOne (filter) {
        try {
            return await coffe.findOne(filter);
        } catch (e) {
            console.error('error: ', e);
        }
    }

    async create (data) {
        try {
            const new_coffe = new coffe(data);
            return await new_coffe.save();
        } catch (e) {
            console.error('error: ', e)
        }
    }

    async updateById (id, data) {
        try {
            return await coffe.findByIdAndUpdate(id, data, { new: true });
        } catch (e) {
            console.error('error: ', e )
        }
    }

    async deleteById (id) {
        try {
            return await coffe.findByIdAndDelete(id);
        } catch (e) {
            console.error('error: ', e)
        }
    }
}

export default new coffeModel;