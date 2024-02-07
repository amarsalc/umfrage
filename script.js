let count = 0;
let breakLoop = 0;
let btn = document.getElementById('changeTextButton');
let btn2 = document.getElementById('fakeButton');

const buttonYes = document.querySelector('#changeTextButton');
const buttonNo = document.querySelector('#fakeButton');
const questionText = document.getElementById("questionText");
const cursor = document.getElementById("cursor");
const cursor2 = document.getElementById("cursor2");
const typeWriter = document.getElementById("typeWriter");
const image = document.getElementById("image");
const buttonContainer = document.querySelector('.button-container');
const changeImg = document.getElementById("changeImg");
const changeTextButton2 = document.getElementById("changeTextButton2");
const fakeButton2 = document.getElementById("fakeButton2");

const szenarios = [
    {
        name: "Erstes Nein",
        "button functions": [happyEnding, update],
        text: "Würde dir ein anderer Tag besser passen?"
    },
    {
        name: "Zweites Nein",
        "button functions":[pic1no, pic1no],
        text: "Wusstest du das Waffeln eigentlich Pancakes mit Bauchmuskeln sind?"
    },
    {
        name: "Viertes Nein",
        "button functions":[happyEnding,oderFrage],
        text: "Hat sich dein Herz umentschieden?"
    },
    {
        name: "Fünftes Nein",
        "button functions":[picGift,picEnte],
        text: "Hättest du lieber sprechende Enten oder einen sprechenden Wal als Freund?"
    },
    {
        name: "Sechstes Nein",
        "button functions":[picGift,picGift],
        text: "Der Ente hat deine Antwort nicht gefallen. Magst du Sushi?"
    },
    {
        name: "Siebtes Nein",
        "button functions":[happyEnding,sadEnding],
        text: "Letzte Chance!Überlegs dir gut!🤔"
    }
];

let sleepTime = 100;

let curPhraseIndex = 0;

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve,ms));
}

buttonYes.onclick = happyEnding;
buttonNo.onclick = update;

function oderFrage() {
    update();
    changeTextButton2.innerText = "Enten";
    fakeButton2.innerText = "Wal";
}

function picEnte() {
    changeTextButton2.innerText = "Ja";
    fakeButton2.innerText = "Nein";
    changePic("ente.png");
}

function picGift() {
    count=6;
    changeTextButton2.innerText = "Ja";
    fakeButton2.innerText = "Nein";
    changePic("gift.jpeg");
}

function picBurg() {
    changePic("burg.jpg");
}

function pic1no(){
    pic1NoAsync();
}

const pic1NoAsync = async (x) => {
    changeText("Selbst Mario fällt für die Liebe.");
    await sleep(sleepTime*40);
    changePic("couldbeus.jpeg");
};

function changePic(x) {
        update();
        changeImg.src = x;
        image.style.display = "block";
}

function update() {
    image.style.display="None";
    changeText(szenarios[count].text);
    buttonYes.onclick=szenarios[count]["button functions"][0];
    buttonNo.onclick=szenarios[count]["button functions"][1];
    count++;
}

function sadEnding(){
    sadEndingAsync();
}

const sadEndingAsync = async () => {
    image.style.display="None";
    typeWriter.style.fontSize = "24px";
    changeText("Game over! 👾");
    buttonContainer.style.display = "None";
    await sleep(sleepTime*55);
    writeAnimation(typeWriter,"\"Das war Mal wieder ein Schuss in den Ofen.🚀\"",cursor2);
};

function happyEnding() {
    buttonContainer.style.display="None";
    image.style.display="None";
    changeText("Dann schreib mir deine Nummer zurück 😉");
}

const changeText = async (x) => {
    removeAnimation(questionText,0,cursor);
    await sleep(sleepTime*40);
    writeAnimation(questionText,x,cursor);
};

const writeAnimation = async (x,y,z) => {
        z.style.display = "inline";
        let curWord = y;
        for (let i = 0; i < curWord.length; i++) {
            if (breakLoop!==0) {
                return;
            }else{
                x.innerText = curWord.substring(0,i + 1);
                await sleep(sleepTime);
            }
        }
        z.style.display = "None";
        await sleep(sleepTime*5);
};

const removeAnimation = async (x,y,z) => {
    breakLoop=1;
    z.style.display = "inline";
    let curWord = x.innerText;
    for (let i = curWord.length; i > 0 ; i--) {
        if (y==0&&i===1) {
            x.innerText="|";
            break;
        }
        x.innerText = curWord.substring(0,i - 1);
        await sleep(50);
    }
    breakLoop=0;
    z.style.display = "None";
    await sleep(sleepTime*10);
};

btn.addEventListener('mousemove', e => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    btn.style.setProperty('--x',x + 'deg');
})
btn2.addEventListener('mousemove', e => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    btn.style.setProperty('--x',x + 'deg');
})

writeAnimation(questionText,"Hi Stefania,\n lass uns Samstag eine Pizza essen 🍕",cursor);
