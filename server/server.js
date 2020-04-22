const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
//const enforce = require('express-sslify');`` 
require('dotenv').config({path: '.env.development'});
const stripe = require('stripe')(process.env.STRIPE_BACKENDKEY);

app.use(express.static(publicPath));
app.use(express.json());
//app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

const charge = (token, amount, description) => {
    return stripe.charges.create({
        amount,
        source: token.id,
        currency: 'usd',
        description
    });
};

app.post('/chargebooks', async (req, res, next) => {
    try {
        // const body = {
        //     amount: req.body.amount,
        //     id: req.body.id,
        //     currency: 'usd'
        // };
        // stripe.charges.create(body, (stripeError, stripeResponse) => {
        //     if (stripeError) {
        //         res.status(500).send({ error: stripeError });
        //     } else {
        //         res.status(200).send({ sucess: stripeResponse });
        //     }
        // });

        const data = await charge(req.body.token, req.body.amount, req.body.description);
        console.log(data);
        res.send({success: 'Successful'});
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up.');
});