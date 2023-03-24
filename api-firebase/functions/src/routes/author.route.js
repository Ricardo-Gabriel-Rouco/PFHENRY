const { Router } = require("express");
const {
  getAuthor,
  searchNameAuthor,
  getAuthorId,
  newAuthor,
  updateAuthor,
} = require("../controllers/author.controller");

const authorRouter = Router();

authorRouter.get("/", async (req, res) => {
  const { name } = req.query;
  let result;
  try {
    if (name) {
      result = await searchNameAuthor(name);
      if (!result) {
        throw Error(`No existe el 'Author' con el name: ${name}; en la BD.`);
      }
    } else {
      result = await getAuthor();
      if (!result.length) {
        throw Error(`No exiten 'Autores' en la BD para mostrar!`);
      }
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

authorRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getAuthorId(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

authorRouter.post("/new", async (req, res) => {
  const { name, nationality, nickname } = req.body;
  try {
    const result = await newAuthor(name, nationality, nickname);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

authorRouter.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, nationality, nickname } = req.body;
  try {
    const result = await updateAuthor(id, name, nationality, nickname);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

module.exports = authorRouter;
