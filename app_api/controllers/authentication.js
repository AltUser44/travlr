const mongoose = require('mongoose');
const User = mongoose.model('users');

/* POST /api/register - create a new user account */
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  try {
    await user.save();
    const token = user.generateJwt();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* POST /api/login - authenticate a user and return a JWT */
const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user || !user.validPassword(req.body.password)) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }
    const token = user.generateJwt();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { register, login };
