const viewInstructionsB = new Binder(true);

const instructions = {
  height: "100vh",
  background: "rgba(255,255,255,0.68)",
  position: "relative",
  css: {
    p: {
      marginTop: "0.25em",
      textIndent: "1em",
      textAlign: "left",
    },
  },
  a: {
    position: "absolute",
    left: "100%",
    whiteSpace: "nowrap",
    padding: "0.5em 1em",
    background: "rgba(0,0,0,50)",
    text: viewInstructionsB.bind(["«", "Instructions »"]),
    click: e => viewInstructionsB.value = !viewInstructionsB.value,
  },
  main: {
    overflow: "hidden",
    transition: ".25s",
    maxWidth: viewInstructionsB.bind(["25em", "0"]),
    section: {
      width: "25em",
      padding: "0 2em 2em",
      h1: "DOMiNíES",
      i: "by Lenino",
      h2: "Instructions",
      section: [{
        p: "<b>DOMiNíES</b> has 24 square tiles and a 6x6 board. The tiles contain every combination of a 2x2 pattern with three colors (red, white, and blue). No two tiles are the same, no matter how you rotate them.",
      }, {
        h5: "Setup",
        p: ["Similarly to dominos or mahjong, 4 players sit on each side of a square table. Each gets 6 random tiles, and conceals them from the others. The player who gets the white square starts by putting that tile anywhere on the board. After that, the turns go clockwise."],
      }, {
        h5: "Turns",
        p: [
          "Place one of your tiles on a square on the board. It must be touching at least one tile already there, and must match any touching colors. If you cannot find a placement for any of your tiles, say: “Pass”, and it will be the next player's turn.",
          "You get 1 point for every tile your tile touches at the moment you place it. Write down and add your points on each round. The first player gets no points for placing the white tile.",
        ]
      }, {
        h5: "Ending",
        p: [
          "The game ends when one player runs out of tiles. The player with the most points wins.",
          "You may also play in 2 teams: where players who face each other add up their points against the other two."
        ]
      }]
    }
  }
};