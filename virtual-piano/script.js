const keys = document.querySelectorAll('.piano-key');

// key arrays need to identify what key was pressed on keyboard
const WHITE_KEYS = ['KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'];
const BLACK_KEYS = ['KeyR', 'KeyT', 'KeyU', 'KeyI', 'KeyO', 'KeyP'];

const whiteKeys = document.querySelectorAll('.piano-key')
const blackKeys = document.querySelectorAll('.piano-key.sharp')


keys.forEach(key => {



// working old code
    // key.addEventListener('mousedown', () => playNote(key));

    key.addEventListener('mousedown',playNote);
    key.addEventListener('mouseup', removeActiveClass);




    //playing sound and add active class on "click" of mousedown
    
    //removing active effect on mouseup
    

    key.addEventListener('mouseout', removeActiveClass)
    // add mouseover to remove styles when we are not on klavier
});

window.addEventListener('mouseup', stopPlayAtover);

//keyboard - add music on pressed key. Notice that we've added it to the document (not to key as above)
document.addEventListener('keydown', e => {
  
    const key = e.code;
    //e.code allows us to identify pressed button independently from keyboard layout and turned Caps Lock since all the pressed keys are always in English lanuage
      
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key); 

    console.log(`current whiteKey is ${whiteKeys[whiteKeyIndex]}`);

    
    if (whiteKeyIndex > - 1) {
        playNoteAtKey(whiteKeys[whiteKeyIndex]); 
        // обращаемся соответствующую индексу среди коллекции .piano-key клавишу (див) и вызываем на ней функцию playNote
    } else if (blackKeyIndex > - 1) {
        playNoteAtKey(blackKeys[blackKeyIndex]);
    }
})

//remove pressed effect on pressed key
document.addEventListener('keyup', e => {

    const key = e.code; // what key we pressed on keyboard
   
    const whiteKeyIndex = WHITE_KEYS.indexOf(key); 
    const blackKeyIndex = BLACK_KEYS.indexOf(key); 
    //remove mouseover listener that plays music on keyup
    stopPlayAtover();
    
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


function removeActiveClass(event) { 
    let unpressedDiv = event.target;
    //remove active css klavier styles
    unpressedDiv.classList.remove('piano-key-active-mouse'); 
    unpressedDiv.classList.remove('piano-key-active-pseudo');
    unpressedDiv.classList.remove('piano-key-active'); 

}
// we do need additional playNote function below to pass another argument (pressed Key, but not "click" mouse event)
function playNoteAtKey(pressedDiv) {

    
    // add active css klavier styles
    pressedDiv.classList.add('piano-key-active'); 
    pressedDiv.classList.add('piano-key-active-mouse');
    pressedDiv.classList.add('piano-key-active-pseudo');
   
    const noteAudio = document.getElementById(pressedDiv.dataset.note);
    // мы обращаемся к конкретной нажатой сейчас клавише (диву) и далее обращаемся к его атрибуту data-note с помощью key.dataset.note. Наше значение атрибута data-note будет корреспондировать атрибуту id в тегах audio (они одинаковы). Мы работаем соответственно в этом коде мы возвращаем конркретный audio

    noteAudio.currentTime = 0;

    
    
    noteAudio.play();

    const allDivs = document.querySelectorAll('.piano-key');
    allDivs.forEach((e) => {
        e.addEventListener('mouseover', playNoteAtover);
    });

    // keys.addEventListener('mouseover', playNote(key));


}


function playNote(event) {


    
    let pressedDiv = event.target;
   
    
    // add active css klavier styles
    pressedDiv.classList.add('piano-key-active'); 
    pressedDiv.classList.add('piano-key-active-mouse');
    pressedDiv.classList.add('piano-key-active-pseudo');
   
    const noteAudio = document.getElementById(pressedDiv.dataset.note);
    // мы обращаемся к конкретной нажатой сейчас клавише (диву) и далее обращаемся к его атрибуту data-note с помощью key.dataset.note. Наше значение атрибута data-note будет корреспондировать атрибуту id в тегах audio (они одинаковы). Мы работаем соответственно в этом коде мы возвращаем конркретный audio

    noteAudio.currentTime = 0;

    
    
    noteAudio.play();

    const allDivs = document.querySelectorAll('.piano-key');
    allDivs.forEach((e) => {
        e.addEventListener('mouseover', playNoteAtover);
    });

    // keys.addEventListener('mouseover', playNote(key));


}

function playNoteAtover(event) {

    
    let pressedDiv = event.target;
    const noteAudio = document.getElementById(pressedDiv.dataset.note);
    noteAudio.currentTime = 0;
    
    pressedDiv.classList.add('piano-key-active'); 
    pressedDiv.classList.add('piano-key-active-mouse');
    pressedDiv.classList.add('piano-key-active-pseudo');
    
    noteAudio.play();

}

function stopPlayAtover(event) {
    const allDivs = document.querySelectorAll('.piano-key');
    allDivs.forEach((e) => {
        e.removeEventListener('mouseover', playNoteAtover);
    });
}



// button toggle Notes/Letters
const notesButton = document.querySelector('.btn-notes');
const lettersButton = document.querySelector('.btn-letters');

notesButton.addEventListener('click', toggleToLetters);
lettersButton.addEventListener('click', toggleToNotes);

function toggleToLetters() {
    //changing button style
    lettersButton.classList.remove('btn-active');
    notesButton.classList.add('btn-active');
    
    //changing class that applies to the pseudo elements (this case we need "content: attr(data-letter" property to apply)
    keys.forEach(key => {
        key.classList.remove('piano-key-letter');
    })
}
function toggleToNotes() {
    //changing button style
    notesButton.classList.remove('btn-active');
    lettersButton.classList.add('btn-active');

    keys.forEach(key => {
        key.classList.add('piano-key-letter');
    })
}

// fullscreen toggler
let fullscreenBtn = document.querySelector('.fullscreen');
fullscreenBtn.addEventListener('click', toggleScreen);

function toggleScreen() {
    if (document.fullscreenElement === null) {
        document.documentElement.requestFullscreen();

    } else {
        document.exitFullscreen();
    }
}