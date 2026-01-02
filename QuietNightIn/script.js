//variable bin
let solHappiness = 0; // your score
let preferredFoodsArray = ["pizza", "burgers"];
let preferredFood = ""; //set this in the randomise food function
let nonPreferredFood = ""; //set this in the randomise food function

//set these to the button clicked
let chosenFood = "";
let chosenActivity = "";
let choseWine = false;
let chosePeanuts = false;
let chosenRoom = "";

let index = -1; //set it to -1 as array starts at 0 and button starts by addign 1
let textArray = [
    "Hiya im home, work was really stuffy today.",
    `and i have been thinking about ${preferredFood} all day!`,
    "what do you think we should eat tonight?",
    `good choice, i love ${preferredFood}.`,
    `i guess we can have ${nonPreferredFood}`,
    "my friends were telling me about a brand new film that came out recently online",
    "they say that it was really cool",
    "what do you think, wanna watch it or should we game?",
    "Yay! i hope that the film is as good as i've heard",
    "oh okay, maybe some other time...",
    "im sure us gaming together will be fun too.",
    "anyway we should have some snacks too.",
    "i think there are peanuts if we want to have them?",
    "nice, they'll be tasty.",
    "ah, too salty i suppose.",
    "i do think we have some wine too!",
    "what do you think? wanna open that up?",
    "looks like we are having a party tonight.",
    "i guess we don't wanna be hungover for work tomorrow.",
    "tonight should be a fun evening.",
    "i can barely wait!",
    "it's quite nice in here, very airy",
    "you wanna stay through here on the sofa or should we go sit in bed?",
    "okay lets put the oven on and head through.",
    "awesome, i'll go set up the tv if you put the oven on.",
    "25 "
];

let delay = 50; //set this to 50 before sendinf off
let elementId = "tb2"; //the text box id
let isTyping = false; //if she is talking


let solEmo = "normal"; //use this for solanas emotions to determine what gif to use

let solTalk = new Image();
solTalk.src = "solana/sol talk.gif"; //normal talking

let solIdle = new Image();
solIdle.src = "solana/solanaidle.png"; //not talking

let solCryTalk = new Image();
solCryTalk.src = "solana/solCryTalk.gif"; //sad talk

let solJoyTalk = new Image();
solJoyTalk.src = "solana/solJoyTalk.gif"; //happy talk

const audio = document.getElementById("myAudio");

// end of var bin

//first thing that happens when game is loaded
window.onload = function () {
    randomizePreferredFood();

    //do this when all preferecces are decided
    updateTextArray();
};

function randomizePreferredFood() {
    const randomIndex = Math.floor(Math.random() * preferredFoodsArray.length);
    preferredFood = preferredFoodsArray[randomIndex];
    nonPreferredFood = preferredFoodsArray[1 - randomIndex]; //sets to be the other food
    //alert(" " + preferredFood + nonPreferredFood);
}
function updateTextArray() {
    textArray[1] = `i have been thinking about ${preferredFood} all day!`;
    //console.log(textArray[1]); //check array is in console
}

//draw sprite the i was given on moodle
//not used anymore
function oldDrawSprite(context, imageObject, x, y, rotationDegrees, scale) {
    var w = imageObject.width;
    var h = imageObject.height;

    context.save();
    context.translate(x, y);
    context.rotate(rotationDegrees * Math.PI / 180);
    context.scale(scale, scale);
    context.drawImage(imageObject, 0, 0, w, h, -w / 2, -h / 2, w, h);
    context.restore();
}
//new draw sprite because i cant get the canvas to work for the other one
function drawSprite(element, imageObject, x, y, rotationDegrees, scale) {
    var w = imageObject.width;
    var h = imageObject.height;

    //this mimics a css style for the position so that it can be unique for each sprite
    var styleString =
        'position: absolute; ' +
        'left: ' + x + 'px; ' +
        'top: ' + y + 'px; ';

    var imgElement = document.createElement('img');
    imgElement.src = imageObject.src;
    imgElement.width = w;
    imgElement.height = h;
    imgElement.style = styleString;
    imgElement.style.zIndex = 5;

    element.appendChild(imgElement);
}

//the on click for the main "next" button
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("next").addEventListener("click", function () {
        if (!isTyping && shouldRunCode()) {//check that code can run

            solEmo = "normal";
            solEmoCheck();

            index++; //moves to next index
            audio.play();//plays the next button sound
            typeText(elementId, textArray[index], delay);//plays the text
        }
    });
});

function solEmoCheck() {
    let solImage = document.getElementById("sol");


    if (solEmo == "cry") {
        solImage.src = solCryTalk.src; //sad talk
    }
    else if (solEmo == "joy") {
        solImage.src = solJoyTalk.src; //happy talk
    }


    else {
        solImage.src = solTalk.src; //default normal talking state
    }
};

function typeText(elementClass, text, delay) {
    let element = document.querySelector(`.${elementClass}`);
    let textLen = text.length;
    let i = 0;
    element.textContent = ""; //clears existing text

    //this function is here as it can use the immediately above variables
    function typeCharacter() {
        if (i < textLen) {
            element.textContent += text.charAt(i);
            i++;

            setTimeout(typeCharacter, delay);
        } else {
            isTyping = false;
            indexCheck();

            let solImage = document.getElementById("sol");
            solImage.src = solIdle.src; //she stops moving her mouth when done talking

            if (index >= textArray.length) {
                index = 0; //resets the index (this should never happen)
            }
        }
    }

    typeCharacter();
    isTyping = true;
}
function indexCheck() {
    //when skipping to index set it to the place we want to be minus 1
    //eg if you want to go to index 5 set it to 4 
    // this is because the code outside this function below adds one

    //this is in index order, refer to the index array at the top if chanegs need to be made
    removeAllButton();
    if (index == 2) {
        buttonMaker("Burgers", "myButton", "choseBurgers", "40%", "50%", "160px", "65px");
        buttonMaker("Pizza", "myButton", "chosePizza", "51.8%", "50%", "160px", "65px");
    }
    if (index == 3) {
        index = 4;
    }
    if (index == 7) {
        buttonMaker("Film", "myButton", "choseFilm", "40%", "50%", "160px", "65px");
        buttonMaker("Game", "myButton", "choseGames", "51.8%", "50%", "160px", "65px");
    }
    if (index == 8) {
        index = 10;
    }

    if (index == 12) {
        buttonMaker("Yes", "myButton", "choosePeanuts", "40%", "50%", "160px", "65px");
        buttonMaker("No", "myButton", "chooseNoPeanuts", "51.8%", "50%", "160px", "65px");
    }
    if (index == 13) {
        index = 14;
    }
    if (index == 16) {
        buttonMaker("Good Idea", "myButton", "chooseWine", "40%", "50%", "160px", "65px");
        buttonMaker("Best Not To", "myButton", "chooseNoWine", "51.8%", "50%", "160px", "65px");
    }
    if (index == 17) {
        index = 18;
    }
    if (index == 22) {
        buttonMaker("Go Into Bedroom", "myButton", "choseBed", "40%", "50%", "160px", "65px");
        buttonMaker("Stay In Here", "myButton", "choseSofa", "51.8%", "50%", "160px", "65px");
    }
    if ((index == 23) || (index == 24)) {
        endScreen();
    }
};
function shouldRunCode() { // chevcks for the index and stops the player from rpessing next if it that index
    checkvalue = index;
    if (checkvalue == 2 || checkvalue == 7 || checkvalue == 12 || checkvalue == 16 || checkvalue == 22 || checkvalue == 23 || checkvalue == 24) {
        return false; // Return false if the index is 2 or 7
    }
    return true; // Return true otherwise
}
function choseBurgers() {
    chosenFood = "burgers";

    if (preferredFood == "burgers") {
        textArray[3] = `good choice, i love ${preferredFood}.`;
        solEmo = "joy";
        solHappiness++;
    }
    else {
        textArray[3] = `i guess we can have ${nonPreferredFood}`;
        solEmo = "cry";
    }
    if (!isTyping) {
        index = 3;
        solEmoCheck();
        removeAllButton();
        audio.play();//plays the next button sound

        typeText(elementId, textArray[index], delay); // Change 'text-box2' and the textArray as needed
    }
}
function chosePizza() {
    chosenFood = "pizza";

    if (preferredFood == "pizza") {
        textArray[4] = `good choice, i love ${preferredFood}.`;
        solEmo = "joy";
        solHappiness++;

    }
    else {
        textArray[4] = `i guess we can have ${nonPreferredFood}`;
        solEmo = "cry";
    }
    if (!isTyping) {
        index = 4;
        solEmoCheck();
        removeAllButton();
        audio.play();//plays the next button sound

        typeText(elementId, textArray[index], delay); // Change 'text-box2' and the textArray as needed
    }
}
function choseGames() {
    chosenActivity = "games";

    if (!isTyping) {
        solEmo = "cry";
        index = 9;
        solEmoCheck();
        removeAllButton();
        audio.play();//plays the next button sound

        typeText(elementId, textArray[index], delay); // Change 'text-box2' and the textArray as needed
    }
}
function choseFilm() {
    chosenActivity = "film";

    if (!isTyping) {
        solEmo = "joy";
        solHappiness++;

        index = 8;
        solEmoCheck();
        removeAllButton();
        audio.play();//plays the next button sound

        typeText(elementId, textArray[index], delay); // Change 'text-box2' and the textArray as needed
    }
}
function choosePeanuts() {
    chosePeanuts = true;
    if (!isTyping) {
        solEmo = "joy";
        solHappiness++;

        index = 13;
        solEmoCheck();
        removeAllButton();
        audio.play();//plays the next button sound

        typeText(elementId, textArray[index], delay); // Change 'text-box2' and the textArray as needed
    }
}
function chooseNoPeanuts() {

    if (!isTyping) {
        solEmo = "cry";
        index = 14;
        solEmoCheck();
        removeAllButton();
        audio.play();//plays the next button sound

        typeText(elementId, textArray[index], delay); // Change 'text-box2' and the textArray as needed
    }
}
function chooseWine() {
    choseWine = true;

    if (!isTyping) {
        solEmo = "joy";
        solHappiness++;

        index = 17;
        solEmoCheck();
        removeAllButton();
        audio.play();//plays the next button sound

        typeText(elementId, textArray[index], delay); // Change 'text-box2' and the textArray as needed
    }
}
function chooseNoWine() {
    choseWine = false;

    if (!isTyping) {
        solEmo = "cry";
        index = 18;
        solEmoCheck();
        removeAllButton();
        audio.play();//plays the next button sound

        typeText(elementId, textArray[index], delay); // Change 'text-box2' and the textArray as needed
    }
}
function choseBed() {
    chosenRoom = "bedroom";
    if (!isTyping) {
        solEmo = "normal";
        index = 23;
        solEmoCheck();
        removeAllButton();
        audio.play();//plays the next button sound

        typeText(elementId, textArray[index], delay); // Change 'text-box2' and the textArray as needed
    }
}
function choseSofa() {
    chosenRoom = "sofa";
    if (!isTyping) {
        solEmo = "joy";
        solHappiness++;

        index = 24;
        solEmoCheck();
        removeAllButton();
        audio.play();//plays the next button sound

        typeText(elementId, textArray[index], delay); // Change 'text-box2' and the textArray as needed
    }
}
function endScreen() {

    var container = document.getElementById('container');
    //alert(solHappiness);

    //chooses the new bg for the end screen
    if (chosenRoom == "sofa") {
        var imageUrl = 'places/bg1.png'; // Replace with your image URL
    }
    else {
        var imageUrl = 'places/bg3.png'; // Replace with your image URL
    }


    var img = new Image();
    img.onload = function () {
        var fullWindowImage = document.createElement('div');
        fullWindowImage.style.position = 'fixed';
        fullWindowImage.style.top = '0';
        fullWindowImage.style.bottom = '0';
        fullWindowImage.style.left = '0';
        fullWindowImage.style.right = '0';
        fullWindowImage.style.zIndex = '-1';
        fullWindowImage.style.backgroundImage = 'url(' + imageUrl + ')';
        fullWindowImage.style.backgroundSize = 'cover';
        fullWindowImage.style.backgroundPosition = 'center';
        fullWindowImage.style.zIndex = 4;
        document.body.appendChild(fullWindowImage);
        // sets the image to be a new background basically
    };
    img.src = imageUrl;

    var food = new Image();
    if (chosenFood == "burger") {
        food.src = "choices/burger.png";
    }
    else {
        food.src = "choices/pizza.png";
    }
    food.width = 150;
    food.height = 150;

    var activity = new Image();
    if (chosenActivity == "film") {
        activity.src = "choices/film.png";
    }
    else {
        activity.src = "choices/game.png";
    }
    activity.width = 150;
    activity.height = 150;

    var peanuts = new Image();
    if (chosePeanuts == true) {
        peanuts.src = "choices/peanuts.png";
        peanuts.width = 150;
        peanuts.height = 150;
        drawSprite(container, peanuts, 1150, 300, 360, 1.5);
    }

    var wine = new Image();
    if (choseWine == true) {
        wine.src = "choices/wine.png";
        wine.width = 150;
        wine.height = 150;
        drawSprite(container, wine, 750, 300, 360, 1.5);
    }

    drawSprite(container, food, 1150, 600, 360, 1.5);
    drawSprite(container, activity, 750, 600, 360, 1.5);

    //deisplays 
    generateCenteredText();
}

function generateCenteredText() {
    let centeredText = document.getElementById("centeredText");
    centeredText.innerText = "Your score is " + String(solHappiness) + " out of 5";
    centeredText.style.zIndex = 7;
    //centeredText.style.backgroundColor = "#e0e0e0"; //this is too big to work nicely

}
function buttonMaker(text, id, functionName, x, y, width, height) {
    var button = document.createElement("button");

    //set button attributes
    button.innerHTML = text; // Button text
    button.id = id; // Button ID

    //set button styles to default if i didnt put them in
    button.style.position = "absolute";
    button.style.left = x || "0px"; 
    button.style.top = y || "0px"; 
    button.style.width = width || "auto"; 
    button.style.height = height || "auto"; 

    button.style.zIndex = 3;


    button.style.backgroundImage = "url('other/namebox.png')";
    button.style.backgroundSize = "cover"; // Cover the entire button
    button.style.backgroundRepeat = "no-repeat";
    button.style.backgroundPosition = "center"; // Center the image

    button.style.border = "none";
    button.style.imageRendering = "pixelated";

    button.style.fontSize = "20px"

    //lets it have an onclcik
    button.addEventListener("click", function () {

        //chcecks for functionwith the name provided
        if (typeof window[functionName] == "function") {
            window[functionName](); //gets function with name provided if it exists
        } else {
            alert("Button Clicked!"); //makes it do this if there isnt one so i know that i didnt set the function right or having made it yet
        }
    });

    // Get the container where you want to append the button
    var container = document.getElementById("buttonContainer");

    // Append the button to the container
    container.appendChild(button);
};

function removeButton(toRemove) {
    // Get a reference to the button you want to delete by its ID
    var buttonToDelete = document.getElementById(toRemove); // Replace "myButton" with the actual button ID

    if (buttonToDelete) {
        // Check if the button exists (not null)
        var container = document.getElementById("buttonContainer");

        // Remove the button from the container
        container.removeChild(buttonToDelete);
    }

};

function removeAllButton() {
    // Get a reference to the container
    var container = document.getElementById("buttonContainer");

    // Loop through all child elements of the container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

}



//unused
function updateWindowSize() {
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // Display window size in the text boxes
    document.getElementById('windowWidth').textContent = windowWidth;
    document.getElementById('windowHeight').textContent = windowHeight;
}


//audio code from https://www.w3schools.com/jsref/dom_obj_audio.asp
function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}