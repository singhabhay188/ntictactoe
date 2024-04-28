let button = document.querySelector('button');
let warn = document.querySelector('#warning');

button.addEventListener('click', function() {
    let n = document.querySelector('input').value;
    n = Number.parseInt(n);
    console.log(n);
    
    if(isNaN(n) || n < 3 || n >  9) {
        warn.classList.remove('hidden');
    }
    else{
        warn.classList.add('hidden');
        window.location.href = 'game.html?n=' + n;
    }
});