const {Router} = require('express')
const allBooksRouter = Router()

const {getAllBooks, getBooksById, toggleDisplay} = require('../handlers/booksHandlers')

allBooksRouter.get('/', getAllBooks)
allBooksRouter.get('/:id', getBooksById)
allBooksRouter.delete('/:id', toggleDisplay)


module.exports = allBooksRouter
