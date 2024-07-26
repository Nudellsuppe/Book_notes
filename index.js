import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Book_notes",
  password: "",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let books;
app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM book ORDER BY id ASC");
  books = result.rows;
  console.log(books);
  res.render("index.ejs", { books: books });
});

app.get("/books/:id", async (req, res) => {
  const book_id = req.params.id;
  const result_notes = await db.query(
    "SELECT * FROM note WHERE note.book_id = $1 ORDER BY note_pagenumber ASC",
    [book_id]
  );
  let notes = result_notes.rows;
  console.log(notes[0].book_id);
  const result_review = await db.query(
    "SELECT * FROM review WHERE review.book_id = $1",
    [book_id]
  );
  let review = result_review.rows[0];
  const result_book = await db.query("SELECT * FROM book WHERE id = $1", [
    book_id,
  ]);
  let current_book = result_book.rows[0];

  res.render("book_details.ejs", {
    review: review,
    notes: notes,
    book: current_book,
  });
});

app.post("/edit", async (req, res) => {
  let new_book = req.body;
  await db.query(
    "UPDATE book SET title = $1, description = $2, page_numbers = $3, amazon_link = $4, author = $5 WHERE book.id = $6",
    [
      new_book.book_title,
      new_book.book_description,
      new_book.book_pages,
      new_book.amazon_link,
      new_book.book_author,
      new_book.id,
    ]
  );
  res.redirect("/");
});

app.post("/notes/edit", async (req, res) => {
  let updated_note = req.body;
  console.log(updated_note);
  await db.query(
    "UPDATE note SET note_text = $1, note_pagenumber =$2 WHERE note.id = $3",
    [updated_note.note_text, updated_note.note_pagenumber, updated_note.book_id]
  );
  res.redirect("/books/" + updated_note.book_id);
});
app.post("/notes/add", async (req, res) => {
  let newNote = req.body;
  console.log(newNote);
  await db.query(
    "INSERT INTO note (note_text,note_pagenumber,book_id) VALUES ($1, $2, $3) ",
    [newNote.note_text, newNote.note_pagenumber_add, newNote.book_id]
  );
  res.redirect("/books/" + newNote.book_id);
});

app.post("/notes/delete", async (req, res) => {
  let note_id = req.body.id;
  let book_id = req.body.book_id;
  await db.query("DELETE FROM note WHERE id = $1", [note_id]);
  console.log(req.body);
  res.redirect("/books/" + book_id);
});
app.post("/rating/edit", async (req, res) => {
  let newRating = req.body;
  await db.query(
    "UPDATE review SET review_text = $1, review_rating = $2, book_id = $3 WHERE review.id = $4",
    [
      newRating.book_review_text,
      newRating.book_rating,
      newRating.bookID,
      newRating.reviewID,
    ]
  );
  res.redirect("/books/" + newRating.bookID);
  console.log(req.body);
});
app.get("/new", (req, res) => {
  res.render("new_book.ejs");
});
app.post("/book/new", async (req, res) => {
  console.log(req.body);
  const id = await db.query(
    "INSERT INTO book (title,description,page_numbers,amazon_link,author) VALUES ($1, $2, $3,$4,$5) RETURNING book.id",
    [
      req.body.title,
      req.body.description,
      req.body.pages,
      req.body.amazon,
      req.body.author,
    ]
  );
  await db.query(
    "INSERT INTO review (review_text, review_rating,book_id) VALUES ($1, $2, $3)",
    [req.body.review_text, req.body.rating, id.rows[0].id]
  );
  res.redirect("/books/" + id.rows[0].id);
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
