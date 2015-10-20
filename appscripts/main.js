    //http://speckyboy.com/demo/windmill-demo/index.html
require(
    
    ["../jslibs/raphael.lonce"],

    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));

        var bgm = new Audio("resources/bgm.mp3").play();

        //-----------------------------------------------------
        // Parameters of the canvas

        var pWidth = paper.canvas.offsetWidth;          
        var pHeight = paper.canvas.offsetHeight;

        // Setting Counter and Score variables
        var clickCount=0;       // Keeps track of the state of the counter 
        var scoreNum = paper.text(780,50,clickCount);      // Keeps track of the number of clicks

        //-----------------------------------------------------
        // Attributes

        scoreNum.attr({        // Score number attributes
            'text-anchor':'end',
            'font-size': 80,
            'fill': 'white',
            'opacity': 0.7
        });      

        //-----------------------------------------------------
        // Setting 'start' button variables

        var startButton = paper.circle(pWidth/2, pHeight/2, 55);    // Defining the button
        var startText = paper.text(pWidth/2, pHeight/2, 'START');   // Defining the text
        
        startButton.attr({  // Attributes of the start button
            fill: "white",
            opacity: 0.65,
            stroke: "white",

        });

      
        //-----------------------------------------------------
        //To display the start button 

        var ready = function(){       
            startButton.show();
            startText.show();
        };

        // Defining 'start' function
        // contains body of statements that would be executed when the function is called

        var start = function (){

            console.log("game is starting");
            startButton.hide();     // Hides start button and text
            startText.hide();              

            clickCount = 0;         // Counter starts at 0
            console.log("the number of clicks starts at " + clickCount);
             
           
            var chooseLevel = prompt("Oh no! This naughty pony is on the loose. Click it as many times as you can!\nChoose your level of difficulty:\n1 (easy)\n2 (moderate)\n3 (hard)", "2");
            // This allows a prompt up box to allow the choice of difficulty levels

            switch(chooseLevel) {       // Different cases will affect different speeds, thus alternating the difficulty levels
                case "1":
                var squareanim = setInterval(moveSquare, 80);
                break;
                case "2":
                var squareanim = setInterval(moveSquare, 45);
                break;
                case "3":
                var squareanim = setInterval(moveSquare, 30);
            }   

            rect1.show();       // Shows the clickable image when the 'start' function is called
            
            scoreNum.attr({text:clickCount});       // Starts the counter once 'start' is pressed

            setTimeout(function() {     // Provides a timer for the game, ending the game 
                clearInterval(squareanim);      // Ends the 'setInterval' function when timer ends
                rect1.hide()        // Hides the pony when the game ends
                alert("Congrats! You clicked this naughty pony " + clickCount + " number of times.");     // Alert box 
                ready();        // Calls the ready function when the game ends, restarting the game
                clickCount=0;       // Resetting the score counter
                scoreNum.attr({text:clickCount});
                }, 10000);

        };

        //-----------------------------------------------------
        // Defining the object that the player will click 

        var rect1 = paper.image("http://img07.deviantart.net/0fea/i/2012/128/9/a/twilight_sparkle_hub_8_bit_promo_vector_by_skeptic_mousey-d4yxih6.png", pWidth/2, pHeight/2, 125, 125);
        // Customizing our object with an image 

        rect1.hide();

        rect1.xpos=pWidth/2;        // Adding some properties to dot just to keep track of its "state"
        rect1.ypos=pHeight/2;
        rect1.xrate=5;
        rect1.yrate=5;


        //------------------------------------------------------ 
        //This allows us to click the rectangle, and to also keep count of the no. of times
        
        rect1.node.addEventListener('click', function(){   
            clickCount++;
            console.log("ur click count is now " + clickCount)
        });

        //This allows us to click the 'start' button and executing its function
        startButton.node.addEventListener('click', start);
        
        //------------------------------------------------------
        //The function that will allow the square to move around the canvas

        var moveSquare = function(){   

            rect1.xpos += rect1.xrate;
            rect1.ypos += rect1.yrate; 

            rect1.attr({'x': rect1.xpos, 'y': rect1.ypos}); 
            scoreNum.attr({text:clickCount});

            if (rect1.xpos > pWidth) {rect1.xrate = -rect1.xrate;};
            if (rect1.ypos > pHeight) {rect1.yrate = - rect1.yrate};
            if (rect1.xpos < 0) {rect1.xrate = -rect1.xrate;};
            if (rect1.ypos < 0) {rect1.yrate = - rect1.yrate};


        };

    }
);