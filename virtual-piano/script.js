const keys = document.querySelectorAll('.piano-key');

// key arrays need to identify what key was pressed on keyboard
const WHITE_KEYS = ['KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'];
const BLACK_KEYS = ['KeyR', 'KeyT', 'KeyU', 'KeyI', 'KeyO', 'KeyP'];

const whiteKeys = document.querySelectorAll('.piano-key')
const blackKeys = document.querySelectorAll('.piano-key.sharp')


keys.forEach(key => {
    key.addEventListener('click', () => playNote(key));
    key.addEventListener('mouseup', () => removeActiveClass(key));
    key.addEventListener('mousedown', () => addActiveClass(key))
   
});








//keyboard - add music on pressed key. Notice that we've added it to the document (not to key as above)
document.addEventListener('keydown', e => {

  
    const key = e.code;
    //e.code allows us to identify pressed button independently from keyboard layout and turned Caps Lock since all the pressed keys are always in English lanuage
      
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key); 

    
    if (whiteKeyIndex > - 1) {
        playNote(whiteKeys[whiteKeyIndex]); // обращаемся соответствующую индексу среди коллекции .piano-key клавишу (див) и вызываем на ней функцию playNote
        whiteKeys[whiteKeyIndex].classList.add('piano-key-active');
        whiteKeys[whiteKeyIndex].classList.add('piano-key-active-mouse'); //add hover effect on text color when pressed
        whiteKeys[whiteKeyIndex].classList.add('piano-key-active-pseudo');//add hover effect on text color when pressed
        //if true - firstly: play sound and, secondly, add "pressedEffect"
        
    } else if (blackKeyIndex > - 1) {
        playNote(blackKeys[blackKeyIndex]);
        blackKeys[blackKeyIndex].classList.add('piano-key-active');
        blackKeys[blackKeyIndex].classList.add('piano-key-active-mouse'); //add hover effect on text color when pressed
        blackKeys[blackKeyIndex].classList.add('piano-key-active-pseudo');//add hover effect on text color when pressed
    }
})

//remove pressed effect on pressed key
document.addEventListener('keyup', e => {

    const key = e.code; // what key we pressed on keyboard
   
    const whiteKeyIndex = WHITE_KEYS.indexOf(key); 
    const blackKeyIndex = BLACK_KEYS.indexOf(key); 
    
    
    if (whiteKeyIndex > - 1) {
        whiteKeys[whiteKeyIndex].classList.remove('piano-key-active');
        whiteKeys[whiteKeyIndex].classList.remove('piano-key-active-mouse');
        whiteKeys[whiteKeyIndex].classList.remove('piano-key-active-pseudo');
        //if (true) - remove "pressedEffect"
        
    } else if (blackKeyIndex > - 1) {
        blackKeys[blackKeyIndex].classList.remove('piano-key-active');
        blackKeys[blackKeyIndex].classList.remove('piano-key-active-mouse')
        blackKeys[blackKeyIndex].classList.remove('piano-key-active-pseudo');
    }
})


//mouse - hover effect on letter, not scale
function removeActiveClass(key) { 
    key.classList.remove('piano-key-active-mouse');  //remove hover effect on text color when pressed
    key.classList.remove('piano-key-active-pseudo'); //remove hover effect on text color when pressed

    key.classList.remove('piano-key-active'); //remove scale effect when pressed klavier
}

function addActiveClass(key) {

    console.log(key);


    key.classList.add('piano-key-active'); //add scale effect when pressed klavier
    
    key.classList.add('piano-key-active-mouse'); //add hover effect on text color when pressed
    key.classList.add('piano-key-active-pseudo');//add hover effect on text color when pressed
}

//playing audio on mouseclick
function playNote(key) {
    const noteAudio = document.getElementById(key.dataset.note);
    // мы обращаемся к конкретной нажатой сейчас клавише (диву) и далее обращаемся к его атрибуту data-note с помощью key.dataset.note. Наше значение атрибута data-note будет корреспондировать атрибуту id в тегах audio (они одинаковы). Мы работаем соответственно в этом коде мы возвращаем конркретный audio

    noteAudio.currentTime = 0;
    // позволяет нажимать несколько раз на клавишу, чтобы звук проигрывался, не дожидаясь окончания предыдущего нажатия
    noteAudio.play();
    
}

    
    