// Function to render all books
function render() {
    const commentBox = document.getElementById('books');
    let booksHtml = '';
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        booksHtml += getBooks(book, i);
    }
    commentBox.innerHTML = booksHtml;
}

function renderComments(index) {
    const comments = books[index].comments;
    if (comments && comments.length > 0) {
        let commentsHtml = '';
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            commentsHtml += getComments(comment);
        }
        return commentsHtml;
    } else {
        return `<p>Kommentiere als erstes</p>`;
    }
}

function addComment(book, index) {
    const input = document.getElementById('inputFieldComment' + index);
    const commentText = input.value.trim();

    if (commentText !== "") {
        // Stelle sicher, dass book.comments ein Array ist
        if (!Array.isArray(book.comments)) {
            book.comments = [];
        }

        // Füge den neuen Kommentar hinzu
        const newComment = {
            name: "Du",  // Der Benutzername, der den Kommentar hinzufügt
            comment: commentText
        };

        book.comments.unshift(newComment);  // Füge den neuen Kommentar an den Anfang des Arrays hinzu
        input.value = "";  // Leere das Eingabefeld

        render();  // Aktualisiere die Darstellung der Bücherliste
    }
}


function getBooks(book, bookIndex) {
    return /*html*/`
    <div class="book" id="book">
        <div class="book-title">
            <h2>${book.name}</h2>
            <img class="book-cover" src="./assets/img/book_cover.jpg" alt="">
        </div>
        <div class="book-info">
         <div class="price">
             <p>${book.price} €</p>
                <div class="like">
                 <span>${book.likes}</span>
                 <span class="likeBtn" onclick="toggleLike(books[${bookIndex}])">${isLiked(book.liked)}</span>
                </div>
            </div>
         <div class="info">
                <table>
                    <tr>
                        <td>Autor</td>
                        <td>: ${book.author}</td>
                    </tr>
                    <tr>
                        <td>Erscheinungsjahr</td>
                        <td>: ${book.publishedYear}</td>
                    </tr>
                    <tr>
                        <td>Genre</td>
                        <td>: ${book.genre}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="comment-box">
            <h3>Kommentare:</h3>
            <div class="comments">
                <table id="commentsId">
                    ${renderComments(bookIndex)}
                </table>
            </div>
            <div class="comment-input">
                <input class="inputFieldComment" id="inputFieldComment${bookIndex}" type="text">
                <img onclick="addComment(books[${bookIndex}], ${bookIndex})" id="sendButton" src="./assets/icons/send_icon.png" alt="send_icon">
            </div>
        </div>
    </div>
    `;
}

function getComments(comment) {
    return /*html*/`
    <tr>
        <td>${comment.name}:</td>
        <td>${comment.comment}</td>
    </tr>
    `;
}

function isLiked(bookIsLiked) {
    return bookIsLiked 
        ? `<img src="./assets/icons/heartRed.png" alt="heartRed">` 
        : `<img src="./assets/icons/heartWhite.png" alt="heartWhite">`;
}

function toggleLike(book) {
    book.liked = !book.liked; 

    if (book.liked) {
        book.likes++;
    } else {
        book.likes--;
    }

    render();
}