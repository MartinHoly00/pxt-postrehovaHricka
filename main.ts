let leftPressed = false
let rightPressed = false



let leftStartToPressed = 0
let rightStartToPressed = 0

const leftDP: DigitalPin = DigitalPin.P15;
let leftD: boolean = false;
pins.setPull(leftDP, PinPullMode.PullNone)

const rightDP: DigitalPin = DigitalPin.P14;
let rightD: boolean = false;
pins.setPull(rightDP, PinPullMode.PullNone)

basic.forever(function () {
    leftD = pins.digitalReadPin(leftDP) === 0; //leftD je true, pokud detekuje překážku
    basic.pause(20);

    rightD = pins.digitalReadPin(rightDP) === 0; //rightD je true, pokud detekuje překážku
    basic.pause(20);
})


input.onButtonPressed(Button.A, function() {

    let startTime = input.runningTime()

    let delayStartTime = Math.random() * (4 + 2) * 1000 
    basic.pause(delayStartTime)

    basic.showLeds(`
    # # # # #
    # . . . #
    # . # . #
    # . . . #
    # # # # #
    `)

    
    music.playTone(440, 1500)
    
    

    if(leftD == true){
        let leftEndTime = input.runningTime()
        let leftStartToPressed = leftEndTime - startTime
    }

    if(rightD == true){
        let rightEndTime = input.runningTime()
        let rightStartToPressed = rightEndTime - startTime
    }

    if (leftStartToPressed * 1000 < delayStartTime || rightStartToPressed * 1000 < delayStartTime){
        
    }else{
        if(leftStartToPressed < rightStartToPressed){
        basic.showNumber(1)
        }

        if (leftStartToPressed > rightStartToPressed) {
         basic.showNumber(2)
        }
    
        if (leftStartToPressed == rightStartToPressed) {
            basic.showString("R")
        }
    }
    
    
    basic.clearScreen()


})
