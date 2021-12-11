const router = require("express").Router()
const test = require('../models/test');

router.post('/re', async (req, res) => {
    console.log("hello"+JSON.stringify(req.body))
    // const user = await new test({
    //     username: req.body.username,
    // })
    //await user.save()
    res.send("ok")
})

module.exports = router