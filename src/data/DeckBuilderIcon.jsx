/* eslint-disable max-len */
import * as React from 'react';
import { SvgIcon } from '@mui/material';

export default function DeckBuilderIcon(props) {
  const { customPaths, iconColor, ...otherProps } = props;
  const defaultPaths = [
    'M1050 1666 c-129 -45 -387 -136 -572 -201 -186 -65 -347 -127 -358 -137 -24 -22 -26 -70 -5 -92 48 -48 491 -413 513 -423 65 -29 98 -20 679 183 309 108 576 205 592 215 25 15 31 25 31 53 0 38 -4 42 -348 330 -160 134 -198 156 -259 156 -21 -1 -143 -38 -273 -84z',
    'M60 1188 c0 -7 6 -23 13 -35 14 -25 477 -417 522 -441 19 -11 55 -16 100 -17 66 0 104 12 633 198 310 108 577 204 593 213 29 14 49 48 49 81 0 13 -4 12 -24 -6 -28 -27 0 -16 -656 -247 -583 -205 -602 -210 -686 -168 -22 10 -149 111 -282 224 -134 113 -248 207 -253 208 -5 2 -9 -2 -9 -10z',
    'M70 1079 c0 -36 7 -43 253 -249 138 -117 266 -219 284 -226 18 -8 59 -14 92 -14 53 0 133 25 630 199 313 110 579 204 590 210 28 16 51 51 51 80 l0 24 -23 -21 c-36 -34 -1183 -432 -1243 -432 -89 0 -111 14 -370 232 -137 116 -252 215 -256 222 -4 6 -8 -5 -8 -25z',
    'M70 972 c0 -35 4 -38 324 -305 181 -152 203 -167 253 -177 30 -7 71 -9 92 -5 44 8 1109 379 1167 406 41 19 64 52 64 91 l0 21 -23 -21 c-14 -13 -243 -100 -602 -227 -742 -262 -679 -258 -902 -69 -68 57 -179 152 -248 210 -122 103 -125 105 -125 76z',
    'M70 873 c0 -18 7 -38 15 -47 38 -37 490 -413 514 -426 17 -10 52 -14 101 -14 71 1 104 11 634 198 307 108 572 204 588 212 30 15 48 49 48 87 -1 19 -2 20 -13 7 -7 -8 -19 -21 -28 -27 -20 -16 -1140 -408 -1192 -417 -21 -4 -63 -2 -93 4 -51 11 -72 26 -282 202 -125 105 -242 204 -259 221 l-33 31 0 -31z',
    'M70 778 c0 -30 10 -39 324 -301 181 -152 203 -167 253 -177 30 -7 71 -9 92 -5 44 8 1109 379 1167 406 22 11 46 31 52 45 19 39 14 49 -11 26 -36 -34 -1183 -432 -1243 -432 -89 0 -111 14 -370 232 -137 116 -252 215 -256 222 -5 6 -8 -1 -8 -16z',
  ];
  const paths = defaultPaths;
  return (
    <SvgIcon
      {...otherProps}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="300.000000pt"
      height="300.000000pt"
      viewBox="0 0 200.000000 200.000000"
      preserveAspectRatio="xMidYMid meet"
      strokeWidth={1.5}
    >
      <g
        transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
        // fill="rgba(0, 0, 0, 0.54)"
        fill={iconColor || 'rgba(0, 0, 0, 0.54)'}
        stroke="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths?.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </SvgIcon>
  );
}
