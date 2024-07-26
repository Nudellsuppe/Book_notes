function handler(bookId) {
  const elementsToToggle = [
    `input_label${bookId}`,
    `input${bookId}`,
    `author_label${bookId}`,
    `input_Author${bookId}`,
    `inputDescription${bookId}`,
    `pages_span${bookId}`,
    `input_pages${bookId}`,
    `span_amazon${bookId}`,
    `input_amazon${bookId}`,
    `done${bookId}`,
    `cancel${bookId}`,
  ];

  elementsToToggle.forEach((id) => {
    const element = document.getElementById(id);
    element.hidden = !element.hidden;
  });

  const editButton = document.getElementById(`edit${bookId}`);
  editButton.hidden = true;
}

function auto_height(elem) {
  elem.style.height = "1px";
  elem.style.height = elem.scrollHeight + "px";
}
