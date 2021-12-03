const LANG = {

  EN: `english`,

  ES: `español`

}



var lang = LANG.EN;



const HINT = {

  undefined: `ERROR`,

  PLACE: `PLACE`,

  SETTINGS: `SETTINGS`,

  PATH_TITLE: `PATH_TITLE`,

  TILE_TITLE: `TILE_TITLE`,

  LANGUAGE: `LENGUAGE`,

  PLAYERS: `PLAYERS`,

  RULES: `RULES`,

  MAP_WARNING: `MAP_WARNING`,

  LEVEL_RECOMMENDED: `LEVEL_RECOMMENDED`,

  BOARD: `BOARD`,

  CREATE_MAP: `CREATE_MAP`,

  NEW_MAP: `NEW_MAP`,

  DEALING_CARDS: `DEALING_CARDS`,

  OBJECTIVE: `OBJECTIVE`,

  LINKS: `LINKS`,

  ALREADY_DID: `ALREADY_DID`,

  TO_END_TURN: `TO_END_TURN`,

  END_TURN_BTN: `END_TURN_BTN`,

  GO_ON_ROAD: `GO_ON_ROAD`,

  FIRST_TURN: `FIRST_TURN`,

  ROAD: `ROAD`,

  PORT: `PORT`,

  MAP: `MAP`,

  YES: `YES`,

  NO: `NO`,

  OF: `OF`,

  OOR: `OOR`,

  ANDOR: `ANDOR`,

  CANNOT_LEAVE: `CANNOT_LEAVE`,

  TOTAL: `TOTAL`,

  CLOSE: `CLOSE`,

  WELCOME: `WELCOME`,

  CLICK_START: `CLICK_START`,

  MIN_PLAYERS: `MIN_PLAYERS`,

  PLACINGS: `PLACINGS`,

  ROADTILES: `ROADTILES`,

  HEXTILES: `HEXTILES`,

  ROAD2FIELD: `ROAD2FIELD`,

  OVERLAP: `OVERLAP`,

  OVERLAP_2: `OVERLAP_2`,

  HEX2HEX: `HEX2HEX`,

  HEX2HEX2: `HEX2HEX2`,

  YOU_CAN_DO_IT: `YOU_CAN_DO_IT`,

  TRY_ISLAND: `TRY_ISLAND`,

  MOVE_ISLAND: `MOVE_ISLAND`,

  IS_ISLAND: `IS_ISLAND`,

  TOO_FAR: `TOO_FAR`,

  SAYS: `SAYS`,

  MAPPED_OUT: `MAPPED_OUT`,

  FIRST_MOVE: `FIRST_MOVE`,

  CLICK_EXPLORE: `CLICK_EXPLORE`,

  EXPLORE_PATH: `EXPLORE_PATH`,

  EXPLORE_TILE: `EXPLORE_TILE`,

  NEXT_TURN: `NEXT_TURN`,

  PLACE: `PLACE`,

  GET_EOT: `GET_EOT`,

  END_TURN: `END_TURN`,

  CONTINUE_PATH: `CONTINUE_PATH`,

  IN_UNDERGROUND: `IN_UNDERGROUND`,

  DICE_USE: `DICE_USE`,

  DICE_INNACTIVE: `DICE_INNACTIVE`,

  GOT_OVERBOARD: `GOT_OVERBOARD`,

  DISCARD_JOKER: `DISCARD_JOKER`,

  CLICK_CARROT: `CLICK_CARROT`,

  PATH: `PATH`,

  TILE_HELP: `TILE_HELP`,

  BACK_ONBOARD: `BACK_ONBOARD`,

  DID_DISCARD: `DID_DISCARD`,

  DID_SHOW: `DID_SHOW`,

  DISCARDS: `DISCARDS`,

  HORSE: `HORSE`,

  BOAT: `BOAT`,

  WHICH_RIDE: `WHICH_RIDE`,

  ONLY_HORSE: `ONLY_HORSE`,

  WHICH_JOKER: `WHICH_JOKER`,

  NO_JOKER: `NO_JOKER`,

  ONLY_JOKER: `ONLY_JOKER`,

  USE_JOKER: `USE_JOKER`,

  BOAT_PORT: `BOAT_PORT`,

  NOT_PORTS: `NOT_PORTS`,

  BOAT_HERE: `BOAT_HERE`,

  SELECT_CAVE: `SELECT_CAVE`,

  RIDE_HORSE: `RIDE_HORSE`,

  CANNOT_RIDE: `CANNOT_RIDE`,

  NO_RIDES: `NO RIDES`,

  END_HERE: `END_HERE`,

  NO_CARROTS: `NO_CARROTS`,

  GOT_ROYAL: `GOT_ROYAL`,

  ROYAL_TAKEN: `ROYAL_TAKEN`,

  MISSING_ROYALS: `MISSING_ROYALS`,

  WRONG_ROYALS: `WRONG_ROYALS`,

  PLAYER_WINS: `PLAYER_WINS`,

  REMOVE_CARROT: `REMOVE_CARROT`,

  LEAVE_UNDERGROUND: `LEAVE_UNDERGROUND`,

  CHOOSE_CAVE: `CHOOSE_CAVE`,

  NO_JOKERS: `NO_JOKERS`,

  RIDE_HORSE: `RIDE_HORSE`,

  TRADE_DONE: `TRADE_DONE`,

  TRADE_ROYAL: 'TRADE_ROYAL',

  FLY_GO: 'FLY_GO',

  ATTACK_ROYAL: 'ATTACK_ROYAL',

  WHICH_ROYAL: 'WHICH_ROYAL',

  RELEASE_ROYAL: 'RELEASE_ROYAL',

  SHOW: `SHOW`,

  NEW_GAME: `NEW_GAME`,

}



const HINT_LANG = {

  [LANG.ES]: {

    undefined: `ERROR`,

    [LEVEL.BASIC]: `Básicas`,

    [LEVEL.COMPLETE]: `Completas`,

    [RABBIT.CHERRY]: `cereza`,

    [RABBIT.GRAPE]: `uva`,

    [RABBIT.LEMON]: `limón`,

    [RABBIT.MINT]: `menta`,

    [RABBIT.STRAWBERRY]: `fresa`,

    [RABBIT.PEACH]: `melocotón`,

    [RABBIT.TANGERINE]: `mandarina`,

    [RABBIT.KIWI]: `kiwi`,

    [RABBIT.BLUEBERRY]: `arándano`,

    [RABBIT.PLUM]: `ciruela`,

    [RABBIT.PEANUT]: `maní`,

    [RABBIT.COFFEE]: `café`,

    [RABBIT.HONEYDEW]: `melón dulce`,

    [RABBIT.LYCHEE]: `lychee`,

    [SUIT.HEARTS]: `corazones`,

    [SUIT.SPADES]: `picas`,

    [SUIT.DIAMONDS]: `diamantes`,

    [SUIT.CLUBS]: `tréboles`,

    [SUIT.HORSESHOES]: `herraduras`,

    [SUIT.SHIELDS]: `escudos`,

    [SUIT.SEASHELLS]: `conchas marinas`,

    [SUIT.TORCHES]: `antorchas`,

    [SUIT.ICESKULLS]: `calaveras de hielo`,

    [SUIT.BONECHARS]: `huesos carbonizados`,

    [SUIT.MUSHROOMS]: `hongos`,

    [SUIT.CRYSTALS]: `cristales`,

    [RIDE.HORSE]: `Caballo`,

    [RIDE.BOAT]: `Bote`,

    [ROLE.WOODS]: `bosque`,

    [ROLE.MOUNTAIN]: `montaña`,

    [ROLE.CAVE]: `cueva`,

    [ROLE.BEND]: `Jokers`,

    [ROLE.FORK]: `mercaderes`,

    [ROLE.CASTLE]: `el castillo`,

    [ROLE.UNDERGROUND]: `el subsuelo`,

    [ROLE.ROYAL]: {

      [TITLE.JACK]: `el pueblo`,

      [TITLE.QUEEN]: `el palacio`,

      [TITLE.KING]: `la torre`,

    },

    [TITLE.JACK]: `el Juez`,

    [TITLE.QUEEN]: `la Reina`,

    [TITLE.KING]: `el Rey`,

    [HINT.SETTINGS]: `Preferencias`,

    [HINT.PATH_TITLE]: `Por este Camino`,

    [HINT.TILE_TITLE]: `En este Lugar`,

    [HINT.PLAYERS]: `Participantes`,

    [HINT.LANGUAGE]: `Lenguaje`,

    [HINT.RULES]: `Reglas`,

    [HINT.BOARD]: `Mapa`,

    [HINT.CREATE_MAP]: `⁠—Crear nuevo⁠`,

    [HINT.NEW_MAP]: `Van a crear un mapa nuevo colocando una ficha a la vez.</br>Luego necesitarán todas las cartas de naipes para jugar.`,

    [HINT.MAP_WARNING]: `Elije un mapa adecuado para la cantidad de participantes.</br>Para un juego avanzado pueden crear un mapa nuevo.`,

    [HINT.LEVEL_RECOMMENDED]: level => `El nivel básico es el recomendado para principiantes.`,

    [HINT.DEALING_CARDS]: `<h1>1.</h1>

      <p>Remueve los <i>Jokers</i> y las cartas reales (<i>J,Q,K</i>). Colócalas a un lado.</p>

      <h1>2.</h1><p>Baraja el resto y entrega 6 a cada participante. No las muestren.</p>

      <h1>3.</h1><p>Coloca las cartas restante en una pila boca abajo.</p>`,

    [HINT.OBJECTIVE]: `<h1>Objetivo</h1>Obtiener un set de cartas reales, cualquier <i>K</i>, <i>Q</i> & <i>J</i>.</br>Cada una una se encuentra en su exágono.</br>Quien regrese al <i>castillo</i> con un set real, gana el juego.`,

    [HINT.LINKS]: {

      [ROLE.OVERBOARD]: `Sal del tablero`,

      [ROLE.ROYAL]: tile => `${isAt(tile) ? 'Consigue' : 'Visita'} ${penName(tile)}`,

      [ROLE.CASTLE]: _ => `${isAt(game.castle) ? 'Reclama' : 'Visita'} <i>el Castillo</i>`,

      [ROLE.WOODS]: `Atraviesa este bosque`,

      [ROLE.CAVE]: `Entra al <i>subsuelo</i> por esta cueva</a>`,

      [ROLE.BEND]: `Consigue un Joker en esta curva`,

      [ROLE.FORK]: `Consigue transporte aquí`,

      [RIDE.BOAT]: `Toma el bote del <i>Joker</i>`,

      [RIDE.HORSE]: `Monta el caballo del <i>Joker</i>`,

      [SUIT.DIAMONDS]: suit => `Cambia tus ${suit === SUIT.DIAMONDS ? `<i>cartas</i>` : penSuits(SUIT.DIAMONDS)} por ${penSuits(suit)}`,

      [SUIT.CLUBS]: `Vuela hasta otra <i>torre de Rey</i>`,

      [SUIT.SPADES]: player => `Ataca a ${penName(player)}`,

    },

    [HINT.SAYS]: {

      [ROLE.OVERBOARD]: `No tomarás una carta de fin-de-turno, pero irás al <i>subsuelo</i> en el próximo turno.`,

      [ROLE.CASTLE]: `El juego termina cuando alquién regrese aquí con un <i>Rey (K)</i>, <i>Reina (Q)</i> y <i>Juez (J)</i> en tu mano`,

      [ROLE.ROYAL]: tile => tile.holder ? `${penName(tile.holder)} ya tiene <i ${penName(tile, true)}.` : `Para obtener ${penName(tile, true)}, descarta ${penCost(tile)} ${isAt(tile) ? 'aquí' : 'allí'}.`,

      [ROLE.WOODS]: _ => `Para atravesar el bosque hacia el otro camino, descarta ${penCost(ROLE.WOODS)}.`,

      [ROLE.MOUNTAIN]: `Puedes atravesar la montaña sólo derecho (por encima o por debajo).`,

      [ROLE.CAVE]: _ => `Entra al <i>subsuelo</i> y espera un turno allí.</br>O descarta ${penCost(ROLE.CAVE)} y ve a otra cueva de inmediato.`,

      [ROLE.BEND]: _ => `Para obtener un <i>Joker</i>, descarta ${penCost(ROLE.BEND)}.<small>El <i>Joker</i> rojo tiene un <i ${penColor(RIDE.HORSE)}">Caballo</i>, y el negro un <i ${penColor(RIDE.BOAT)}">Bote</i></small>`,

      [ROLE.FORK]: _ => `Para obtener transporte, descarta ${penCost(ROLE.FORK)}.`,

      [SUIT.DIAMONDS]: suit => `Descarta cualquier cantidad de ${suit === SUIT.DIAMONDS ? `<i>cualquier tipo</i>` : penSuits(SUIT.DIAMONDS)} para cambiarla por ${penSuits(suit)} descartadas de igual o menor valor total.`,

      [SUIT.CLUBS]: _ => `Para volar hacia otra <i>torre de  Rey</i>, muestra ${penCost( SUIT.CLUBS)}.<small>Muestra, no descartes.</small>`,

      [SUIT.SPADES]: player => `Para atacar a ${penName(player)}, descarta ${penCost( SUIT.SPADES)}:</br>róbale una carta al azar y sácale del tablero.`,

      [SUIT.HEARTS]: _ => `Otros puede requerir que muestres ${penCost( SUIT.HEARTS)} para visitar un <i>palacio de Reinas</i>.<small>Muestra, no descartes.</small>`,

    },

    [HINT.DID_DISCARD]: `Descartaste`,

    [HINT.DID_SHOW]: `Mostraste`,

    [HINT.DISCARDS]: {

      [ROLE.ROYAL]: tile => `para obtener  ${penName(tile)}`,

      [ROLE.WOODS]: `para cruzar el bosque`,

      [ROLE.CAVE]: `para ir a otra cueva de inmediato`,

      [ROLE.BEND]: `para obtener un <i>Joker</i>`,

      [ROLE.FORK]: `para obtener transporte de inmediato`,

      [SUIT.CLUBS]: `para volar a otra <i>torre de Rey</i>`,

      [SUIT.SPADES]: player => `para atacar a ${penName(player)} y quitarle una carta al azar`,

      [SUIT.HEARTS]: `para visitar un <i>palacio de reina</i>`,

    },

    [HINT.ALREADY_DID]: `Ya haz hecho esto.`,

    [HINT.TO_END_TURN]: _ => `Para terminar tu turno haz click en los <big ${this.penColor()}>dados</big>.`,

    [HINT.END_TURN_BTN]: `Termina el turno`,

    [HINT.GO_ON_ROAD]: `Sal al camino`,

    [HINT.FIRST_TURN]: `Comienza el primer turno!`,

    [HINT.MAP]: (info, max, suits) => `<h1>${info.name}</h1>${info.blurb} (máximo <i>${max}</i> participantes)</br>Necesitarán las cartas de ${penSuits(suits, false)}${suits.length < 4 ? `; elimina las demás` : ''}.`,

    [HINT.ROAD]: `Camino`,

    [HINT.PORT]: `Puerto`,

    [HINT.YES]: `Sí`,

    [HINT.NO]: `No`,

    [HINT.OF]: `de`,

    [HINT.SHOW]: `<small>Sólo muestra, no descartes.</small>`,

    [HINT.OOR]: `<small>Pero, no está fuera del camino.</small>`,

    [HINT.CANNOT_LEAVE]: `<small>Pero, acabo de llegar aquí.</small>`,

    [HINT.ANDOR]: `<sup>y</sup>/<sub>o</sub>`,

    [HINT.TOTAL]: `al menos un total de`,

    [HINT.CLOSE]: `Cerrar`,

    [HINT.WELCOME]: _ => `<i>Jack Rabbits</i> de <i><a href="http://lenino.net" target="_blank">Lenino</a></i><br>Necesitarán un juego de <i>54</i> cartas/naipes de casino.</br>Coloquénse de manera que vean la pantalla para jugar.<small>${penLanguages()}</small>`,

    [HINT.CLICK_START]: `Haz click en <i>el castillo</i> para comenzar.`,

    [HINT.MIN_PLAYERS]: (min, max) => `Se necesita de <i>${min}</i>${max ? ` a <i>${max}</i>` : ''} participantes para este mapa.`,

    [HINT.PLACINGS]: [

      r => `${penName(r)}, podrías colocar una ficha? Intenta con un rombo.`,

      r => `Buen trabajo!<br>Ahora ${penName(r)}, podrías colocar una ficha?`,

      r => `Perfecto!<br>Es el turno de ${penName(r)} ahora.`,

      r => `Muy bien!<br>${penName(r)}, ya sabes qué hacer.`,

      r => `Buen trabajo equipo!<br>Continúen así hasta colocar todas las fichas.<br>Es tu turno nuevamente, ${penName(r)}.`

    ],

    [HINT.ROADTILES]: [

      `Acércala a un camino disponible y haz click para colocarla allí.`,

      `Asegúrate de que los caminos vayan sólo a otros caminos.`,

      `Puedes hacer click en otro lugar para liberar esta y tomar otra ficha.`,

      `Da vuelta a las fichas con las teclas de flechas IZQUIERDA y DERECHA.`,

    ],

    [HINT.HEXTILES]: [

      `Las cartas reales viven en los exágonos; cada una tiene la suya.`,

      `No conectes dos exágonos directamente por sos caminos.`,

      `Intenta usar la rueda del mouse para dar vuelta a la ficha.`,

      `Puedes comenzar una isla nueva colocando un exágono lejos de las demás fichas.`

    ],

    [HINT.ROAD2FIELD]: `Los caminos sólo deben ir a otros caminos.`,

    [HINT.OVERLAP]: `La ficha esta encima del tablero. Intenta colocarla en otro lugar.`,

    [HINT.OVERLAP_2]: `La ficha esta encima del tablero. Rotarla con la rueda del mouse.`,

    [HINT.HEX2HEX]: `No debes conectar dos exágonos directamente por sus caminos,<br>pero puedes comenzar una nueva isla.`,

    [HINT.HEX2HEX2]: `No debes conectar dos exágonos directamente por sus caminos,<br>debes colocar una ficha pequeña de por medio.`,

    [HINT.YOU_CAN_DO_IT]: r => `Vamos ${penName(r)}, puedes hacerlo.`,

    [HINT.TRY_ISLAND]: `No hay caminos disponibles para colocar esta ficha, pero puedes comenzar una nueva isla con ella colocándola más lejos.`,

    [HINT.MOVE_ISLAND]: `Si quieres comenza una nueva isla, debes colocar la fichas más lejos.`,

    [HINT.IS_ISLAND]: `Quieres comenzar una isla con este exágono?`,

    [HINT.TOO_FAR]: `Está ficha está demasiado alejada. Acércala a algún camino disponible.`,

    [HINT.MAPPED_OUT]: `El reino está completo. Vamos a <i>repartir las cartas</i>.`,

    [HINT.FIRST_MOVE]: r => `${penName(r)}, vamos a conseguir tu <i>Rey (K)</i>, <i>Reina (Q)</i> y <i>Juez (J)</i>.<br>Haz click en el camino que desees explorar.`,

    [HINT.CLICK_EXPLORE]: `Haz click en esta ficha para explorar tus allí.`,

    [HINT.EXPLORE_PATH]: `Haz click para explora el camino.`,

    [HINT.EXPLORE_TILE]: `Explora lo que puedes hacer en este lugar.`,

    [HINT.NEXT_TURN]: r => `Es el turno de ${penName(r)}.`,

    [HINT.GET_EOT]: `<h1>Fin de turno</h1><p class="center">Toma una <b>carta de fin-de-turno</b>. Si hay no más en la pila, baraja las descartadas y crea una pila nueva.</p>`,

    [HINT.END_TURN]: `Vas a terminar tu turno?</br>Recuerda tomar una carta de fin-de-turno de la pila.`,

    [HINT.GOT_OVERBOARD]: `<p class="center">No tomes una carta de fin-de-turno. Entrarás al <i>subsuelo</i> en el próximo turno.</p>`,

    [HINT.CONTINUE_PATH]: `Debes continuar en el camino hasta llegar a un exágono.`,

    [HINT.IN_UNDERGROUND]: `Debes tu turno antes de poder salir.`,

    [HINT.DICE_USE]: _ => `Puedes hacer click en los <big ${penColor()}>dados</big> para terminar tu turno.</br>Ellos determinan el precio de todo durante cada turno.<small>La cartas reales, por otro lado, siempre tienen un valor de <big>10</big>.</small>`,

    [HINT.DICE_INNACTIVE]: `No puedes terminar tu turno fuera de un exágono, debes segui moviendote.`,

    [HINT.DISCARD_JOKER]: `Debes descartar el <i>Joker</i> si lo usas.`,

    [HINT.CLICK_CARROT]: `Si descartaste una carta real (por <i>10</i>), debes remover la zanahoria también haciendo click en ella.`,

    [HINT.PATH]: `Haz click en la ficha que desees visitar, si hay algún camino hacia ella.</br>O haz click en esta ficha para explorar tus opciones en ella.<small>Puedes draggear el mapa y usar la rueda del mouse como zoom.</small>`,

    [HINT.WHICH_RIDE]: `Qué transporte tomarás?`,

    [HINT.ONLY_HORSE]: _ => `No puedes tomar bote desde aquí, sólo un <i ${penColor(RIDE.HORSE)}">Caballo</i>. Aún lo quieres?<small>Si no, toma tus cartas de vuelta.<small>`,

    [HINT.WHICH_JOKER]: _ => `Qué <i>joker</i> tomarás?</br>El rojo tiene un <i ${penColor(RIDE.HORSE)}">Caballo</i>, y el negro un <i ${penColor(RIDE.BOAT)}">Bote.</i>`,

    [HINT.NO_JOKERS]: `No hay <i>Jokers</i> disponibles.`,

    [HINT.ONLY_JOKER]: ride => `El único <i>Joker</i> is ponible es el <i ${penColor(ride)}">${pen(ride)}</i>. Aún lo quieres?<small>Si no, toma tus cartas de vuelta.<small>`,

    [HINT.USE_JOKER]: `Para usar este <i>Joker</i>, haz click para explora las opciones la ficha en donde te encuentres.`,

    [HINT.BOAT_PORT]: `Arrastra tu conejo desde este lugar hasta otro por medio del agua. No toques ningún otro terreno de camino allí.<small>Recuerda descartar el <i>Joker</i>.</small>`,

    [HINT.NOT_PORTS]: `Este lugar no tiene un puerto desde el mar.</br>Intenta otra vez.`,

    [HINT.BOAT_HERE]: `Quieres navegar hasta este lugar?`,

    [HINT.LEAVE_UNDERGROUND]: `Sal del <i>subsuelo</i>.`,

    [HINT.CHOOSE_CAVE]: `Escoge una cueva par salir del <i>subsuelo</i>.`,

    [HINT.BACK_ONBOARD]: `Regresaste al tablero por el <i>subsuelo</i>.</br>Debes terminar un turno aquí par salir libremente.`,

    [HINT.SELECT_CAVE]: `Selecciona una cueva para salir.`,

    [HINT.RIDE_HORSE]: `Selecciona cualquier exágono de esta isla al que desees visitar.<small>Recuerda descartar el <i>Joker</i>.</small>`,

    [HINT.CANNOT_RIDE]: ride => ride === RIDE.HORSE ? `No hay a donde cabalgar en esta isla.` : `No hay puerto de donde zarpar en este lugar.`,

    [HINT.NO_RIDE]: `No quedan más <i>Joker</i>'s.`,

    [HINT.END_HERE]: _ => `Ecabas de llegar aquí, no puedes salir hasta el proximo turno.<small>${pen(HINT.TO_END_TURN)}</small>`,

    [HINT.NO_CARROTS]: `Ya no tienes más zanahorias. Sólo puedes tener 3 cartas reales a la vez.</br>Puedes descartar por su valor de <i>10</i>, en cualquier lugar válido.`,

    [HINT.ROYAL_TAKEN]: tile => `${penName(tile.holder)} ya tiene esta carta.`,

    [HINT.MISSING_ROYALS]: player => `${penName(player)} aún necesita ${penTitles(player.misses)} de cualquier símbolo para ganar. ${player.misses.length < 3 ? `<small>Puedes cambiar cartas reales descartándolas  por su valor de <i>10</i>.</small>`: ''}`,

    [HINT.GOT_ROYAL]: tile => `${penName(tile.holder)} consiguió ${penName(tile)}.</br>${tile.holder.misses.length ? pen(HINT.MISSING_ROYALS, tile.holder, true) : `Ahora sólo debe regresar al <i>Castillo</i>.`}`,

    [HINT.REMOVE_CARROT]: carrot => `Remueve esta zanahoria si ya no tienes ${penName(carrot.tile)}.`,

    [HINT.PLAYER_WINS]: player => `${penName(player)} ha ganado!!!</br>con ${player.holds.map(tile => penName(tile, true)).list()}</br>Felicidades!`,

    [HINT.TRADE_DONE]: `Asegúrate de descartar una cantidad igual o mayor a las descartadas que tomaste.`,

    [HINT.TRADE_ROYAL]: `Descartaste alguna carta real?`,

    [HINT.FLY_GO]: `Elije una <i>torre de Rey</i> a donde quieras volar`,

    [HINT.WHICH_ROYAL]: `Cuál carta real?`,

    [HINT.ATTACK_ROYAL]: `Le robaste una carta real?`,

    [HINT.RELEASE_ROYAL]: `Dejar ir una carta real`,

    [HINT.NEW_GAME]: `Quieres iniciar un juego nuevo?`,

  },

  [LANG.EN]: {

    undefined: `ERROR`,

    [LEVEL.BASIC]: `Basic`,

    [LEVEL.COMPLETE]: `Complete`,

    [RABBIT.CHERRY]: `cherry`,

    [RABBIT.GRAPE]: `grape`,

    [RABBIT.LEMON]: `lemon`,

    [RABBIT.MINT]: `mint`,

    [RABBIT.STRAWBERRY]: `strawberry`,

    [RABBIT.PEACH]: `peach`,

    [RABBIT.TANGERINE]: `tangerine`,

    [RABBIT.KIWI]: `kiwi`,

    [RABBIT.BLUEBERRY]: `blueberry`,

    [RABBIT.PLUM]: `plum`,

    [RABBIT.PEANUT]: `peanut`,

    [RABBIT.COFFEE]: `coffee`,

    [RABBIT.HONEYDEW]: `honeydew`,

    [RABBIT.LYCHEE]: `lychee`,

    [SUIT.HEARTS]: `hearts`,

    [SUIT.SPADES]: `spades`,

    [SUIT.DIAMONDS]: `diamonds`,

    [SUIT.CLUBS]: `clubs`,

    [SUIT.HORSESHOES]: `horseshoes`,

    [SUIT.SHIELDS]: `sheilds`,

    [SUIT.SEASHELLS]: `seashells`,

    [SUIT.TORCHES]: `torches`,

    [SUIT.ICESKULLS]: `iceskulls`,

    [SUIT.BONECHARS]: `bonechars`,

    [SUIT.MUSHROOMS]: `mushrooms`,

    [SUIT.CRYSTALS]: `crystals`,

    [RIDE.HORSE]: `Horse`,

    [RIDE.BOAT]: `Boat`,

    [ROLE.WOODS]: `woods`,

    [ROLE.MOUNTAIN]: `mountain`,

    [ROLE.CAVE]: `cave`,

    [ROLE.BEND]: `Jokers`,

    [ROLE.FORK]: `Merchants`,

    [ROLE.CASTLE]: `the castle`,

    [ROLE.UNDERGROUND]: `the underground`,

    [ROLE.ROYAL]: {

      [TITLE.JACK]: `the Town`,

      [TITLE.QUEEN]: `the Palace`,

      [TITLE.KING]: `the Tower`,

    },

    [TITLE.JACK]: `the Jack`,

    [TITLE.QUEEN]: `the Queen`,

    [TITLE.KING]: `the King`,

    [HINT.SETTINGS]: `Settings`,

    [HINT.PATH_TITLE]: `On this road`,

    [HINT.TILE_TITLE]: `At this place`,

    [HINT.PLAYERS]: `Players`,

    [HINT.LANGUAGE]: `Lenguage`,

    [HINT.RULES]: `Rules level`,

    [HINT.BOARD]: `Map`,

    [HINT.CREATE_MAP]: `⁠—Create one⁠`,

    [HINT.NEW_MAP]: `You will create a map by each placing a tile a time.</br>Then you will need all cards to play.`,

    [HINT.MAP_WARNING]: `Pick a map suitable for the ammount of players.</br>Advanced players may create their own.`,

    [HINT.LEVEL_RECOMMENDED]: level => `The basic level es recommended for beginners.`,

    [HINT.DEALING_CARDS]: `<h1>1.</h1>

      <p>Take out all Royals and Jokers (face cards). Put them aside.</p>

      <h1>2.</h1><p>Shuffle the rest and give each player 6 concealed random cards.</p>

      <h1>3.</h1><p>Place remaining cards in a facedown pile.</p>`,

    [HINT.OBJECTIVE]: `<h1>Objective</h1>Obtain a set of royals, any <i>K</i>, <i>Q</i> & <i>J</i>.</br>Each royal is found in their own hexagon.</br>The first player to return to the <i>castle</i> with a royal set, wins.`,

    [HINT.LINKS]: {

      [ROLE.OVERBOARD]: `Go off the board`,

      [ROLE.ROYAL]: tile => `${isAt(tile) ? 'Get' : 'Visit'} ${penName(tile)}`,

      [ROLE.CASTLE]: _ => `${isAt(game.castle) ? 'Claim' : 'Visit'} <i>the Castle</i>`,

      [ROLE.WOODS]: `Cut through these woods`,

      [ROLE.CAVE]: `Enter the <i>underground</i> cave`,

      [ROLE.BEND]: `Get a <i>Joker</i> at this bend`,

      [ROLE.FORK]: `Get a ride at this fork`,

      [RIDE.BOAT]: `Take the <i>Joker</i>'s boat here`,

      [RIDE.HORSE]: `Ride the <i>Joker</i>'s Horse`,

      [SUIT.DIAMONDS]: suit => `Trade your ${suit === SUIT.DIAMONDS ? `<i>cards</i>` : penSuits(SUIT.DIAMONDS)} for ${penSuits(suit)}`,

      [SUIT.CLUBS]: `Fly to another <i>King's tower</i>`,

      [SUIT.SPADES]: player => `Attack ${penName(player)}`,

    },

    [HINT.SAYS]: {

      [ROLE.OVERBOARD]: `You will not get an end-of-turn card, but will go <i>underground</i> on your next turn.`,

      [ROLE.CASTLE]: `The game ends when someone returns here with a <i>King</i>, <i>Queen</i> and <i>Jack</i>`,

      [ROLE.ROYAL]: tile => tile.holder ? `${penName(tile.holder)} already has ${penName(tile, true)}.` : `To get ${penName(tile, true)}, discard ${penCost(tile)} ${isAt(tile) ? 'here' : 'there'}.`,

      [ROLE.WOODS]: _ => `To cut through to the other road, discard ${penCost(ROLE.WOODS)}.`,

      [ROLE.MOUNTAIN]: `You may only cross mountains straight through the under or over path.`,

      [ROLE.CAVE]: _ => `Go <i>underground</i> and wait a turn there. </br>Or discard ${penCost(SUIT.CLUBS)} here and go to another cave immediately.`,

      [ROLE.BEND]: _ => `To get a <i>Joker</i>, discard ${penCost(ROLE.BEND)}.<small>The red <i>Joker</i> one has a <i ${penColor(RIDE.HORSE)}">horse</i>, and the black one a <i ${penColor(RIDE.BOAT)}">Boat</i>.</small>`,

      [ROLE.FORK]: _ => `to get an immediate ride, discard ${penCost(ROLE.FORK)}.`,

      [SUIT.DIAMONDS]: suit => `Discard any amount of ${suit === SUIT.DIAMONDS ? `<i>any suit</i>` : penSuits(SUIT.DIAMONDS)} to trade for equal or less ammount of discarded ${penSuits(suit)}.`,

      [SUIT.CLUBS]: _ => `To fly to another <i>King's tower</i>, <i class="show">show</i> ${penCost( SUIT.CLUBS)}.<small>Do not discard, just show.</small>`,

      [SUIT.SPADES]: player => `To attack ${penName(player)}, discard ${penCost( SUIT.SPADES)}: </br>steal a random card from their hand, and send them off the board.`,

      [SUIT.HEARTS]: _ => `Others may require you to <i class="show">show</i> ${penCost( SUIT.HEARTS)} to visit a <i>Queen's palaces</i>.<small>Do not discard, just show.</small>`,

    },

    [HINT.DID_DISCARD]: `Did you discard`,

    [HINT.DID_SHOW]: `Did you show`,

    [HINT.DISCARDS]: {

      [ROLE.ROYAL]: tile => `to get ${penName(tile)}`,

      [ROLE.WOODS]: `to cut through`,

      [ROLE.CAVE]: `to bypass the <i>underground</i>`,

      [ROLE.BEND]: `to get a <i>Joker</i>`,

      [ROLE.FORK]: `to get an immediate ride`,

      [SUIT.CLUBS]: `to fly to another <i>King's tower</i>`,

      [SUIT.SPADES]: player => `to attack ${penName(player)}, and take a random card from them`,

      [SUIT.HEARTS]: `to visit a <i>queen's palace</i>`,

    },

    [HINT.ALREADY_DID]: `You already did this.`,

    [HINT.TO_END_TURN]: _ => `You may end your turn by clicking the <big ${this.penColor()}>dice</big>.`,

    [HINT.END_TURN_BTN]: `End your turn`,

    [HINT.GO_ON_ROAD]: `Go on the road`,

    [HINT.FIRST_TURN]: `Start the first turn!`,

    [HINT.MAP]: (info, max, suits) => `<h1>${info.name}</h1>${info.blurb} (up to <i>${max}</i> players)</br>You will need ${penSuits(suits, false)} cards${suits.length < 4 ? `; remove other suits` : ''}.`,

    [HINT.ROAD]: `Road`,

    [HINT.PORT]: `Port`,

    [HINT.YES]: `Yes`,

    [HINT.NO]: `No`,

    [HINT.OF]: `of`,

    [HINT.SHOW]: `<small>Show, do not discard.</small>`,

    [HINT.OOR]: `<small>But, it's out of reach.</small>`,

    [HINT.CANNOT_LEAVE]: `<small>But, I just got here.</small>`,

    [HINT.ANDOR]: `<sup>&</sup>/<sub>or</sub>`,

    [HINT.TOTAL]: `at least a total of`,

    [HINT.CLOSE]: `Close`,

    [HINT.WELCOME]: _ => `<i><a href="http://lenino.net" target="_blank">Lenino</a>'s Jack Rabbits</i><br>You'll need a deck of <i>54</i> casino playing cards.<br>Players must be able to look at this screen.<small>${penLanguages()}</small>`,

    [HINT.CLICK_START]: `Click on <i>the castle</i> to start.`,

    [HINT.MIN_PLAYERS]: (min, max) => `You need <i>${min}</i> ${max && max > min ? ` to <i>${max}</i>` : ''} players for this map.`,

    [HINT.PLACINGS]: [

      r => `${penName(r)} could you place a tile? Try grabbing a diamond.`,

      r => `Great job!<br>Now ${penName(r)}, could you place a tile?`,

      r => `Perfect!<br>It's ${penName(r)}'s turn now.`,

      r => `Right on!<br>${penName(r)}, you know what to do.`,

      r => `Great job folks!<br>Keep this going until all tiles are placed.<br>It's your turn again, ${penName(r)}.`

    ],

    [HINT.ROADTILES]: [

      `Drag it close to a road and click it into place.`,

      `Make sure roads lead to roads.`,

      `You may click elsewhere to release the tile and choose another.`,

      `Rotate tiles using LEFT and RIGHT arrow keys.`,

    ],

    [HINT.HEXTILES]: [

      `Royals live in hexes; each has their own home.`,

      `Do not connect hexes directly by their roads.`,

      `Try using the MOUSEWHEEL to rotate tiles.`,

      `You may start islands with hexes by placing them away from all others.`

    ],

    [HINT.ROAD2FIELD]: `Roads should lead to roads.`,

    [HINT.OVERLAP]: `This tile is overlapping. Try a different location.`,

    [HINT.OVERLAP_2]: `This tile is overlapping. Try rotating it with the mousewheel.`,

    [HINT.HEX2HEX]: `You may not connect hexes directly by their roads<br>but you may start a new island with a hex.`,

    [HINT.HEX2HEX2]: `Do not connect hexes directly by their roads.<br>Try putting a smaller tile between them.`,

    [HINT.YOU_CAN_DO_IT]: r => `C'mon ${penName(r)}, you can do it.`,

    [HINT.TRY_ISLAND]: `There are no roads to link this to, but you may start a new Island farther at sea.`,

    [HINT.MOVE_ISLAND]: `Did you mean to start a new Island? Try farther at sea.`,

    [HINT.IS_ISLAND]: `Do you mean to create an island with this hex?`,

    [HINT.TOO_FAR]: `This is too far off the land. Get closer to a road.`,

    [HINT.MAPPED_OUT]: `The Kingdom is mapped. Let's <i>deal the cards</i>.`,

    [HINT.FIRST_MOVE]: r => `${penName(r)}, let's get a <i>King</i>, <i>Queen</i> and <i>Jack</i>.<br>Click on a road, to see where it leads.`,

    [HINT.CLICK_EXPLORE]: `Click this tile to explore your options.`,

    [HINT.EXPLORE_PATH]: `Click to explore this road.`,

    [HINT.EXPLORE_TILE]: `Explore what you can do here.`,

    [HINT.NEXT_TURN]: r => `It's ${penName(r)}'s turn.`,

    [HINT.GET_EOT]: `<h1>End of turn</h1><p class="center">Get an <b>end-of-turn card</b>. If there are no more cards, shuffle all discarded and create a new pile.</p>`,

    [HINT.GOT_OVERBOARD]: `<p class="center">Do not get an end-of-turn card. You will go <i>underground</i> on your next turn.</p>`,

    [HINT.END_TURN]: `Ending your turn?</br>Remember to take an end-of-turn card from the pile.`,

    [HINT.CONTINUE_PATH]: `You must continue on the road until you reach a hexagon.`,

    [HINT.IN_UNDERGROUND]: `You must wait a turn before you can leave.`,

    [HINT.DICE_USE]: _ => `You may click the <big ${penColor()}>dice</big> to end your turn.<br>They set the price of everything during each turn.<small>Royal cards, however, are always worth <big>10</big>.</small>`,

    [HINT.DICE_INNACTIVE]: `You cannot end your turn outside a hexagon; you must move first.`,

    [HINT.DISCARD_JOKER]: `You must discard the <i>Joker</i> if you use it.`,

    [HINT.CLICK_CARROT]: `If you discarded an royal (as <i>10</i>), you must remove its carrot by clicking on it.`,

    [HINT.PATH]: `Click a tile to visit out of those the roads reach.</br>Or click this tile to explore you options on it.<small>You may drag the map and mousewheel to zoom.</small>`,

    [HINT.WHICH_RIDE]: `Which ride are you taking?`,

    [HINT.ONLY_HORSE]: `You cannot take a boat from here only a <i ${penColor(RIDE.HORSE)}">horse</i>. Do you want it?<small>If not, take back your cards.</small>`,

    [HINT.WHICH_JOKER]: _ => `Which <i>joker</i> are you taking?</br>The red one has a <i ${penColor(RIDE.HORSE)}">horse</i>, and the black one a <i ${penColor(RIDE.BOAT)}">Boat.</i>`,

    [HINT.NO_JOKERS]: `There are no <i>Jokers</i> available.`,

    [HINT.ONLY_JOKER]: ride => `The only <i>Joker</i> available is the <i ${penColor(ride)}">${pen(ride)}</i>. Do you want it?<small>If not, take your cards back.</small>`,

    [HINT.USE_JOKER]: `To use the <i>Joker</i>, click to explore the options of the tile you are on.`,

    [HINT.BOAT_PORT]: `Drag your rabbit from this tile to another through the water. Do not touch any undesired place.<small>Remember do discard the <i>Joker</i>.</small>`,

    [HINT.NOT_PORTS]: `This place has no port to dock.</br>Try again.`,

    [HINT.BOAT_HERE]: `Do you want to navigate to this place?`,

    [HINT.LEAVE_UNDERGROUND]: `Leave the <i>underground</i>.`,

    [HINT.CHOOSE_CAVE]: `Choose a cave to leave the <i>underground</i>.`,

    [HINT.BACK_ONBOARD]: `You are back on the board through the <i>underground</i>.</br>You must end a here before leaving.`,

    [HINT.SELECT_CAVE]: `Click a cave where you would like to come out of.`,

    [HINT.RIDE_HORSE]: `Click any hexagon on this island where you would want to go.<small>Remember do discard the <i>Joker</i>.</small>`,

    [HINT.CANNOT_RIDE]: ride => ride === RIDE.HORSE ? `There's no hexagon to ride to on this island.` : `There's no port to navigate from on this tile.`,

    [HINT.NO_RIDE]: `All <i>Joker</i>'s are taken.`,

    [HINT.END_HERE]: _ => `You just arrived here, you may not leave until your next turn.<small>${pen(HINT.TO_END_TURN)}</small>`,

    [HINT.NO_CARROTS]: `You have no more carrots. You may only hold 3 Royals at a time.</br>You may discard one for their value of <i>10</i> at any valid place.`,

    [HINT.ROYAL_TAKEN]: tile => `${penName(tile.holder)} already has this royal.`,

    [HINT.MISSING_ROYALS]: player => `${penName(player)} is missing ${penTitles(player.misses)} of any suit to win.${player.misses.length < 3 ? `<small>To exchange a Royal, discard it for a value of <i>10</i>.</small>` : ''}`,

    [HINT.GOT_ROYAL]: tile => `${penName(tile.holder)} just got ${penName(tile)}.</br>${tile.holder.misses.length ? pen(HINT.MISSING_ROYALS, tile.holder): `And just needs to get back to <i>the Castle</i> to win.`}`,

    [HINT.REMOVE_CARROT]: carrot => `Remove this carrot if you no longer have ${penName(carrot.tile)}.`,

    [HINT.PLAYER_WINS]: player => `${penName(player)} wins!!!</br>with ${player.holds.map(tile => penName(tile, true)).list()}</br>Congratulations!`,

    [HINT.TRADE_DONE]: `Make sure you discard an equal or larger amount than the discarded you took.`,

    [HINT.TRADE_ROYAL]: `Did you discard a Royal?`,

    [HINT.FLY_GO]: `Choose another <i>King's tower</i> to fly to.`,

    [HINT.WHICH_ROYAL]: `Which royal card?`,

    [HINT.ATTACK_ROYAL]: `Did you steal a royal card?`,

    [HINT.RELEASE_ROYAL]: `You must let a royal go`,

    [HINT.NEW_GAME]: `Do you want to start a new game?`,

  }

};



function drillDown(obj, ...args) {

  if (!obj) return;

  if (typeof obj === 'string') return obj;

  if (typeof obj === 'function') return obj(...args);

  if (Array.isArray(obj)) return drillDown(!args.length ? obj.shift() : obj[args.shift()], ...args);

  if (typeof obj === 'object') return drillDown(obj[args.shift()], ...args);

  return;

}



function pen(...args) {

  return drillDown(HINT_LANG, lang, ...args);

}



function bullet(input, isCard = false) {

  let icon = [input, input.level, input.role, input.suit].firstValue(t => t && ICON[t] ? ICON[t] : false);

  if (!icon) icon = ICON[undefined];

  isCard = isCard || input.type === TILE.TRIANGLE || SUIT[input] || input.role == ROLE.WOODS || isAt(input);

  if (input.role === ROLE.ROYAL && isAt(input)) icon = ICON[ROLE.ROYAL][input.level] + ICON[input.suit];

  let classes = isCard ? 'card' : '';

  if (input.role === ROLE.OVERBOARD) classes += ' over';

  return `<span class="bullet ${classes}" ${input ? penColor(input) : penColor()}>${icon}</span>`;

}



function penLanguages() {

  return LANG.toArray().map(l => l === lang ? `${l.capitalize()}` : `<a onclick="game.setLang('${l}')">${l.capitalize()}</a>`).join(' • ');

}



function penColor(input) {

  if (!input) input = game ? game.player : undefined;

  let colour = [input, input.id, input.role, input.suit].firstValue(t => t && COLOR[t]? COLOR[t] : false);

  if (Array.isArray(colour)) colour = `transparent; background: linear-gradient(to right, ${colour.join(',')});-webkit-background-clip: text;`;

  return `style="color:${colour}"`;

}



function penName(input, title) {

  if (input.group === PIECE.TILE) {

    if (input.role === ROLE.ROYAL) return `<i ${penColor(input)}>

      ${title || isAt(input) ? pen(input.level) : pen(ROLE.ROYAL, input.level)} ${pen(HINT.OF)} ${pen(input.suit)}

    </i>`;

    return `<i ${penColor(input)}>${pen(input.role)}</i>`;

  }

  if (input.rabbit) return `<b><i ${penColor(input)}>${pen(input.id)}</i></b>`;

  return pen(input);

}



function penCost(input) {

  let dice = game.dice;

  if(input.role === ROLE.ROYAL) return `${pen(HINT.TOTAL)} <big ${penColor(input)}>10</big>${penSuits(input)}`;

  return `${pen(HINT.TOTAL)} <big ${penColor()}>${dice.value}</big> ${penSuits(input)}`;

}



function penSuits(input, inclusive = true) {

  let andor = inclusive ? pen(HINT.ANDOR) : '&';

  let suits = getSuits(input);

  if (!suits[0]) return '';

  return suits.map(suit => `<big ${penColor(suit)}>${ICON[suit]}</big>`).list(andor);;

}



function getSuits(input){

  let suits = Array.isArray(input) ? input : [input, input.role, input.suit].firstValue(t => SUITS[t]);

  if (!suits[0]) suits = [

    [input, input.suit].first(t => SUIT[t])

  ];

  return suits.filter(suit => SUIT.toArray().includes(suit));

}



function isAt(input) {

  return game && game.player.tile === input || game.player.tile.role === input || game.player.tile.level === input;

}



function penTitles(royals) {

  if (!Array.isArray(royals)) royals = [royals];

  royals = royals.map(royal => royal.group === PIECE.TILE ? royal.level : royal);

  return royals.map(r => `<i>${pen(r)}</i>`).list();

}



function penLink(input, ...args) {

  let info = pen(HINT.LINKS, ...getArgs(input, ...args));

  if (!info) info = pen(input);

  if (!info) info = input;

  return `<span ${penColor(input)}>${bullet(input)}${info}</span>`;

}



function penConfirm(input, ...args) {

  args = getArgs(input, ...args);

  let prompt = input === SUIT.CLUBS || input === SUIT.HEARTS ? HINT.DID_SHOW : HINT.DID_DISCARD;

  let showNote = prompt === HINT.DID_SHOW ? pen(HINT.SHOW) : '';

  return `${pen(prompt)} ${penCost(input)} ${pen(HINT.DISCARDS, ...args)}?${showNote}`;

}



function getArgs(input, ...args) {

  let tag = typeof input === 'string' ? input : input.role;

  return tag === ROLE.ROYAL ? [tag, input, ...args] : [tag, ...args];

}