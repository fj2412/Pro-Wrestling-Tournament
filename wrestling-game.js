const fs = require('fs');

function wrestlingGame() {
    const filePath = 'data.json';
    let wrestlers = [];
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            console.log('Data:', jsonData);
            wrestlers = jsonData;
            wrestlers.forEach(wrestler => {
                console.log('Wrestler:', wrestler.name);
                wrestler.moves.forEach(move => {
                    console.log('Move:', move.name, '- Damage:', move.damage, '- Type:', move.type);
                });
                console.log(wrestler.moves[Math.floor(Math.random() * wrestler.moves.length)]);
            });
        } catch (err) {
            console.error('Error during parsing JSON:', err);
        }
    });

}


wrestlingGame();
