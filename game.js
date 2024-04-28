let gameBox = document.querySelector('#gameBox');
let message = document.querySelector('#message');

let n = window.location.href.split('n=')[1];
n = Number.parseInt(n);
if(n < 3 || n > 9 || isNaN(n)) {
    window.location.href = 'index.html';
}

//first create a 2d array of n x n
function create2dArray(n){
    let arr = [];
    for(let i=0;i<n;i++){
        let tarr = [];
        for(let j=0;j<n;j++){
            tarr.push('');
        }
        arr.push(tarr);
    }
    return arr;
}
let arr = create2dArray(n);

let isX = true;

//now create gameBox
function fillGameBox(){
    gameBox.innerHTML = ''
    for(let i=0;i<n;i++){
        let row = document.createElement('div');
        row.classList.add('flex','gap-2');
        for(let j=0;j<n;j++){
            let cell = document.createElement('div');
            cell.id = i + '' + j;
            cell.classList.add('w-[50px]','h-[50px]','bg-white','flex','items-center','justify-center','text-3xl','font-semibold');
            row.appendChild(cell);
        }
        gameBox.appendChild(row);
    }    
}
fillGameBox();

//add event listener to gameBox
gameBox.addEventListener('click',function(e){
    let cell = e.target;
    if(cell.id){
        let i = Number.parseInt(cell.id[0]);
        let j = Number.parseInt(cell.id[1]);
        
        if(arr[i][j] === ''){
            cell.innerText = isX ? 'X' : 'O';
            arr[i][j] = isX ? 'X' : 'O';

            let result = checkWinner(i,j);
            if(result){
                let result = isX ? 'X wins' : 'O wins';
                setTimeout(() => {
                    alert(`Congratulations ${result}`);
                    window.location.reload();
                }, 100);
            }

            isX = !isX;
            message.innerText = isX ? 'X turn' : 'O turn';
        }
    }
});

function checkWinner(r,c){
    //check row
    let count = 0;
    for(let j=0;j<n;j++){
        if(arr[r][j] == arr[r][c]) count++;
    }
    if(count == n) return true;

    //check column
    count = 0;
    for(let i=0;i<n;i++){
        if(arr[i][c] == arr[r][c]) count++;
    }
    if(count == n) return true;

    //check diagonal if r==c
    if(r==c){
        count = 0;
        for(let i=0;i<n;i++){
            if(arr[i][i] == arr[r][c]) count++;
        }
        if(count == n) return true;
    }

    ///check diagonal if r+c == n-1
    if(r+c == n-1){
        count = 0;
        for(let i=0;i<n;i++){
            if(arr[i][n-1-i] == arr[r][c]) count++;
        }
        if(count == n) return true;
    }

    return false;
}