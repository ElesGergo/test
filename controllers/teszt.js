const randtoken = require("rand-token");
const User = require("../models/user");
const Token = require("../models/token");

exports.token = async (req, res, next) => {
  //const query = Token.find({ name: "tesztToken" });
  const query = Token.find({ name: "teszt" }).select("-_id token");
  // const query = Token.save({ name: "tesztToken", token: generateToken() });
  try {
    const result = await query.lean().exec();
    res.status(200).send(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.valid = async (req, res, next) => {
  const userName = req.body.username;
  const token = req.body.token;

  const userQuery = User.find({ name: userName }).select("-_id date");
  const tokenQuery = Token.find({ name: "teszt" }).select("-_id token");
  try {
    let userResult = await userQuery.lean().exec();
    let tokenResult = await tokenQuery.lean().exec();
    var todayDate = new Date().toISOString().slice(0, 10);

    if (tokenResult[0].token === token && todayDate < userResult[0].date) {
      const updateTokenQuery = Token.findOneAndUpdate(
        { name: "teszt" },
        { token: generateToken() }
      );
      let updateTokenResult = await updateTokenQuery.exec();
      console.log(updateTokenResult);
      res.status(200).json({ allowed: true });
    } else {
      res.status(403).json({ allowed: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

generateToken = () => {
  return randtoken.generate(10);
};
