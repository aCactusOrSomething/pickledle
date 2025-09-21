const VEGGIES = [
    '🍆',
    '🥔',
    '🧄',
    '🌽',
    '🌶️',
    '🫑',
    '🥒',
    '🥬',
    '🥦',
    '🥕',
    '🧅',
    '🥜',
    '🫘',
    '🌰',
    '🫚',
    '🫛',
    '🍄‍🟫',
    '🍄',
    '🫜'
];

const JAR = '🫙';

const START_DATE = new Date('2025-09-19');
const TODAY = new Date();
const MS_PER_DAY = 1000 * 60 * 60 * 24;

//the puzzle number is Days Since Start Date
const PUZZLE_NUM = Math.floor((TODAY - START_DATE) / MS_PER_DAY) + 1;
const VEGGIES_PER_PUZZLE = 4;


const OUTPUT_ELEMENT = document.getElementById('main');
const TITLE_ELEMENT = document.getElementById('title');

TITLE_ELEMENT.textContent = "Pickledle #" + PUZZLE_NUM;
OUTPUT_ELEMENT.innerHTML = "Choose a mystery vegetable to pickle:<br/>";

//so it turns out Math.random() can't be seeded
//so i  have to make my own random number generator/ whoopty doo
// this uses the Linear Congruential Method
let Random = {
    x: PUZZLE_NUM,
    m: VEGGIES.length,
    a: 3,
    c: 3,
    getNext: function() {
        this.x = ((this.x * this.a) + this.c) % this.m;
        return this.x;
    }
}

//each veggie for today should have a corresponding button that looks like that vegetable but shadow only
function getVeggieButton(veggie) {
    let veggieButton = document.createElement('button');
    veggieButton.innerHTML = veggie;
    veggieButton.className = 'mystery';
    veggieButton.onclick = function() {
        OUTPUT_ELEMENT.innerHTML = getScoreOutput(veggie, PUZZLE_NUM);
    };
    return veggieButton;
}

function getScoreOutput(veggie, puzzleNum) {
    let scoreOutput = `Good job! Here is todays score:<br/><pre>Pickledle #${puzzleNum}
${veggie}
${JAR}</pre>`;
    return scoreOutput;
}

let todaysVeggies = []
for(let i = 0; i < VEGGIES_PER_PUZZLE; i++) {
    todaysVeggies.push(VEGGIES[Random.getNext()]);
    OUTPUT_ELEMENT.appendChild(getVeggieButton(todaysVeggies[i]));
}


