const url = 'http://localhost:3000/'

getQuoties = () => {
    fetch(url + "quotes?_embed=likes", {
        method: 'GET',
        header: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify()
    })
    .then(resp => resp.json())
    .then(json => {
        json.forEach(Quote => {
            viewQuote(Quote);
        })
    })
}

viewQuote = (quote) => {
    const cardLoc = document.getElementById("quote-list");
    const card = document.createElement("li");
    card.class = "quote-card";

    const block = document.createElement("blockQuote");
    block.class = "blockQuote";
    block.innerHTML = "''" + quote.quote + "''";

    const writer = document.createElement("footer");
    writer.class = "blockQuote-footer";
    writer.innerHTML = " -" + quote.author;

    const br = document.createElement("br")

    const sucBtn = document.createElement("button");
    sucBtn.class = "btn-success";
    sucBtn.innerHTML = "Likes: ";
    sucBtn.addEventListener('click', (e) => {
        e.preventDefault();
        span.innerHTML++;
        postLike(quote);
    })

    const span = document.createElement("span");
    span.innerHTML = "0";
    sucBtn.appendChild(span);

    const delBtn = document.createElement("button")
    delBtn.class = "btn-danger";
    delBtn.innerHTML = "Delete";
    delBtn.addEventListener('click', (e) => {
        e.preventDefault();
        delQuote(quote.id);
        card.remove();
    })

    block.appendChild(writer);
    block.appendChild(br);
    block.appendChild(sucBtn);
    block.appendChild(delBtn);

    card.appendChild(block);
    cardLoc.appendChild(card);

}

eHandler = (e) => {
    const submitBtn = getElementById("new-quote-form");

    submitBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        const newQuote = getElementById("new-quote");
        const newAuthor = getElementById("author");
        const newQuoteObj = {"quote": newQuote.value, "author": newAuthor.value}

        viewQuote(newQuoteObj);
    })
}

delQuote = (id) => {
    fetch(url + "quotes/" + id, {
        method: 'DELETE', 
    })
}

postLike = (obj) => {
    fetch(url + "likes", {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            quoteId: obj.id,
        })    
    })
}

init = () => {
    getQuoties();
}

document.addEventListener("DOMContentLoaded", (e) => {
    init();
})