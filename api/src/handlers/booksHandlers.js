const {getBooks, getBookById, deleteBook} = require('../controllers/getBooksFirestore')

const getAllBooks = async(req, res) => {
  try {
    let results = await getBooks()
    res.status(200).json(results)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getBooksById = async (req, res) => {
  const {id} = req.params
  try {
    let results = await getBookById(id)
    res.status(200).json(results)
  } catch (error) {
    res.status(400).json(error)
  }
}

const toggleDisplay = async (req, res) => {
  const {id} = req.params
  try {
    await deleteBook(id)
    res.status(200).json('Borrado con exito')
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  getAllBooks,
  getBooksById,
  toggleDisplay
}