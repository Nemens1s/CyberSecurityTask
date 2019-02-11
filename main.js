function OTPencrypt(data, key = "", keyspace = "abcdefghijklmnopqrstuvwxyz ") {
    if (key.length < 1) { // No key was specified
        return data;
    }
    var output = "";
    for (var i = 0; i < data.length; i++) {
        // Find the new character
        var character = keyspace[(keyspace.indexOf(data[i].toLowerCase()) + keyspace.indexOf(key[i % key.length].toLowerCase())) % keyspace.length];
        if (data[i] == data[i].toLowerCase()) { // Character was in lowercase
            output += character;
        } else { // Character was in upper case
            output += character.toUpperCase();
        }
    }
    return output;
}
function OTPdecrypt(data, key = "", keyspace = "abcdefghijklmnopqrstuvwxyz ") {
    if (key.length < 1) { // No key was specified
        return data;
    }
    var output = "";
    for (var i = 0; i < data.length; i++) {
        // Find the new character:
        var character = keyspace[(keyspace.length + keyspace.indexOf(data[i].toLowerCase()) - keyspace.indexOf(key[i % key.length].toLowerCase())) % keyspace.length];
        if (data[i] == data[i].toLowerCase()) { // Character was in lowercase
            output += character;
        } else { // Character was in upper case
            output += character.toUpperCase();
        }
    }
    return output;
}

/* Background animation */
/* Stolen from https://codepen.io/P3R0/pen/MwgoKv */

var c = document.getElementById("bgcanvas");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

//chinese characters - taken from the unicode charset
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
//converting the string into an array of single characters
chinese = chinese.split("");

var font_size = 10;
var columns = c.width / font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++)
    drops[x] = 1;

//drawing the characters
function draw() {
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for (var i = 0; i < drops.length; i++) {
        //a random chinese character to print
        var text = chinese[Math.floor(Math.random() * chinese.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}

setInterval(draw, 33);