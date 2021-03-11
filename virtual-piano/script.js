const keys = document.querySelectorAll('.piano-key');

// key arrays need to identify what key was pressed on keyboard
const WHITE_KEYS = ['d', 'f', 'g', 'h', 'j', 'k', 'l'];
const BLACK_KEYS = ['r', 't', 'u', 'i', 'o', 'p'];

const whiteKeys = document.querySelectorAll('.piano-key')
const blackKeys = document.querySelectorAll('.piano-key.sharp')


keys.forEach(key => {
    key.addEventListener('click', () => playNote(key));
    key.addEventListener('mouseup', () => removeActiveClass(key));
    key.addEventListener('mousedown', () => addActiveClass(key))
})

// add music on pressed key
document.addEventListener('keydown', e => {
    const key = e.key; // what key we pressed on keyboard
    const whiteKeyIndex = WHITE_KEYS.indexOf(key); 
    const blackKeyIndex = BLACK_KEYS.indexOf(key); 
    
    if (whiteKeyIndex > - 1) playNote(whiteKeys[whiteKeyIndex])
    if (blackKeyIndex > - 1) playNote(blackKeys[blackKeyIndex])
})


//hover effect on letter, not scale
function removeActiveClass(key) { 
    key.classList.remove('piano-key-active-mouse');  //remove hover effect on text color when pressed
    key.classList.remove('piano-key-active-pseudo'); //remove hover effect on text color when pressed

    key.classList.remove('piano-key-active'); //remove scale effect when pressed klavier
}

function addActiveClass(key) {
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
    

    

    // key.classList.add('piano-key-active');
    // //мы добавляем в класс нажатой клавишы класс piano-key.active, однако...
    // noteAudio.addEventListener('ended', () => {
    //     key.classList.remove('piano-key-active');
    // // чтобы убрать этот класс, когда мелодия закончилась (убрать эффект нажатия) - мы добавляем eventlistener на событие 'ended' - музыка закончилась играть -> убери класс piano-key-active
        
    // })
}

    
    