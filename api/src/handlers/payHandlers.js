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
        // success: `https://pfhenry-production.up.railway.app/payStatus?idUser=${user.name}`,
        // success: `http://localhost:3000/payStatus?idUser=${user.name}`,   //por ahora la respuesta del pago llega a la ruta del front del componente PayStatus
        success: `https://www.book-kingom.com.ar/payStatus?idUser=${user.name}`,
        pending: '',
        failure: `https://www.book-kingom.com.ar/payStatus?idUser=${user.name}`
        // failure: `https://pfhenry-production.up.railway.app/payStatus?idUser=${user.name}`,
        // failure: `http://localhost:3000/payStatus?idUser=${user.name}`  //por ahora la respuesta del pago llega a la ruta del front del componente PayStatus
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
    let link = response.body.init_point
    // {
    //   user: response.body.payer.name,
    //   email: response.body.payer.email,
    //   idOrder: response.body.id,
    //   link: response.body.init_point,
    //   status:""
    // }
    res.send(link)
  } catch (error) {
    res.send(error)
  }
};

module.exports = {
  preferencePayHandler
}