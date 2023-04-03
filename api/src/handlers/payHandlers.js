const { sendPreferencePayment } = require("../controlers/payControllers");

const preferencePayHandler = async function (req, res) {
  try {
    const { user, items } = req.body
    console.log(req.body)
    const preference = {
      items: [],
      payer: {
        name: user.id,
        email: user.email,
      },
      // external_reference: v4(),
      statement_descriptor: "Books Kingdom",
      back_urls: {
        success: 'https://localhost:3000/checkout/success',
        pending: '',
        failure: ''
      },
      auto_return: 'approved',
      binary_mode: true
    };
    
    items.forEach(item => {
      let book = {
        id: item.idBook,
        title: item.title,
        description:item.description,
        unit_price: item.unit_price,
        quantity: item.quantity,
        currency_id: 'ARS'
      }
      preference.items.push(book)
    })
    const response = await sendPreferencePayment(preference)
    let order = {
      user:response.body.payer.name,
      email:response.body.payer.email,
      idOrder:response.body.id,
      link:response.body.init_point
    }
    res.send(order)
  } catch (error) {
    res.send(error)
  }
};

module.exports = {
  preferencePayHandler
}