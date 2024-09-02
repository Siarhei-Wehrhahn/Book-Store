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

function getBooks(book, bookIndex) {
    return /*html*/`
    <div class="book" id="book">
        <div class="book-title">
            <h2>${book.name}</h2>
            <img class="book-cover" src="./assets/img/book_cover.jpg" alt="">
        </div>
        <div class="book-info">
            <div class="price">
                <p>${book.price}</p>
                <div class="like">
                    <span>${book.likes}</span>
                    <span class="likeBtn" onclick="toggleLike(book)">${isLiked(book.isLiked)}</span>
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
                <input id="inputFieldComment" type="text">
                <img id="sendButton" src="./assets/icons/send_icon.png" alt="send_icon">
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


function toggleLike(bookToLike) {
    if (!bookToLike) {
        bookToLike.liked = true
    } else {
        bookToLike.liked = false
    }
}