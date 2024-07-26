document
  .getElementById("book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const description = document.getElementById("description").value;
    const reviewText = document.getElementById("review-text").value;
    const rating = document.getElementById("rating").value;

    const output = `
        <h2>Book Details</h2>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Page Numbers:</strong> ${pages}</p>
        <p><strong>Description:</strong> ${description}</p>
        <h2>Review</h2>
        <p><strong>Review Text:</strong> ${reviewText}</p>
        <p><strong>Rating:</strong> ${rating}</p>
    `;

    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = output;
    outputDiv.style.display = "block";
  });
