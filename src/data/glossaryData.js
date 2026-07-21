// Interactive Poker Glossary Data with simple explanations and analogies

export const POKER_GLOSSARY = {
  equity: {
    title: 'Equity (Probabilidad de Ganar)',
    short: 'El porcentaje de probabilidades que tienes de llevarte el bote al final de la mano.',
    analogy: 'Es como comprar boletos de rifa. Si tienes 70% de Equity, es como si poseyeras 7 de cada 10 boletos de la rifa.',
    example: 'Con Pareja de Ases (AA) en la mano inicial, tu Equity contra un rival es aproximadamente del 85%.'
  },
  potOdds: {
    title: 'Pot Odds (Precio del Bote)',
    short: 'La relación entre el tamaño del bote y el costo que tienes que pagar para seguir jugando.',
    analogy: 'Imagina que comprar un billete cuesta 10€ y el premio final son 100€. El precio del premio es del 10% (10 de 100).',
    example: 'Si hay 100 fichas en la mesa y te piden apostar 20 para ver la siguiente carta, tus Pot Odds son de 20 / 120 = 16.6%.'
  },
  outs: {
    title: 'Outs (Cartas Milagrosas / Salidas)',
    short: 'Las cartas invisibles que aún quedan en la baraja y que si salen te dan la mano ganadora.',
    analogy: 'Son tus "salavidas". Cuantas más outs tengas, más fácil es conectar tu jugada.',
    example: 'Si tienes 4 cartas de Corazones y faltan 9 Corazones por salir en la baraja, tienes 9 Outs.'
  },
  preflop: {
    title: 'Pre-flop (Fase Inicial)',
    short: 'La 1ª ronda de apuestas cuando solo tienes tus 2 cartas privadas y aún no se han destapado cartas en la mesa.',
    analogy: 'Es la fase de salida en una carrera de coches. Decides si acelerar o retirarte antes del primer giro.',
    example: 'Aquí se pagan las Ciega Pequeña y Ciega Grande obligatorias.'
  },
  flop: {
    title: 'El Flop (Las 3 Primeras Cartas Comunitarias)',
    short: 'Se muestran las 3 primeras cartas comunitarias boca arriba en el centro de la mesa.',
    analogy: 'Es cuando ves el 60% de la película. Ya sabes si tus cartas tienen buena sintonía con la mesa.',
    example: 'Con 2 cartas en tu mano y 3 en el Flop, ya puedes formar tu primera combinación de 5 cartas.'
  },
  turn: {
    title: 'El Turn (La 4ª Carta Comunitaria)',
    short: 'Se destapa la 4ª carta en la mesa. La tensión aumenta y las apuestas duplican su valor.',
    analogy: 'La antesala del desenlace. Queda solo 1 oportunidad más para mejorar tu mano.',
    example: 'Es el momento crítico para calcular las outs usando la regla del 2.'
  },
  river: {
    title: 'El River (La 5ª y Última Carta)',
    short: 'La última carta que se destapa en la mesa. No habrá más cartas.',
    analogy: 'La meta final. Tus cartas ya no cambiarán jamás.',
    example: 'Al terminar la ronda de apuestas del River se abren las cartas (Showdown).'
  },
  showdown: {
    title: 'Showdown (Desenlace / Mostrar Cartas)',
    short: 'Al final del River, los jugadores activos muestran sus cartas y el de mejor jugada se lleva el bote.',
    analogy: 'El recuento de votos o el veredicto final.',
    example: 'Si todos los rivales se retiran antes del Showdown, ganas el bote sin tener que enseñar tus cartas.'
  },
  vpip: {
    title: 'VPIP (Voluntariamente Pone Dinero en el Bote)',
    short: 'Porcentaje de manos en las que pagas o subes voluntariamente pre-flop.',
    analogy: 'Mide lo "selectivo" o "impulsivo" que eres al entrar a jugar.',
    example: 'Un VPIP ideal para un principiante está entre el 15% y el 25%.'
  },
  pfr: {
    title: 'PFR (Pre-flop Raise / Subidas Pre-flop)',
    short: 'Porcentaje de veces que entras a una mano haciendo una subida (apuesta agresiva) en lugar de solo igualar.',
    analogy: 'Mide tu grado de valentía y agresividad estratégica.',
    example: 'Los jugadores fuertes prefieren subir (PFR alto) en lugar de solo pagar.'
  },
  check: {
    title: 'Pasar (Check)',
    short: 'Decidir no apostar pero continuar en la jugada sin poner fichas extra (solo posible si nadie ha apostado antes en esta ronda).',
    analogy: 'Pasarle el turno al siguiente sin gastar dinero.',
    example: 'Si todos pasan, se destapa la siguiente carta gratis.'
  },
  call: {
    title: 'Igualar (Call)',
    short: 'Pagar la misma cantidad de fichas que ha apostado el jugador anterior para seguir en la jugada.',
    analogy: 'Comprar tu entrada al mismo precio que los demás.',
    example: 'El rival apuesta 20 fichas y tú pones 20 fichas para ver la siguiente carta.'
  },
  raise: {
    title: 'Subir (Raise)',
    short: 'Aumentar la apuesta existente obligando a los demás a pagar más fichas o retirarse.',
    analogy: 'Subir la apuesta en una subasta para meter presión.',
    example: 'El rival apuesta 20 y tú subes a 60 fichas.'
  },
  fold: {
    title: 'Retirarse (Fold)',
    short: 'Tirar tus cartas y abandonar la mano actual, renunciando a las fichas apostadas previamente.',
    analogy: 'Rendirte en la mano actual para no perder más fichas.',
    example: 'Tiras tus cartas cuando ves que el rival tiene una jugada mucho mejor o el costo es excesivo.'
  },
  button: {
    title: 'El Botón (Dealer / BT)',
    short: 'La mejor posición estratégica de la mesa. Actúas el último en todas las rondas tras el Flop.',
    analogy: 'Tener la última palabra en una negociación. Tienes toda la información de lo que hicieron los demás.',
    example: 'El Botón va rotando hacia la izquierda mano tras mano.'
  },
  blinds: {
    title: 'Ciegas (Blinds: SB y BB)',
    short: 'Apuestas obligatorias que ponen los dos jugadores a la izquierda del Botón antes de repartir las cartas.',
    analogy: 'La tarifa de entrada mínima para que siempre haya fichas en juego en la mesa.',
    example: 'La Ciega Pequeña (SB) es la mitad de la Ciega Grande (BB).'
  }
};
