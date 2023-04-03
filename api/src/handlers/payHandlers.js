const { sendPreferencePayment } = require("../controlers/payControllers");

const preferencePayHandler = async function (req, res) {
    try {
        // const {name, email, adress, city,zip, cardNumber, expirationDate, cvv, items} = req.body
        const preference = {
            items: [
              {
                id: '1234',
                title: 'Example Item',
                description: 'An example item for testing',
                unit_price: 10.5,
                quantity: 2,
                currency_id: 'ARS'
              }
            ],
            payer: {
              name: 'John',
              surname: 'Doe',
              email: 'johndoe@example.com',
              phone: {
                area_code: '11',
                number: 55555666
              },
              identification: {
                type: 'DNI',
                number: '12345678'
              },
              address: {
                zip_code: '1234',
                street_name: 'Example Street',
                street_number: 123
              }
            },
            back_urls: {
              success: 'https://localhost:3000/',
              pending: '',
              failure: ''
            },
            auto_return: 'approved'
          };
        const response = await sendPreferencePayment(preference)
        console.log(response)
    } catch (error) {
        res.send(error)
    }
};

module.exports = {
    preferencePayHandler
}