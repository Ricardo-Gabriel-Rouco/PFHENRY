const { sendPreferencePayment } = require("../controlers/payControllers");

const preferencePayHandler = async function (req, res) {
  try {
    const { user, items } = req.body
    console.log(req.body)
    const preference = {
      items: [],
      payer: {
        name: user.name,
        email: user.email,
      },
      external_reference: items.id,
      statement_descriptor: "Books Kingdom",
      back_urls: {
        success: 'https://localhost:3001/paySuccess',
        pending: '',
        failure: 'https://localhost:3001/checkout/failure'
      },
      auto_return: 'approved',
      binary_mode: true,
    };

    items.forEach(item => {
      let book = {
        id: item.idBook,
        title: item.title,
        unit_price: item.unit_price,
        quantity: item.quantity,
        currency_id: 'ARS'
      }
      preference.items.push(book)
    })
    const response = await sendPreferencePayment(preference)
    let order = {
      user: response.body.payer.name,
      email: response.body.payer.email,
      idOrder: response.body.id,
      link: response.body.sandbox_init_point,
    }
    res.send(order)
  } catch (error) {
    res.send(error)
  }
};

module.exports = {
  preferencePayHandler
}