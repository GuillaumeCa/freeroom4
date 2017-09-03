
const NDC_FLOOR = 'M320,64.178273 L320,194.317549 L33.8255153,194.317549 L0,160.492033 L0,0 L100.724234,0 L100.724234,22.446351 L162.261393,72.2005571 L278.356323,72.2005571 L278.356323,64.178273 L320,64.178273 L320,64.178273 Z';

export const buildingsConf = {
  NDC: [
    {
      floor: 0,
      ground: NDC_FLOOR,
      rooms: []
    },
    {
      floor: 1,
      ground: NDC_FLOOR,
      rooms: [
        {
          id: 'N16A',
          pos: { top: 126, left: 0, width: 180, height: 67 },
          floor: {
            type: 'POLY',
            path: 'M57.9387187,126.573816 L82.8969359,151.532033 L180.947075,151.532033 L180.947075,194.317549 L34.2943733,194.317549 L0,160.023175 L0,126.573816 L57.9387187,126.573816 Z',
            transform: 'translate(0, -126)'
          },
          text: { x: '30%', y: '70%' }
        },
        {
          id: 'N16B',
          pos: { top: 151, left: 180, width: 139, height: 42 },
          floor: { type: 'RECT' },
          text: { x: '30%', y: '70%' }
        },
        {
          id: 'N15',
          pos: { top: 71, left: 160, width: 117, height: 36 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '70%' }
        },
        {
          id: 'N18',
          pos: { top: 0, left: 0, width: 60, height: 70 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
      ]
    },
    {
      floor: 2,
      ground: NDC_FLOOR,
      rooms: [
        {
          id: 'N24',
          pos: { top: 141, left: 66, width: 127, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
        {
          id: 'N26',
          pos: { top: 141, left: 193, width: 126, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
        {
          id: 'N28',
          pos: { top: 0, left: 0, width: 59, height: 113 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
      ]
    },
    {
      floor: 3,
      ground: NDC_FLOOR,
      rooms: [
        {
          id: 'N34',
          pos: { top: 141, left: 66, width: 127, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
        {
          id: 'N36',
          pos: { top: 141, left: 193, width: 126, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
        {
          id: 'N33',
          pos: { top: 73, left: 162, width: 115, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
        {
          id: 'N38',
          pos: { top: 0, left: 0, width: 59, height: 113 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
        {
          id: 'N39',
          pos: { top: 23, left: 85, width: 41, height: 21 },
          floor: {
            type: 'POLY',
            path: 'M0,0 L15.5853207,0 L40.7799988,20.5400007 L0,20.5400009 L0,0 Z'
          }
        }
      ]
    },
    {
      floor: 4,
      ground: NDC_FLOOR,
      rooms: [
        {
          id: 'N43',
          pos: { top: 73, left: 162, width: 115, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
        {
          id: 'N44',
          pos: { top: 141, left: 66, width: 127, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
        {
          id: 'N46',
          pos: { top: 141, left: 193, width: 126, height: 54 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
        {
          id: 'N48',
          pos: { top: 0, left: 0, width: 59, height: 113 },
          floor: { type: 'RECT' },
          text: { x: '50%', y: '60%' }
        },
      ]
    }
  ],
  NDL: [
    {

    },
  ]
}
