var User = require('../model/user')

class UserController {

    async index(req, res) {
        var users = await User.find().exec()
        res.json(users)
    }

    async save(req, res) {
        var user = await new User({
            username: req.body.username,
            password: req.body.password
        }).save()

        res.json(user)
    }

    async get(req, res) {
        return res.json(req.user)
    }

    async update(req, res) {
        req.user.username = req.body.username
        req.user.password = req.body.password

        req.user = await req.user.save()

        return res.json(req.user)
    }

    async delete(req, res) {
        await User.findByIdAndRemove(req.params.id)
        return res.status(204).json({})
    }

    async findUserMiddleware(req, res, next) {
        var user = await User.findOne({
            _id: req.params.id
        }).exec()
        if (!user) {
            return res.status(404).json({
                'message': 'Usuário não encontrado'
            })
        }
        req.user = user
        next()
    }
}

exports = module.exports = new UserController()