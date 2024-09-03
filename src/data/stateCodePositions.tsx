export interface StateCodePosition {
    stateCode: string;
    x: number;
    y: number;
    color?: string;
}
const stateCodePositions: StateCodePosition[] = [
    { stateCode: "CA", x: 50, y: 247 },
    { stateCode: "OR", x: 82, y: 110 },
    { stateCode: "WA", x: 100, y: 40 },
    { stateCode: "ID", x: 175, y: 130 },
    { stateCode: "NV", x: 120, y: 230 },
    { stateCode: "MT", x: 275, y: 75 },
    { stateCode: "WY", x: 280, y: 175 },
    { stateCode: "UT", x: 210, y: 240 },
    { stateCode: "AZ", x: 190, y: 340 },
    { stateCode: "CO", x: 310, y: 260 },
    { stateCode: "NM", x: 290, y: 360 },
    { stateCode: "AK", x: 110, y: 485 },
    { stateCode: "HI", x: 300, y: 550, color: 'state-details-dark' },
    { stateCode: "TX", x: 410, y: 435 },
    { stateCode: "OK", x: 440, y: 350 },
    { stateCode: "KS", x: 430, y: 275 },
    { stateCode: "NE", x: 410, y: 215 },
    { stateCode: "SD", x: 405, y: 150 },
    { stateCode: "ND", x: 400, y: 90 },
    { stateCode: "MN", x: 490, y: 100 },
    { stateCode: "IA", x: 505, y: 200 },
    { stateCode: "MO", x: 525, y: 280 },
    { stateCode: "AR", x: 530, y: 360 },
    { stateCode: "LA", x: 535, y: 445 },
    { stateCode: "WI", x: 570, y: 150 },
    { stateCode: "IL", x: 585, y: 250 },
    { stateCode: "MS", x: 585, y: 410 },
    { stateCode: "MI", x: 650, y: 165 },
    { stateCode: "IN", x: 630, y: 240 },
    { stateCode: "KY", x: 660, y: 290 },
    { stateCode: "TN", x: 640, y: 332 },
    { stateCode: "AL", x: 640, y: 400 },
    { stateCode: "OH", x: 690, y: 230 },
    { stateCode: "GA", x: 700, y: 400 },
    { stateCode: "FL", x: 750, y: 485 },
    { stateCode: "SC", x: 750, y: 370 },
    { stateCode: "NC", x: 760, y: 320 },
    { stateCode: "VA", x: 770, y: 275 },
    { stateCode: "WV", x: 725, y: 265 },
    { stateCode: "PA", x: 770, y: 200 },
    { stateCode: "NY", x: 800, y: 145 },
    { stateCode: "VT", x: 835, y: 115 },
    { stateCode: "NH", x: 855, y: 120 },
    { stateCode: "ME", x: 880, y: 70 },

];

export default stateCodePositions;
