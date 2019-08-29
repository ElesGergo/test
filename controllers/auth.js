const User = require("../models/user");
const Ticket = require("../models/ticket");
const Token = require("../models/token");
const randtoken = require("rand-token");

var token = "123";

let user1 = {
  id: 1,
  email: "email1",
  password: "pw1"
};
let user2 = {
  id: 2,
  email: "email2",
  password: "pw2"
};
let user3 = {
  id: 3,
  email: "email3",
  password: "pw3"
};

let cabinet1 = {
  id: 1,
  taken: false,
  open: false,
  userId: ""
};
let cabinet2 = {
  id: 2,
  taken: false,
  open: false,
  userId: ""
};
generateToken = () => {
  return randtoken.generate(10);
};

exports.token = async (req, res, next) => {
  console.log(req);
  //const query = Token.find({ name: "tesztToken" });
  //const query = Token.find({ name: "currentToken" }).select("-_id token");
  //const query = Token.find().select("-_id token");

  // const query = Token.save({ name: "tesztToken", token: generateToken() });
  res.status(200).json({ token: token });
  /* try {
    // const result = await query.lean().exec();
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } */
};

exports.select = async (req, res, next) => {
  let ticket = req.body.ticket;
  let ut = req.body.userToken;
  res.status(200).send({
    status_code: 1,
    status_msg: "Sikeres belépés"
  });
  return;
};

exports.users = (req, res, next) => {
  res.status(200).send({ status: "ok", data: [user1, user2, user3] });
  return;
};
exports.cabinets = (req, res, next) => {
  res.status(200).send({ status: "ok", data: [cabinet1, cabinet2] });
  return;
};

exports.cabinet = (req, res, next) => {
  let id = req.body.id;
  if (id === 1) {
    cabinet1.taken = req.body.cabinet.taken;
    cabinet1.userId = req.body.cabinet.userId;
    cabinet1.open = req.body.cabinet.open;
    res.status(200).send({ status: "ok", data: [cabinet1] });
    return;
  } else {
    cabinet2.taken = req.body.cabinet.taken;
    cabinet2.userId = req.body.cabinet.userId;
    cabinet2.open = req.body.cabinet.open;
    res.status(200).send({ status: "ok", data: [cabinet2] });
    return;
  }
};

exports.auth = async (req, res, next) => {
  console.log(req.body);
  let ut = req.body.userToken;
  let gt = req.body.gateToken;

  if (gt === token && ut === "1") {
    // token = generateToken();
    res.status(200).send({
      status_code: 1,
      status_msg: "Sikeres belépés"
    });
    return;
  }
  if (gt === token && ut === "2") {
    res.status(200).send({
      status_code: 1,
      status_msg: "Sikeres belépés"
    });
    return;
  }
  if (gt === token && ut === "3") {
    res.status(200).send({
      status_code: 3,
      status_msg: "Több bérlet",
      tickets: [{ name: "Bérlet1" }, { name: "Bérlet2" }, { name: "Bérlet3" }]
    });
    return;
  }
  if (gt !== token) {
    res.status(401).send({
      status_code: 0,
      status_msg: "Nem megfelelő kapukód",
      tickets: []
    });
    return;
  }

  /*   cardId = req.body.auth.card_id;

  let date = new Date().getTime();

  if (cardId === token) {
    res.status(200).send({
      status_code: 1,
      status_msg: "Sikeres belépés"
    });
  }
  if (req.body.type === "RFID") {
  } */
  /*     const ticketQuery = Ticket.find({
      card_id: cardId
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
      user_id: userId
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
  } */
};

exports.login = (req, res, next) => {
  email = req.body.email;
  password = req.body.password;

  switch (email) {
    case "email1":
      res.status(200).send({ userId: 1 });
      return;
    case "email2":
      res.status(200).send({ userId: 2 });
      return;
      break;
    case "email3":
      res.status(200).send({ userId: 3 });
      return;
    default:
      break;
  }

  /*   console.log(`${email},${password}`);
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
  } */
};

generateToken = () => {
  return randtoken.generate(10);
};
