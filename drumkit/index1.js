// alert("Hello");
// document.querySelector("button").addEventListener("click", handleClick);
// var index = 0;
// while (index < bound) {
//     document.querySelectorAll(".drum")[index].addEventListener("click", function);
//     index++;
// }

var bound = document.querySelectorAll(".drum").length;

for (var index = 0; index < bound; index++) {
    document.querySelectorAll(".drum")[index].addEventListener("click", function () {
        // var audio = new Audio("sounds/tom-1.mp3")
        // audio.play();
        // console.log(this.style.color = "white");

        var buttonInnerHTML = this.innerHTML;
        var activeButton = this;

        switch (buttonInnerHTML) {
            case "w":
                var tom1 = new Audio("sounds/tom-1.mp3")
                tom1.play();
                break;
                
            case "a":
                var tom2 = new Audio("sounds/tom-2.mp3")
                tom2.play();
                break;
                
            case "s":
                var tom3 = new Audio("sounds/tom-3.mp3")
                tom3.play();
                break;
                
            case "d":
                var tom4 = new Audio("sounds/tom-4.mp3")
                tom4.play();
                break;
                
            case "j":
                var snare = new Audio("sounds/snare.mp3")
                snare.play();
                break;
                
            case "k":
                var crash = new Audio("sounds/crash.mp3")
                crash.play();
                break;
                
            case "l":
                var kick = new Audio("sounds/kick-bass.mp3")
                kick.play();
                break;

            default:
                console.log("Unknown button: " + buttonInnerHTML);
        }
    
    });
}

document.addEventListener("keydown", function(event) {
    console.log(event.key);
})

// activeButton.style.backgroundColor = "white";
// document.querySelectorAll("button").addEventListener("click", handleClick);
// function handleClick() {
// alert("Button clicked!");
// };