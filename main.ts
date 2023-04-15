let leftStartToPressed = 0
let rightStartToPressed = 0

const leftDP: DigitalPin = DigitalPin.P15;
let leftD: boolean = false;
pins.setPull(leftDP, PinPullMode.PullNone)

const rightDP: DigitalPin = DigitalPin.P14;
let rightD: boolean = false;
pins.setPull(rightDP, PinPullMode.PullNone)

control.inBackground(function () {
    basic.forever(function () {
        leftD = pins.digitalReadPin(leftDP) === 0; //leftD je true, pokud detekuje překážku
        basic.pause(20);

        rightD = pins.digitalReadPin(rightDP) === 0; //rightD je true, pokud detekuje překážku
        basic.pause(20);
    })
})

basic.forever(function () {

    let startTime = input.runningTime()

    let delayStartTime = Math.random() * 4 + 2
    basic.pause(delayStartTime * 1000)

    basic.showLeds(`
    # # # # #
    # . . . #
    # . # . #
    # . . . #
    # # # # #
    `,0)

    
    music.playTone(440, 1500)
    
    let timeAfterStart = input.runningTime()
    let timeDelay = timeAfterStart - startTime


    if(leftD == true){
        let leftEndTime = input.runningTime()
        leftStartToPressed = leftEndTime - startTime
    }

    if(rightD == true){
        let rightEndTime = input.runningTime()
        rightStartToPressed = rightEndTime - startTime
    }

    if (leftStartToPressed < timeDelay || rightStartToPressed < timeDelay){
        if(leftStartToPressed < timeDelay){
            basic.showString("B")
        }else if(rightStartToPressed < timeDelay){
            basic.showString("A")
        }else{
            basic.showString("C")
        }
    }else{ 
        if(leftStartToPressed < rightStartToPressed){
            basic.showNumber(1)
        }else if(leftStartToPressed > rightStartToPressed){
            basic.showNumber(2)
        }else{
            basic.showString("R")
        }
    
    }
    
    
    basic.clearScreen()


})
