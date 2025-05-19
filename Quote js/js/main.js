
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
    { text:"Be yourself; everyone else is already taken.", author:" Oscar Wilde" },
    { text:"I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best." , author: "Marilyn Monroe"},
    { text:"So many books, so little time.", author:" Frank Zappa"},
    { text:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe." , author:"Albert Einstein"},
    { text:"A room without books is like a body without a soul", author:"Marcus Tullius Cicero"},
    { text:"Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.", author:"Bernard M. Baruch"},
    { text:"You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author:"Dr. Seuss"},
    { text:"You only live once, but if you do it right, once is enough.", author:"Mae West"},
    { text: "Be the change that you wish to see in the world.", author:"Mahatma Gandhi"},
    { text: "In three words I can sum up everything I've learned about life: it goes on.", author:"Robert Frost"},
    { text :"If you tell the truth, you don't have to remember anything.", author:"Mark Twain"},
    { text:"A friend is someone who knows all about you and still loves you.", author:"Elbert Hubbard"},
    { text:"To live is the rarest thing in the world. Most people exist, that is all.", author:"Oscar Wilde"},
    { text:"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment", author:"Ralph Waldo Emerson"}


];


let remainingQuotes = quotes.slice();  [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
    { text:"Be yourself; everyone else is already taken.", author:" Oscar Wilde" },
    { text:"I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best." , author: "Marilyn Monroe"},
    { text:"So many books, so little time.", author:" Frank Zappa"},
    { text:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe." , author:"Albert Einstein"},
    { text:"A room without books is like a body without a soul", author:"Marcus Tullius Cicero"},
    { text:"Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.", author:"Bernard M. Baruch"},
    { text:"You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author:"Dr. Seuss"},
    { text:"You only live once, but if you do it right, once is enough.", author:"Mae West"},
    { text: "Be the change that you wish to see in the world.", author:"Mahatma Gandhi"},
    { text: "In three words I can sum up everything I've learned about life: it goes on.", author:"Robert Frost"},
    { text :"If you tell the truth, you don't have to remember anything.", author:"Mark Twain"},
    { text:"A friend is someone who knows all about you and still loves you.", author:"Elbert Hubbard"},
    { text:"To live is the rarest thing in the world. Most people exist, that is all.", author:"Oscar Wilde"},
    { text:"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment", author:"Ralph Waldo Emerson"}


];

function getRandomQuote() {
    if (remainingQuotes.length === 0) {
        
        remainingQuotes = quotes.slice(); [
            { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
            { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
            { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
            { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
            { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
            { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
            { text:"Be yourself; everyone else is already taken.", author:" Oscar Wilde" },
            { text:"I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best." , author: "Marilyn Monroe"},
            { text:"So many books, so little time.", author:" Frank Zappa"},
            { text:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe." , author:"Albert Einstein"},
            { text:"A room without books is like a body without a soul", author:"Marcus Tullius Cicero"},
            { text:"Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.", author:"Bernard M. Baruch"},
            { text:"You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author:"Dr. Seuss"},
            { text:"You only live once, but if you do it right, once is enough.", author:"Mae West"},
            { text: "Be the change that you wish to see in the world.", author:"Mahatma Gandhi"},
            { text: "In three words I can sum up everything I've learned about life: it goes on.", author:"Robert Frost"},
            { text :"If you tell the truth, you don't have to remember anything.", author:"Mark Twain"},
            { text:"A friend is someone who knows all about you and still loves you.", author:"Elbert Hubbard"},
            { text:"To live is the rarest thing in the world. Most people exist, that is all.", author:"Oscar Wilde"},
            { text:"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment", author:"Ralph Waldo Emerson"}
        
        
        ];
    
    }

    const randomIndex = Math.floor(Math.random() * remainingQuotes.length);
    const randomQuote = remainingQuotes[randomIndex];

    document.getElementById("quote").textContent = `"${randomQuote.text}"`;
    document.getElementById("author").textContent = `- ${randomQuote.author}`;
    remainingQuotes.splice(randomIndex, 1);
}

const button = document.getElementById("new-quote");
button.addEventListener("click", getRandomQuote);