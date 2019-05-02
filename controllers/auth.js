const User = require("../models/user");
const Ticket = require("../models/ticket");
const Token = require("../models/token");
const randtoken = require("rand-token");

exports.auth = async (req, res, next) => {
  console.log(req);
  console.log(req.body);
  let date = new Date().getTime();
  if (req.body.type === "RFID") {
    cardId = req.body.auth.card_id;
    const ticketQuery = Ticket.find({
      card_id: cardId,
      endDate: {
        $gt: date
      }
    }).select("-_id");

    const ticketResult = await ticketQuery.lean().exec();
    if (ticketResult.length === 0) {
      res.status(403).json({ err: "Nincs érvényes bérlet", allowed: false });
    } else {
      res.status(200).send({
        status_code: 1,
        status_msg: "Sikeres belépés",
        lease: {
          start: ticketResult[0].from,
          end: new Date(ticketResult[0].endDate)
        }
      });
    }
  } else {
    userId = req.body.auth.user_id;
    gateToken = req.body.auth.gateToken;
    const ticketQuery = Ticket.find({
      user_id: userId,
      endDate: {
        $gt: date
      }
    }).select("-_id");

    const tokenQuery = Token.find({ name: "currentToken" }).select(
      "-_id token"
    );

    try {
      const ticketResult = await ticketQuery.lean().exec();
      const tokenResult = await tokenQuery.lean().exec();

      if (ticketResult.length === 0) {
        res.status(403).json({ err: "Nincs érvényes bérlet", allowed: false });
      } else {
        if (tokenResult[0].token === gateToken) {
          const updateTokenQuery = Token.findOneAndUpdate(
            { name: "currentToken" },
            { token: generateToken() }
          );

          let updateTokenResult = await updateTokenQuery.exec();
          if (updateTokenResult.length === 0) {
            res
              .status(500)
              .json({ err: "Sikertelen token frissítés.", allowed: false });
          } else {
            res.status(200).send({
              status_code: 1,
              status_msg: "Sikeres belépés",
              lease: {
                start: ticketResult[0].from,
                end: new Date(ticketResult[0].endDate)
              }
            });
          }
        } else {
          res
            .status(403)
            .json({ err: "Nem azonos kapu token", allowed: false });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};

exports.login = async (req, res, next) => {
  email = req.body.email;
  password = req.body.password;

  console.log(`${email},${password}`);
  const query = User.find({ email: email, password: password }).select("_id");

  try {
    const result = await query.lean().exec();
    if (result.length === 0) {
      res.status(400).json({ err: "Helytelen felhasználónév jelszó" });
    } else {
      res.status(200).send(result[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

generateToken = () => {
  return randtoken.generate(10);
};
