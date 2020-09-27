module.exports = async (req, res) => {

    try {
        const user = req.user
        res.json(user)

    } catch (e) {
        res.json(e)
    }
}
