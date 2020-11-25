(async function () {
    /**'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
     * Promises 
     * / 
    /* Part 1: Number facts */
    let lucky_num = 33
    let base_url1 = 'http://numbersapi.com';

    // Favorite number request
    axios.get(`${base_url1}/${lucky_num}/`, { params: { 'json': true } })
        .then(res => console.log(res))
        .catch(err => console.log(err));


    // Multiple number request
    axios.get(`${base_url1}/1..10/`, { params: { 'json': true } })
        .then(res => console.log(res))
        .catch(err => console.log(err));

    // Multiple facts request
    for (i = 0; i < 4; i++) {
        axios.get(`${base_url1}/${lucky_num}/`, { params: { 'json': true } })
            .then(res => {
                const part1 = document.getElementById('part1-promises');
                const p = document.createElement('p');
                p.innerText = res.data.text;
                part1.append(p);
            })
            .catch(err => console.log(err));
    }


    /* Part 2: Deck Cards */
    base_url2 = 'https://deckofcardsapi.com/api/deck';

    // Single card shuffled deck request
    axios.get(`${base_url2}/new/shuffle/`, { params: { 'deck_count': 1 } })
        .then(res => {
            const deck_id = res.data.deck_id;
            axios.get(`${base_url2}/${deck_id}/draw`, { params: { 'count': 1 } })
                .then(res => {
                    const value = res.data.cards[0].value;
                    const suit = res.data.cards[0].suit;

                    console.log(`${value} of ${suit}`)
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    // Two cards shuffled deck
    axios.get(`${base_url2}/new/shuffle/`, { params: { 'deck_count': 1 } })
        .then(res => {
            const deck_id = res.data.deck_id;
            for (i = 0; i < 2; i++) {
                axios.get(`${base_url2}/${deck_id}/draw`, { params: { 'count': 1 } })
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
    axios.get(`${base_url2}/new/shuffle/`, { params: { 'deck_count': 1 } })
        .then(res => {
            let cardsLeft = res.data.remaining;
            const deck_id = res.data.deck_id;
            const part2 = document.getElementById('part2-promises')
            const btn = document.createElement('button');
            btn.innerText = 'GIMME A CARD';
            part2.append(btn);

            btn.addEventListener('click', e => {
                if (cardsLeft > 0) {
                    axios.get(`${base_url2}/${deck_id}/draw`, { params: { 'count': 1 } })
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

    /**'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
     * Async 
     * / 
    /* Part 1: Number facts */
    lucky_num = 33
    base_url3 = 'http://numbersapi.com';

    // Favorite number request
    let res = await axios.get(`${base_url3}/${lucky_num}/`, { params: { 'json': true } });
    console.log(res);


    // Multiple number request
    res = await axios.get(`${base_url3}/1..10/`, { params: { 'json': true } });
    console.log(res);

    // Multiple facts request
    for (i = 0; i < 4; i++) {
        res = await axios.get(`${base_url3}/${lucky_num}/`, { params: { 'json': true } });

        const part1 = document.getElementById('part1-async');
        const p = document.createElement('p');
        p.innerText = res.data.text;
        part1.append(p);
    }


    /* Part 2: Deck Cards */
    base_url4 = 'https://deckofcardsapi.com/api/deck';

    // Single card shuffled deck request
    res = await axios.get(`${base_url4}/new/shuffle/`, { params: { 'deck_count': 1 } })

    let deck_id = res.data.deck_id;
    res = await axios.get(`${base_url4}/${deck_id}/draw`, { params: { 'count': 1 } })
    let value = res.data.cards[0].value;
    let suit = res.data.cards[0].suit;

    console.log(`${value} of ${suit}`);

    // Two cards shuffled deck
    res = await axios.get(`${base_url4}/new/shuffle/`, { params: { 'deck_count': 1 } })
    deck_id = res.data.deck_id;
    for (i = 0; i < 2; i++) {
        res = await axios.get(`${base_url4}/${deck_id}/draw`, { params: { 'count': 1 } })
        value = res.data.cards[0].value;
        suit = res.data.cards[0].suit;

        console.log(`${value} of ${suit}`)
    }

    // Draw a deck of cards
    res = await axios.get(`${base_url4}/new/shuffle/`, { params: { 'deck_count': 1 } })

    let cardsLeft = res.data.remaining;
    deck_id = res.data.deck_id;
    const part2 = document.getElementById('part2-async')
    const btn = document.createElement('button');
    btn.innerText = 'GIMME A CARD';
    part2.append(btn);

    btn.addEventListener('click', async e => {
        if (cardsLeft > 0) {
            res = await axios.get(`${base_url4}/${deck_id}/draw`, { params: { 'count': 1 } })
            const value = res.data.cards[0].value;
            const suit = res.data.cards[0].suit;

            const p = document.createElement('p');
            p.innerText = `${value} of ${suit}`;
            part2.append(p);

            cardsLeft--;
        } else if (cardsLeft === 0) {
            btn.remove();
        }
    });
})();