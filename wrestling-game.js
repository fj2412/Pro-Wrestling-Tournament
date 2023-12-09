const fs = require('fs');
const { promisify } = require('util');

async function wrestlingGame() {
    const filePath = 'data.json';
    let wrestlers = [];
    const readFileAsync = promisify(fs.readFile);
    try {
        const data = await readFileAsync(filePath);
        wrestlers = JSON.parse(data);
    } catch (err) {
        console.error('Error:', err);
    }

    let match = 1;
    while (wrestlers.length !== 1) {
        let wrestlerA = wrestlers.shift();
        let wrestlerB = wrestlers.shift();
        console.log("\nMatch " + match +":", wrestlerA.name, 'vs.', wrestlerB.name);
        if (isEmpty(wrestlerA)) {
            wrestlers.push(wrestlerB);
            console.log(wrestlerB.name, "got a bye");
        } else if (isEmpty(wrestlerB)) {
            wrestlers.push(wrestlerA);
            console.log(wrestlerA.name, "got a bye");
        } else {
            let freshA = JSON.parse(JSON.stringify(wrestlerA));
            let freshB = JSON.parse(JSON.stringify(wrestlerB));
            let round = 1;
            while (wrestlerA.health > 0 && wrestlerB.health > 0) {
                console.log("Round " + round + ":");
                let finisherHitChance = Math.random();
                if (round % 2 === 1) {
                    // wrestler A turn
                    let move = wrestlerA.moves[Math.floor(Math.random() * wrestlerA.moves.length)];
                    if (move.type === 'finisher' && wrestlerB.health <= 45) {
                        wrestlerB.health -= move.damage;
                        console.log(wrestlerA.name, "performs", move.name, "on", wrestlerB.name);
                        console.log(wrestlerB.name, "health:", wrestlerB.health);
                        break;
                    } else if (move.type === 'finisher' && finisherHitChance > 0.5) {
                        wrestlerB.health -= move.damage;
                        console.log(wrestlerA.name, "performs", move.name, "on", wrestlerB.name);
                        console.log(wrestlerB.name, "health:", wrestlerB.health);
                        break;
                    } else if (move.type === 'finisher' && finisherHitChance <= 0.5) {
                        console.log(wrestlerA.name, "fails to perform", move.name, "on", wrestlerB.name);
                        console.log(wrestlerB.name, "health:", wrestlerB.health);
                    } else {
                        wrestlerB.health -= move.damage;
                        console.log(wrestlerA.name, "performs", move.name, "on", wrestlerB.name);
                        console.log(wrestlerB.name, "health:", wrestlerB.health);
                    }
                } else {
                    // wrestler B turn
                    let move = wrestlerB.moves[Math.floor(Math.random() * wrestlerB.moves.length)];
                    if (move.type === 'finisher' && wrestlerA.health <= 45) {
                        wrestlerA.health -= move.damage;
                        console.log(wrestlerB.name, "performs", move.name, "on", wrestlerA.name);
                        console.log(wrestlerA.name, "health:", wrestlerA.health);
                        break;
                    } else if (move.type === 'finisher' && finisherHitChance > 0.5) {
                        wrestlerA.health -= move.damage;
                        console.log(wrestlerB.name, "performs", move.name, "on", wrestlerA.name);
                        console.log(wrestlerA.name, "health:", wrestlerA.health);
                        break;
                    } else if (move.type === 'finisher' && finisherHitChance <= 0.5) {
                        console.log(wrestlerB.name, "fails to perform", move.name, "on", wrestlerA.name);
                        console.log(wrestlerA.name, "health:", wrestlerA.health);
                    } else {
                        wrestlerA.health -= move.damage;
                        console.log(wrestlerB.name, "performs", move.name, "on", wrestlerA.name);
                        console.log(wrestlerA.name, "health:", wrestlerA.health);
                    }
                }
                round++;
            }
            if (wrestlerA.health > wrestlerB.health) {
                console.log(freshA.name, "wins!");
                wrestlers.push(freshA);
            } else {
                console.log(freshB.name, "wins!");
                wrestlers.push(freshB);
            }
        }
        match++;
    }
    console.log("\n"+ wrestlers[0].name, "wins the tournament!");
}

function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  
    return true;
}

wrestlingGame();
