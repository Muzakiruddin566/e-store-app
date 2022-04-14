const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "zikarhashmi92@gmail.com",
    pass: "zikarhashmi",
  },
});
const sendEmail = (email, total) => {
  transport
    .sendMail({
      from: "zikarhashmi92@gmail.com",
      to: email,
      subject: " receipt",
      html: `<div>
                <h3 >Order Confirmed</h3>
                <p >Hello </p>
                <p >Thank you for Shopping.Your Total Bill is <strong>${total}</strong>.</p>
            </div>`,
    })
    .catch((err) => console.log(err));
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.info(`server has started on ${PORT}`));

app.post("/send", (req, res) => {
  try {
    const { email, sum } = req.body;
    if (!email || !sum || sum === 0) {
      return res.status(204).send(" Add Cart is empty");
    }
    sendEmail(email,sum);
    return res.status(201).send("Email sent");
  } catch (error) {
      console.log(error);
  }
});
