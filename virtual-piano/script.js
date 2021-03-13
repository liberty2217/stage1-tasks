const keys = document.querySelectorAll('.piano-key');
const WHITE_KEYS = ['KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL'];
const BLACK_KEYS = ['KeyR', 'KeyT', 'KeyU', 'KeyI', 'KeyO', 'KeyP'];
// key arrays need to identify what key was pressed on keyboard to relate it to the notes
const whiteKeys = document.querySelectorAll('.piano-key')
const blackKeys = document.querySelectorAll('.piano-key.sharp')


keys.forEach(key => {
    //play sound on mousedown ('click' event would be ended as it pressed)
    key.addEventListener('mousedown', playNote);

    key.addEventListener('mouseup', removeActiveClass);
    key.addEventListener('mouseout', removeActiveClass)
});

//when "unpress" mousedown on piano keys remove 'mouseover' (hovering effect) that plays notes;
window.addEventListener('mouseup', stopPlayAtover);

//play note on pressed keyboard button (we've added it to the document object);
document.addEventListener('keydown', e => {
    const key = e.code; // e.code doesnt depend on language and capslock
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key); 
    console.log(`current whiteKey is ${whiteKeys[whiteKeyIndex]}`);
   
    if (whiteKeyIndex > - 1) {
        playNoteAtKey(whiteKeys[whiteKeyIndex]); 
    } else if (blackKeyIndex > - 1) {
        playNoteAtKey(blackKeys[blackKeyIndex]);
    }
})

//remove active class on pressed key and stop playing music
document.addEventListener('keyup', e => {
    const key = e.code; 
    const whiteKeyIndex = WHITE_KEYS.indexOf(key); 
    const blackKeyIndex = BLACK_KEYS.indexOf(key); 
    //remove 'mouseover' handler that plays music on keyup
    stopPlayAtover();
    if (whiteKeyIndex > - 1) {
        whiteKeys[whiteKeyIndex].classList.remove('piano-key-active');
        whiteKeys[whiteKeyIndex].classList.remove('piano-key-active-mouse');
        whiteKeys[whiteKeyIndex].classList.remove('piano-key-active-pseudo');
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
// extra playNote function to pass another argument (pressed Key - not "click" mouseup event)
function playNoteAtKey(pressedDiv) {
    pressedDiv.classList.add('piano-key-active'); 
    pressedDiv.classList.add('piano-key-active-mouse');
    pressedDiv.classList.add('piano-key-active-pseudo');
    const noteAudio = document.getElementById(pressedDiv.dataset.note);
    // apply to the 'note' attribute
    noteAudio.currentTime = 0;
    noteAudio.play();

    //add event listener 'mouseover' when we pressed
    const allDivs = document.querySelectorAll('.piano-key');
    allDivs.forEach((e) => {
        e.addEventListener('mouseover', playNoteAtover);
    });
}
function playNote(event) {    
    let pressedDiv = event.target;
    pressedDiv.classList.add('piano-key-active'); 
    pressedDiv.classList.add('piano-key-active-mouse');
    pressedDiv.classList.add('piano-key-active-pseudo');
   
    const noteAudio = document.getElementById(pressedDiv.dataset.note);
    noteAudio.currentTime = 0;
    noteAudio.play();
    const allDivs = document.querySelectorAll('.piano-key');
    allDivs.forEach((e) => {
        e.addEventListener('mouseover', playNoteAtover);
    });
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
    lettersButton.classList.remove('btn-active');
    notesButton.classList.add('btn-active');

    keys.forEach(key => {
        key.classList.remove('piano-key-letter');
    })
}
function toggleToNotes() {
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