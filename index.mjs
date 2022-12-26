import express from 'express';
import pkg from 'body-parser';
import { engine } from 'express-handlebars';
import nodemailer from 'nodemailer';
import { join } from 'path';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  allowedHeaders: 'Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,   Authorization, X-Requested-With'
}));

const port = 3001;
const { urlencoded, json } = pkg;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use('/public', express.static(join('public')))

app.use(urlencoded({ extended: false }));
app.use(json());

// app.get('/', (req, res) => {
//   res.render('layouts/main');
// })

app.post('/send', (req, res) => {
  const output = `
  <h3>Bonjour,</h3>
  <p>
    Cliquez sur ce lien pour valider votre adresse e-mail.

<a href="https://dev-bubble-1229d.firebaseapp.com/verification">https://dev-bubble-1229d.firebaseapp.com/__/auth/action?mode=action&oobCode=code</a>

Si vous n'avez pas demandé à valider cette adresse, vous pouvez ignorer cet e-mail.

Merci,
  </p>
  
  Votre équipe TechPro
  `;
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 587,
    secure: false,
    auth: {
      user: 'hunterxh007@yahoo.com',
      pass: 'fagediwrvzohnaaj'
    },
    tls: {
      rejectUnauthorized: false
    },
  })
  // from: 'yvanarthur@beyond-learning.org',

  let mailOptions = {
    from: 'hunterxh007@yahoo.com',
    to: req.body.email,
    subject: `Validation de l'adresse e-mail pour TechPro`,
    text: 'Vérifier ',
    html: output  
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message send: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.send('Email has been sent');
  });
 
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});