const db = require("../db");

const getAuthor = async () => {
  const q = db.collection("author");
  const qSnapshot = await q.get();
  result = qSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    nationality: doc.data().nationality,
    nickname: doc.data().nickname,
  }));
  return result;
};

const searchNameAuthor = async (name) => {
  const allAuthor = await getAuthor();
  const findAuthor = allAuthor.find(
    (a) => a.name.toLowerCase() === name.toLowerCase()
  );
  return findAuthor;
};

const getAuthorId = async (id) => {
  const doc = db.collection("author").doc(id);
  const item = await doc.get();
  const result = item.data();
  return result;
};

const newAuthor = async (name, nationality, nickname) => {
  await db.collection("author").doc().create({
    name,
    nationality,
    nickname,
  });
  return { Result: "success" };
};

const updateAuthor = async (id, name, nationality, nickname) => {
  const doc = db.collection("author").doc(id);
  const item = await doc.update({
    name,
    nationality,
    nickname,
  });
  return { Result: "success" };
};

module.exports = {
  getAuthor,
  searchNameAuthor,
  getAuthorId,
  newAuthor,
  updateAuthor,
};
