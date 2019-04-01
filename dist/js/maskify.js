'use strict';

/**
 * Create a mask to an input and bind the element to a keydown event.
 * 
 * @param {string} mask String used as the mask for the input
 * @return void
 */
Element.prototype.maskify = function(mask, options = null) {
    if(options === null) {
        options = {
            debug: false
        }
    }

    const OPTIONS = options;
    // Keycodes that will be processed
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
    // Special chars that will be considered when inserting masks
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
    // An array including each char of the mask
    const SPLITMASK = mask.split('');
    
    this.setAttribute('placeholder', mask);
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
        /* Prevent that the user input appear before it be processed */
        event.preventDefault();
        
        /* Debug ON */
        if(OPTIONS.debug) {
            console.log(event.key);
        }

        /**
         * The current value of the target input
         * This value is all the characters that already have been entered in the input
         */
        let targetValue = event.target.value;

        /**
         * Process the keycodes declared above
         */
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
    
        /**
         * Process the special characteres
         */
        if(SPECIALCHARS.includes(SPLITMASK[targetValue.length])) {
            event.target.value += SPLITMASK[targetValue.length];

            let nextChar = NextMaskChar(targetValue.length);
            if(nextChar !== '') event.target.value += nextChar;
        }
    
        /**
         * If the char is an alphanumeric char, include it in the input
         */
        event.target.value += event.key;
    }
}
