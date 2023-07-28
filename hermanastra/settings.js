

export const COLOR = {
    LIGHT: "antiqueWhite",
    DARK: "#012",
    BRIGHT: "#09a",
    HIGHLIGHT: "teal",
    ACCENT: "#D45AAC",
};

export const INC = new Binder(0);
setInterval(e => INC.value = (INC.value + 0.2) % 100, 50);