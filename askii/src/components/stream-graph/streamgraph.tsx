"use client";

import React, { useMemo } from "react";
import { Stack } from "@visx/shape";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { transpose } from "@visx/vendor/d3-array";
import { animated, useSpring } from "@react-spring/web";
import { useTheme } from "next-themes";

import useForceUpdate from "./useForceUpdate";
import generateData from "./generateData";

const NUM_LAYERS = 12;
const SAMPLES_PER_LAYER = 100;
const BUMPS_PER_LAYER = 8;
export const BACKGROUND = "transparent";

const range = (n: number) => Array.from(new Array(n), (_, i) => i);
const keys = range(NUM_LAYERS);

const xScale = scaleLinear<number>({
  domain: [0, SAMPLES_PER_LAYER - 1],
});

const yScale = scaleLinear<number>({
  domain: [-30, 60],
});

const lightColors = [
 "#F4743B", // warm orange
    "#E15634", // sunset orange
    "#D23B2A", // coral red
    "#B44C43", // terra cotta
    "#CDF2F0", // slate blue
    "#346B95", // ocean blue
    "#3F7CAC", // steel blue
    "#5C93B8", // powder blue
    "#7C9C83", // sage
    "#A7B99E", // moss
    "#FFD93D", // sand
    "#DEB841", // golden
];

const darkColors = [
    "#e3aa00", // gold
    "#E85D04", // deep orange
    "#DC2F02", // burnt orange
    "#9D0208", // dark red
    "#6A040F", // burgundy
    "#370617", // deep burgundy
    "#03071E", // navy
    "#012A4A", // dark blue
    "#014F86", // deep blue
    "#2C7DA0", // steel blue
    "#468FAF", // blue gray
    "#61A5C2", // slate blue
];

type Datum = number[];
const getY0 = (d: Datum) => yScale(d[0]) ?? 0;
const getY1 = (d: Datum) => yScale(d[1]) ?? 0;

export type StreamGraphProps = {
  width: number;
  height: number;
  animate?: boolean;
};

export default function Streamgraph({
  width,
  height,
  animate = true,
}: StreamGraphProps) {
  const forceUpdate = useForceUpdate();
  const { theme } = useTheme();

  const colorScale = useMemo(() => 
    scaleOrdinal<number, string>({
      domain: keys,
      range: theme === 'dark' ? darkColors : lightColors,
    })
  , [theme]);

  xScale.range([0, width]);
  yScale.range([height, 0]);
  
  const layers = useMemo(
    () =>
      transpose<number>(
        keys.map(() => generateData(SAMPLES_PER_LAYER, BUMPS_PER_LAYER))
      ),
    [forceUpdate]
  );

  if (width < 10) return null;

  return (
    <svg
      width={width}
      height={height}
      className="absolute top-0 left-0 z-0 overflow-hidden"
    >
      <g>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={BACKGROUND}
          rx={14}
          style={{ pointerEvents: "none" }}
        />
        <Stack<number[], number>
          data={layers}
          keys={keys}
          offset="wiggle"
          color={colorScale}
          x={(_, i) => xScale(i) ?? 0}
          y0={getY0}
          y1={getY1}
        >
          {({ stacks, path }) =>
            stacks.map((stack) => {
              const pathString = path(stack) || "";
              const tweened = animate
                // eslint-disable-next-line react-hooks/rules-of-hooks
                ? useSpring({ pathString })
                : { pathString };
              const color = colorScale(stack.key);
              return (
                <g key={`series-${stack.key}`}>
                  <animated.path d={tweened.pathString} fill={color} />
                  <animated.path
                    d={tweened.pathString}
                    fill={color}
                    opacity={0.2}
                  />
                </g>
              );
            })
          }
        </Stack>
      </g>
    </svg>
  );
}
