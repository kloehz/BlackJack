// Variables Globales
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias de HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.getElementById('btnDetener');
const btnNuevo = document.getElementById('btnNuevo');
const smalls = document.querySelectorAll('small');
const divCartasJugador = document.getElementById('jugador-cartas');
const divCartasComputadora = document.getElementById('computadora-cartas');


// Creamos un deck
const crearDeck = () => {
    deck = [];
    for(let i = 2; i<=10; i++){
        for(tipo of tipos){
            deck.push( i + tipo )
        }
    }

    for ( let tipo of tipos ){
        for ( esp of especiales ){
            deck.push( esp + tipo )
        }
    }
    deck = _.shuffle(deck);
}

crearDeck();

//Pedimos cartas
const pedirCarta = () => {
    if (deck.length == 0){
        throw 'No hay cartas en el deck'
    }

    const carta = deck.pop();

    return carta;
}


const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length -1);
    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : (valor*1)
}

// Turno de la computadora

const turnoComputadora = ( puntosMinimos ) => {

    do{
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        smalls[1].innerHTML = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //`` Deja agregar html+js
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if( puntosMinimos > 21 ){
            break;
        }

    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        if ( puntosComputadora === puntosMinimos ){
            alert('Nadie gano xD');
        } else if ( puntosMinimos > 21 ){
            alert('Te ganaron kpo');
        } else if ( puntosComputadora > 21 ){
            alert('Ganaste amigo =D');
        } else {
            alert('Te ganaron Kpo')
        }
    }, 100);

}

// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta)
    smalls[0].innerHTML = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; //`` Deja agregar html+js
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if ( puntosJugador > 21){
        console.warn('Perdiste wacho');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    } else if ( puntosJugador === 21 ){
        console.warn('Ganaste papax')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
});

btnNuevo.addEventListener('click', () => {
    crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    smalls[0].innerText = 0
    smalls[1].innterText = 0;
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});