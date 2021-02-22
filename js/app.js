const cartes = document.querySelectorAll('.carte')
let allCards = [];
let firstCard, secondCard
let retournement = false
let verrouillage = false
let parring = 0;
let resultat = 0;
const tableauScore = document.querySelector('.tableauScore')

//initialisation 
cartes.forEach(carte => {
    let random = Math.floor(Math.random() * 12)
    carte.style.order = random
})

for (let i = 0; i < cartes.length; i++) {
    const carte = new card(i);
    allCards.push(carte);
}

function card(numero) {
    this.dom = cartes[numero],
        this.name = cartes[numero].getAttribute('data-name')
    this.ordre = 0
    this.check = false
}



allCards.forEach(element => {

    element.dom.addEventListener('click', e => {

        if (verrouillage) return
        if (element.check) return

        element.dom.childNodes[1].classList.add('active')

        if (!retournement) {
            retournement = true;
            element.ordre = 1
            element.check = true
            return
        }
        retournement = false;
        element.ordre = 2
        element.check = true
        comparaison();

    })
})

function comparaison() {

    let carte1 = allCards.filter(e => e.ordre === 1)[0];
    let carte2 = allCards.filter(e => e.ordre === 2)[0];

    if (carte1.name === carte2.name) {
        parring++;

    } else {
        console.log('nonmatch');
        verrouillage = true
        resultat++
        setTimeout(() => {
            carte1.dom.childNodes[1].classList.remove('active')
            carte2.dom.childNodes[1].classList.remove('active')
            carte1.check = false;
            carte2.check = false;
            verrouillage = false
        }, 1000)

    }

    carte1.ordre = 0
    carte2.ordre = 0
    if (parring == 6) {
        resultat = resultat + 6

        setTimeout(() => {
            tableauScore.classList.add('active')
            const rejouer = document.querySelector('.rejouer')
            const score = document.querySelector('.score')
            const commentaires = document.querySelector('.commentaires')
            score.innerText = resultat

            if (resultat > 0 && resultat < 7) commentaires.innerText = "Tricheur"
            if (resultat > 6 && resultat < 9) commentaires.innerText = "Incroyable"
            if (resultat > 8 && resultat < 11) commentaires.innerText = "Beau Gosse"
            if (resultat > 10 && resultat < 13) commentaires.innerText = "Bof"
            if (resultat > 12 && resultat < 15) commentaires.innerText = "Gros looser"
            if (resultat > 14 && resultat < 17) commentaires.innerText = "Grosse tâche"
            if (resultat > 16) commentaires.innerText = "Tout pourrite"

            rejouer.addEventListener('click', () => {
                window.location.reload()
            })
        }, 300)

    }

}


