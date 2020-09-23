const modulo = (() => {
    'use strict'

    // Variables Globales
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = []

    // Referencias de HTML
    const   btnPedir = document.querySelector('#btnPedir'),
            btnDetener = document.getElementById('btnDetener'),
            btnNuevo = document.getElementById('btnNuevo'),
            smalls = document.querySelectorAll('small'),
            divCartasJugadores = document.querySelectorAll('.divCartas');

    // Esta funcion inicializa el juego
    const inicializarJuego = ( numeroJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i< numeroJugadores; i++){
            puntosJugadores.push(0);
        }

        smalls.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Creamos un deck
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }
        return _.shuffle(deck);
    }


    //Pedimos cartas
    const pedirCarta = () => {
        if (deck.length == 0) {
            throw 'No hay cartas en el deck'
        }
        return deck.pop();
    }

    // Obtener el valor de la carta
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === 'A' ? 11 : 10) : (valor * 1)
    }

    // Turno: 0 = Primer jugador y el ultimo es computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        smalls[turno].innerHTML = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; //`` Deja agregar html+js
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length -1 )
            crearCarta( carta, puntosJugadores.length -1 );
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador()
    }

    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );

        crearCarta( carta, 0 );

        if (puntosJugador > 21) {
            console.warn('Perdiste wacho');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('Ganaste papax')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gano xD');
            } else if (puntosMinimos > 21) {
                alert('Te ganaron kpo');
            } else if (puntosComputadora > 21) {
                alert('Ganaste amigo =D');
            } else {
                alert('Te ganaron Kpo')
            }
        }, 100);
    }

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };
    
})();