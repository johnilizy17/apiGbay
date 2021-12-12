const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//REGISTER
router.post("/register", async (req, res) => {
  
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser =await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save() 
    res.status(200).json(newUser);
    
    //save user and respond
    
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
});
//LOGIN
router.post("/login", async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.send("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.send("wrong password")
   
    if(user && validPassword){
      res.status(200).json(user)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
