'use strict';

/**
 * Create a mask to an input and bind the element to a keydown event.
 * 
 * @param {string} mask String used as the mask for the input
 * @return void
 */
Element.prototype.maskify = function(mask) {
    const KEYCODES = [
        8,  // backspace
        9,  // tab
        13, // enter
        16, // shift
        17, // ctrl
        18, // alt
        19, // pause/break
        20, // caps lock
        32, // space
    ];
    const SPECIALCHARS = [
        '(',
        ')',
        '.',
        '*',
        '[',
        ']',
        '{',
        '}',
        '-',
        ' '
    ];
    const SPLITMASK = mask.split('');
    
    this.addEventListener('keydown', HandleKeydownEvent);

    /**
     * Check the next character in the mask, if it is a special character return the char else return a empty string
     * @param {integer} currentIndex Current index of the mask in the function handleKeydownEvent
     * @return {string} special character if the next character is a special character, empty string if not
     */
    function NextMaskChar(currentIndex) {
        currentIndex++;

        if(SPECIALCHARS.includes(SPLITMASK[currentIndex])) return SPLITMASK[currentIndex];
        else return '';
    }
    
    /**
     * Event binded to input that will be masked.
     * @param {event} event - That parameter is passed by the addEventListener builtin of JavaScript.
     * @param {string} mask - This is the mask passed in the maskify function.
     */
    function HandleKeydownEvent(event) {
        event.preventDefault();
        let targetValue = event.target.value;

        if(KEYCODES.includes(event.keyCode)) {
            switch(event.keyCode) {
                case 8:
                    event.target.value = targetValue.slice(0, targetValue.length - 1);
                    return;
                case 32:
                    event.target.value += ' ';
                    return;
                default:
                    return;
            }
        }
    
        if(SPECIALCHARS.includes(SPLITMASK[targetValue.length])) {
            event.target.value += SPLITMASK[targetValue.length];

            let nextChar = NextMaskChar(targetValue.length);
            if(nextChar !== '') event.target.value += nextChar;
        }
    
        event.target.value += event.key;
    }
}