const {Router} = require('express')
const allBooksRouter = require('./booksRouter')

const router = Router()

router.use('/books', allBooksRouter)

module.exports = router