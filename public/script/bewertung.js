function auto_height(elem) {
  elem.style.height = "1px";
  elem.style.height = `${elem.scrollHeight}px`;
}

function test(id) {
  document.getElementById("text" + id).hidden = true;
  document.getElementById("pages" + id).hidden = true;
  document.getElementById("edit" + id).hidden = true;
  document.getElementById("done" + id).hidden = false;
  document.getElementById("note_text" + id).hidden = false;
  document.getElementById("note_pagenumber" + id).hidden = false;
}

function handler_add() {
  document.getElementById("note_text_new").hidden = false;
  document.getElementById("note_pagenumber_new").hidden = false;
  document.getElementById("done_add").hidden = false;
  document.getElementById("cancel_add_note").hidden = false;
}

function cancel_add() {
  document.getElementById("note_text_new").hidden = true;
  document.getElementById("note_pagenumber_new").hidden = true;
  document.getElementById("done_add").hidden = true;
  document.getElementById("cancel_add_note").hidden = true;
}

function handle_review() {
  document.getElementById("reviewText").hidden = true;
  document.getElementById("rating").hidden = true;
  document.getElementById("editReview").hidden = true;
  document.getElementById("book_review").hidden = false;
  document.getElementById("ratingLabel").hidden = false;
  document.getElementById("book_rating").hidden = false;
  document.getElementById("done_review").hidden = false;
  document.getElementById("cancel_edit_book").hidden = false;
}
