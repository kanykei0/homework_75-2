import { Router } from "express";
const Caesar = require("caesar-salad").Caesar;

const messagesRouter = Router();

messagesRouter.post("/encode", (req, res) => {
  const { password, message } = req.body;
  let messageEncoded = Caesar.Cipher(password).crypt(message);
  const encodedData = {
    encoded: messageEncoded,
  };
  res.json(encodedData);
});

messagesRouter.post("/decode", (req, res) => {
  const { password, message } = req.body;
  let messageDecoded = Caesar.Decipher(password).crypt(message);
  const decodedData = {
    decoded: messageDecoded,
  };
  res.json(decodedData);
});

export default messagesRouter;
