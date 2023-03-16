De momento las tablas solo las voy a "redactar" en forma de objetos. Esto es debio al formato que usa firebase

<!-- Tabla de libros -->
BOOKS:

{
  isbn: integer, //entero de 13 digitos, sera nuestro id en cuanto a los libros
  name: string,
  author: string,
  desc: string, //descripcion
  editorial: string,
  stock: integer,
  min: stock,
  rating: float,
  price: float,
  provider: string,
  image: file,
  genres: {
    name: string
  } //seran sacados de otra "tabla"
}

GENRES: 

{
  id: integer,
  name: string,
}

USER/CLIENT:
{
  id: INTEGER, //posiblemente dni
  name: STRING,
  lastName: STRING,
  phone: INTEGER,
  detail: STRING,
  email: STRING,
  birthday: STRING,
  enabled: BOOLEAN, //sirve evitar que el usuario funcione
  role: { name: string}, //en inicios diria de usar roles tipo: admin, employee, customer y default customer
}

ROLES: 
{
  id: integer,
  name: string
}

ORDER: //pedidos, podemos dividir entre pedidos internos y pedidos de clientes
{
  id: integer,
  articles: {
    name: string //salen desde books
  }
  orderBy: string, //quien lo pide
  state: string //cumplido, pendiente, cancelado, avisado, en proceso, retirado
}

SALES: {
  id: integer, //numero de transaccion
  created: 
  payment: string //tipo de transaccion, credito, debito, mp, transferencia, efv
  articles: {
    id: INTEGER //sale de BOOKS
    name: string //same
    price: float,
    cant: integer //cantidad que se vende
    stock: stock - cant //esto seria para ir descontando de stock una vez que la compra se confirma
  }
  total: float //suma de todos los articles.price
}

Tenemos que decidir despues detalles como por ejemplo: cuando descontamos el stock (cuando se pide/reserva o cuando se vende efectivamente), otra cosa posible a ver es como cargar desde otros lados (kel, c&l, etc) los libros sin tener que tipear toda la data (creo que sera el moemento de decirle hola a web scrapping)
obtener los resumenes de ventas, por dia por semana y mes (hablar con equipo front)

