// import { wordList } from "./word";
const inputs=document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
wrongLetters = document.querySelector(".wrong-letters span"),
guessLeft = document.querySelector(".guess-left span"),
typingInput= document.querySelector(".typing-input");

let word,maxguess,corrects=[],incorrects=[];
function randomWord(){
    let ranObj= wordList[Math.floor(Math.random()*wordList.length)];
    word=ranObj.word;
    maxguess=Math.floor((word.length)/2);corrects=[],incorrects=[];
    hint.innerHTML=ranObj.hint;
    let  html=""
    guessLeft.innerHTML=maxguess;
    wrongLetters.innerHTML=incorrects;
    for( let i=0;i<word.length;i++){
        html +=`<input type="text" disabled></input>`;
    }
    inputs.innerHTML=html;
}
randomWord()
function initGame(e){
    let key=e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(` ${key}`)){  
        if(word.includes(key)){
            for(let i=0;i<word.length;i++){
                if(word[i]===key){
                    corrects.push(key)
                    inputs.querySelectorAll("input")[i].value=key;
                }
                typingInput.value =""
            }
        }else{
            incorrects.push(` ${key}`)
            maxguess--;
        }
        wrongLetters.innerHTML=incorrects;
        guessLeft.innerHTML=maxguess;
    }
    typingInput.value =""
    setTimeout(()=>{
        if(corrects.length===word.length){
            alert("Game Over!,you win");
        }
        else if(maxguess<1){
            alert("Game Over!,you don't have remaining guesses");
            for(let i=0;i<word.length;i++){
                inputs.querySelectorAll("input")[i].value=word[i];
            }
        }
    },500);

}
resetBtn.addEventListener("click",randomWord);
typingInput.addEventListener("input",initGame);
document.addEventListener("keydown",()=> typingInput.focus());
