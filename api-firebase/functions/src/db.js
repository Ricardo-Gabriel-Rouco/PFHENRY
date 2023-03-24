const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(
      "./pf-henry-2d98b-firebase-adminsdk-p14fk-b98eadb377.json"
    ),
    databaseURL: "https://pf-henry-2d98b-default-rtdb.firebaseio.com",
  });
  const db = admin.firestore();

  module.exports = db;