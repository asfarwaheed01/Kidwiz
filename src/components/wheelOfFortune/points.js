// POINTS ARE OBTAINED FROM THE 500x500 CANVAS

const TWO_SEGMENT_POINTS = {
  1: [{ x: 0, y: 107 }],
};

const THREE_SEGMENT_POINTS = {
  1: [{ x: 121, y: -70 }],
  2: [
    { x: 159, y: -92 },
    { x: 83, y: -48 },
  ],
  3: [
    { x: 153, y: -88 },
    { x: 133, y: 3.5 },
    { x: 67, y: -115 },
  ],
  4: [
    { x: 153, y: -88 },
    { x: 150, y: 20.5 },
    { x: 67, y: -140 },
    { x: 83, y: -48 },
  ],
};

const FOUR_SEGMENT_POINTS = {
  1: [{ x: 107, y: -107 }],
  2: [
    { x: 125, y: -125 },
    { x: 70, y: -70 },
  ],
  3: [
    { x: 70, y: -70 },
    { x: 164, y: -67 },
    { x: 67, y: -164 },
  ],
  4: [
    { x: 125, y: -125 },
    { x: 70, y: -70 },
    { x: 180, y: -64 },
    { x: 64, y: -180 },
  ],
};

const FIVE_SEGMENT_POINTS = {
  1: [{ x: 87, y: -120 }],
  2: [
    { x: 108, y: -148 },
    { x: 62, y: -84 },
  ],
  3: [
    { x: 53, y: -183 },
    { x: 57, y: -78 },
    { x: 149, y: -117 },
  ],
  4: [
    { x: 48, y: -64 },
    { x: 94, y: -127 },
    { x: 169, y: -105 },
    { x: 50, y: -192 },
  ],
};

const POINTS = ({ segments = 2 }) => {
  if (segments < 2 || segments > 5) return [];
  else if (segments === 2) return TWO_SEGMENT_POINTS;
  else if (segments === 3) return THREE_SEGMENT_POINTS;
  else if (segments === 4) return FOUR_SEGMENT_POINTS;
  else if (segments === 5) return FIVE_SEGMENT_POINTS;
};

export default POINTS;
