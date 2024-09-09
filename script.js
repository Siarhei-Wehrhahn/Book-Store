function render() {
    const commentBox = document.getElementById('books');
    let booksHtml = '';

    // Generiere das HTML für alle Bücher
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        booksHtml += getBooks(book, i);
    }

    commentBox.innerHTML = booksHtml;

    // Jetzt, nachdem das HTML eingefügt wurde, die Kommentare für jedes Buch rendern
    for (let i = 0; i < books.length; i++) {
        renderComments(i);
    }
}

function init() {
    getFromLocalStorage();
    render();
}

function renderLikes(i) {
    let likes = document.getElementById('bookLikes' + i);
    let isLikedElement = document.getElementById('isLiked' + i);
    likes.innerText = books[i].likes;
    isLikedElement.innerHTML = isLiked(books[i].liked);    
}

function renderComments(index) {
    const commentsElement = document.getElementById('commentsId' + index);
    const comments = books[index].comments;
    
    if (comments && comments.length > 0) {
        let commentsHtml = '';
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            commentsHtml += getComments(comment);
        }
        commentsElement.innerHTML = commentsHtml;
    } else {
        commentsElement.innerHTML = `<p>Kommentiere als erstes</p>`;
    }
}

function addComment(book, index) {
    const input = document.getElementById('inputFieldComment' + index);
    const commentText = input.value.trim();

    if (commentText !== "") {
        if (!Array.isArray(book.comments)) {
            book.comments = [];
        }

        const newComment = {
            name: "Du",
            comment: commentText
        };

        book.comments.unshift(newComment);
        input.value = "";

        renderComments(index);
        saveToLocalStorage();
    }
}

function saveToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
}

function getFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    
    if (storedBooks) {
        books = storedBooks;
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
             <p>${book.price.toFixed(2)} €</p>
                <div class="like">
                 <span id="bookLikes${bookIndex}">${book.likes}</span>
                 <span id="isLiked${bookIndex}" class="likeBtn" onclick="toggleLike(${bookIndex})">${isLiked(book.liked)}</span>
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
                <table id="commentsId${bookIndex}"></table>
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

function toggleLike(i) {
    let book = books[i];
    book.liked = !book.liked;

    if (book.liked) {
        book.likes++;
    } else {
        book.likes--;
    }

    renderLikes(i);
    saveToLocalStorage()
}