(function () {
    /* Part 1: Number facts */
    let lucky_num = 33
    let base_url = 'http://numbersapi.com';

    // Favorite number request
    axios.get(`${base_url}/${lucky_num}/`, { params: { 'json': true } })
        .then(res => console.log(res))
        .catch(err => console.log(err));


    // Multiple number request
    axios.get(`${base_url}/1..10/`, { params: { 'json': true } })
        .then(res => console.log(res))
        .catch(err => console.log(err));

    // Multiple facts request
    for (i = 0; i < 4; i++) {
        axios.get(`${base_url}/${lucky_num}/`, { params: { 'json': true } })
            .then(res => {
                const part1 = document.getElementById('part1');
                const p = document.createElement('p');
                p.innerText = res.data.text;
                part1.append(p);
            })
            .catch(err => console.log(err));
    }


    /* Part 2: Deck Cards */
    base_url = 'https://deckofcardsapi.com/api/deck';

    // Single card shuffled deck request
    axios.get(`${base_url}/new/shuffle/`, { params: { 'deck_count': 1 } })
        .then(res => {
            const deck_id = res.data.deck_id;
            axios.get(`${base_url}/${deck_id}/draw`, { params: { 'count': 1 } })
                .then(res => {
                    const value = res.data.cards[0].value;
                    const suit = res.data.cards[0].suit;

                    console.log(`${value} of ${suit}`)
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    // Two cards shuffled deck
    axios.get(`${base_url}/new/shuffle/`, { params: { 'deck_count': 1 } })
        .then(res => {
            const deck_id = res.data.deck_id;
            for (i = 0; i < 2; i++) {
                axios.get(`${base_url}/${deck_id}/draw`, { params: { 'count': 1 } })
                    .then(res => {
                        const value = res.data.cards[0].value;
                        const suit = res.data.cards[0].suit;

                        console.log(`${value} of ${suit}`)
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));

    // Draw a deck of cards
    axios.get(`${base_url}/new/shuffle/`, { params: { 'deck_count': 1 } })
        .then(res => {
            let cardsLeft = res.data.remaining;
            const deck_id = res.data.deck_id;
            const part2 = document.getElementById('part2')
            const btn = document.createElement('button');
            btn.innerText = 'GIMME A CARD';
            part2.append(btn);

            btn.addEventListener('click', e => {
                if (cardsLeft > 0) {
                    axios.get(`${base_url}/${deck_id}/draw`, { params: { 'count': 1 } })
                        .then(res => {
                            const value = res.data.cards[0].value;
                            const suit = res.data.cards[0].suit;

                            const p = document.createElement('p');
                            p.innerText = `${value} of ${suit}`;
                            part2.append(p);

                            cardsLeft--;
                        })
                        .catch(err => console.log(err));
                } else if (cardsLeft === 0) {
                    btn.remove();
                }
            });
        })
        .catch(err => console.log(err));
})();