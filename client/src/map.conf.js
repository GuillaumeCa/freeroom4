const NDC_FLOOR =
  'M320,64.178273 L320,194.317549 L33.8255153,194.317549 L0,160.492033 L0,0 L100.724234,0 L100.724234,22.446351 L162.261393,72.2005571 L278.356323,72.2005571 L278.356323,64.178273 L320,64.178273 L320,64.178273 Z';

export const buildingsConf = {
  NDC: [
    {
      floor: 0,
      ground: NDC_FLOOR,
      pos: { width: 320, height: 195 },
      rooms: [],
    },
    {
      floor: 1,
      ground: NDC_FLOOR,
      pos: { width: 320, height: 195 },
      rooms: [
        {
          id: 'N16A',
          pos: { top: 126, left: 0, width: 180, height: 67 },
          floor: {
            type: 'POLY',
            path:
              'M57.9387187,126.573816 L82.8969359,151.532033 L180.947075,151.532033 L180.947075,194.317549 L34.2943733,194.317549 L0,160.023175 L0,126.573816 L57.9387187,126.573816 Z',
            transform: 'translate(0, -126)',
          },
          text: { x: '30%', y: '70%' },
        },
        {
          id: 'N16B',
          pos: { top: 151, left: 180, width: 139, height: 42 },
          floor: { type: 'RECT' },
          text: { x: '30%', y: '70%' },
        },
        {
          id: 'N15',
          pos: { top: 71, left: 160, width: 117, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '70%' },
        },
        {
          id: 'N18',
          pos: { top: 0, left: 0, width: 60, height: 70 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
      ],
    },
    {
      floor: 2,
      ground: NDC_FLOOR,
      pos: { width: 320, height: 195 },
      rooms: [
        {
          id: 'N24',
          pos: { top: 141, left: 66, width: 127, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'N26',
          pos: { top: 141, left: 193, width: 126, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'N28',
          pos: { top: 0, left: 0, width: 59, height: 113 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
      ],
    },
    {
      floor: 3,
      ground: NDC_FLOOR,
      pos: { width: 320, height: 195 },
      rooms: [
        {
          id: 'N34',
          pos: { top: 141, left: 66, width: 127, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'N36',
          pos: { top: 141, left: 193, width: 126, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'N33',
          pos: { top: 73, left: 162, width: 115, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'N38',
          pos: { top: 0, left: 0, width: 59, height: 113 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'N39',
          pos: { top: 23, left: 85, width: 41, height: 21 },
          floor: {
            type: 'POLY',
            path:
              'M0,0 L15.5853207,0 L40.7799988,20.5400007 L0,20.5400009 L0,0 Z',
          },
        },
      ],
    },
    {
      floor: 4,
      ground: NDC_FLOOR,
      pos: { width: 320, height: 195 },
      rooms: [
        {
          id: 'N43',
          pos: { top: 73, left: 162, width: 115, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'N44',
          pos: { top: 141, left: 66, width: 127, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'N46',
          pos: { top: 141, left: 193, width: 126, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'N48',
          pos: { top: 0, left: 0, width: 59, height: 113 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
      ],
    },
  ],
  NDL: [
    {
      floor: 0,
      ground:
        'M1.47249908e-08,0 L320,0 L319.999992,47.3491416 L280.350635,47.3491416 L280.350635,64.3457753 L250.628555,64.3457753 L250.628555,47.3491416 L176.867786,47.3491416 L176.867786,69.8415583 L171.528286,69.8415583 L171.528286,145 L110.187073,145 L110.187069,69.8415572 L102.942462,69.8415572 L102.942464,47.3491416 L27.0491139,47.3491429 L27.0491137,64.3457753 L3.58921309e-15,64.3457753 L1.47249908e-08,0 Z',
      pos: { width: 320, height: 145 },
      rooms: [
        {
          id: 'L012',
          pos: { top: 0, left: 211, width: 53, height: 48 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'L017',
          pos: { top: 23, left: 290, width: 30, height: 25 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%', fontSize: '12' },
        },
        {
          id: 'L016',
          pos: { top: 0, left: 290, width: 30, height: 25 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%', fontSize: '12' },
        },
      ],
    },
    {
      floor: 1,
      ground:
        'M1.47249908e-08,16.8993304 L116.613871,16.8993304 L116.613871,0.21476282 L162.484074,0.21476282 L162.484074,16.8993304 L320,16.8993304 L319.999992,64.226144 L280.350635,64.226144 L280.350635,81.2147628 L250.628555,81.2147628 L250.628555,64.226144 L176.867786,64.226144 L176.867786,78.8509539 L102.942462,78.8509528 L102.942464,64.226144 L27.0491139,64.2261454 L27.0491137,81.2147628 L3.58921309e-15,81.2147628 L1.47249908e-08,16.8993304 Z',
      pos: { width: 320, height: 145 },
      rooms: [
        {
          id: 'L122',
          pos: { top: 17, left: 281, width: 39, height: 47 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'L114',
          pos: { top: 28, left: 177, width: 41, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'L115',
          pos: { top: 28, left: 217, width: 41, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'L108',
          pos: { top: 27, left: 76, width: 41, height: 52 },
          floor: {
            type: 'POLY',
            path:
              'M117,60.3560976 L117,27 L76,27 L76,64.5414634 L102.229814,64.5414634 L102.229814,79 L117,79 L117,60.3560976 Z',
            transform: 'translate(-76, -27)',
          },
          text: { x: '50%', y: '50%' },
        },
      ],
    },
    {
      floor: 2,
      ground:
        'M1.47249908e-08,16.6845676 L116.613871,16.6845676 L116.613871,-3.91537053e-16 L162.484074,-3.91537053e-16 L162.484074,16.6845676 L320,16.6845676 L319.999992,64.0113812 L280.350635,64.0113812 L280.350635,81 L250.628555,81 L250.628555,64.0113812 L27.0491139,64.0113826 L27.0491137,81 L3.58921309e-15,81 L1.47249908e-08,16.6845676 Z',
      pos: { width: 320, height: 145 },
      rooms: [
        {
          id: 'L206',
          pos: { top: 28, left: 41, width: 35, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%', fontSize: '12' },
        },
        {
          id: 'L207',
          pos: { top: 28, left: 75, width: 40, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%', fontSize: '12' },
        },
        {
          id: 'L213',
          pos: { top: 28, left: 186, width: 50, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'L212',
          pos: { top: 28, left: 138, width: 35, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'L220',
          pos: { top: 17, left: 281, width: 35, height: 47 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
      ],
    },
    {
      floor: 3,
      ground:
        'M1.4706558e-08,16.6845676 L116.467893,16.6845676 L116.467893,-3.91537053e-16 L162.280676,-3.91537053e-16 L162.280676,16.6845676 L279.999692,16.6845676 L279.999692,81 L250.314818,81 L250.314818,64.0113812 L27.0152538,64.0113826 L27.0152536,81 L3.58472011e-15,81 L1.4706558e-08,16.6845676 Z',
      pos: { width: 320, height: 145 },
      rooms: [
        {
          id: 'L311',
          pos: { top: 28, left: 140, width: 23, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%', fontSize: '12' },
        },
        {
          id: 'L312',
          pos: { top: 28, left: 162, width: 39, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'L313',
          pos: { top: 28, left: 199, width: 40, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'L306',
          pos: { top: 28, left: 78, width: 39, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'L305',
          pos: { top: 28, left: 42, width: 38, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
      ],
    },
    {
      floor: 4,
      ground:
        'M1.4706558e-08,16.6845676 L116.467893,16.6845676 L116.467893,-3.91537053e-16 L162.280676,-3.91537053e-16 L162.280676,16.6845676 L279.999692,16.6845676 L279.999692,81 L250.314818,81 L250.314818,64.0113812 L27.0152538,64.0113826 L27.0152536,81 L3.58472011e-15,81 L1.4706558e-08,16.6845676 Z',
      pos: { width: 320, height: 145 },
      rooms: [
        {
          id: 'L417',
          pos: { top: 28, left: 186, width: 48, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
        {
          id: 'L416',
          pos: { top: 28, left: 140, width: 47, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' },
        },
      ],
    },
  ],
};
