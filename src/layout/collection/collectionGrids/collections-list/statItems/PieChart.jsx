import { mockPieData as data } from '../../../data/mockData';
import { useMode } from '../../../../../context';
import { ResponsivePie } from '@nivo/pie';

const PieChart = () => {
  // const { theme } = useMode();
  // const colors = theme.palette.chartTheme;
  // const lightGrey = colors.grey.lightest;
  return (
    <ResponsivePie
      activeOuterRadiusOffset={8}
      animate
      data={[
        {
          color: 'hsl(131, 70%, 50%)',
          id: 'c',
          value: 589,
        },
        {
          color: 'hsl(344, 70%, 50%)',
          id: 'ruby',
          value: 439,
        },
        {
          color: 'hsl(162, 70%, 50%)',
          id: 'haskell',
          value: 251,
        },
        {
          color: 'hsl(86, 70%, 50%)',
          id: 'css',
          value: 304,
        },
        {
          color: 'hsl(77, 70%, 50%)',
          id: 'go',
          value: 74,
        },
        {
          color: 'hsl(50, 70%, 50%)',
          id: 'sass',
          value: 68,
        },
        {
          color: 'hsl(180, 70%, 50%)',
          id: 'scala',
          value: 172,
        },
        {
          color: 'hsl(59, 70%, 50%)',
          id: 'javascript',
          value: 439,
        },
        {
          color: 'hsl(98, 70%, 50%)',
          id: 'elixir',
          value: 366,
        },
      ]}
      height={500}
      legends={[]}
      margin={{
        bottom: 80,
        left: 120,
        right: 120,
        top: 80,
      }}
      theme={{
        text: {
          fontFamily:
            "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
        },
      }}
      width={900}
      // activeOuterRadiusOffset={8}
      // height={500}
      // width={900}
      // animate
      // data={data}
      // theme={{
      //   axis: {
      //     domain: {
      //       line: {
      //         stroke: lightGrey,
      //       },
      //     },
      //     legend: {
      //       text: {
      //         fill: lightGrey,
      //       },
      //     },
      //     ticks: {
      //       line: {
      //         stroke: lightGrey,
      //         strokeWidth: 1,
      //       },
      //       text: {
      //         fill: lightGrey,
      //       },
      //     },
      //   },
      //   legends: {
      //     text: {
      //       fill: lightGrey,
      //     },
      //   },
      // }}
      // // animate={true}
      // margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      // innerRadius={0.5}
      // padAngle={0.7}
      // cornerRadius={3}
      // borderColor={{
      //   from: 'color',
      //   modifiers: [['darker', 0.2]],
      // }}
      // // motionConfig="gentle"
      // // stiffness={90}
      // // damping={15}
      // // arcLinkLabelsSkipAngle={10}
      // // arcLinkLabelsTextColor="#333333"
      // // arcLinkLabelsThickness={2}
      // // arcLinkLabelsColor={{ from: 'color' }}
      // // arcLabelsSkipAngle={10}
      // // enableArcLabels={false}
      // // arcLabelsRadiusOffset={0.4}
      // // arcLabelsTextColor={{
      // //   from: 'color',
      // //   modifiers: [['darker', 2]],
      // // }}
      // defs={[
      //   {
      //     id: 'dots',
      //     type: 'patternDots',
      //     background: 'inherit',
      //     color: 'rgba(255, 255, 255, 0.3)',
      //     size: 4,
      //     padding: 1,
      //     stagger: true,
      //   },
      //   {
      //     id: 'lines',
      //     type: 'patternLines',
      //     background: 'inherit',
      //     color: 'rgba(255, 255, 255, 0.3)',
      //     rotation: -45,
      //     lineWidth: 6,
      //     spacing: 10,
      //   },
      // ]}
      // fill={[
      //   {
      //     match: {
      //       id: 'ruby',
      //     },
      //     id: 'dots',
      //   },
      //   {
      //     match: {
      //       id: 'c',
      //     },
      //     id: 'dots',
      //   },
      //   {
      //     match: {
      //       id: 'go',
      //     },
      //     id: 'dots',
      //   },
      //   {
      //     match: {
      //       id: 'python',
      //     },
      //     id: 'dots',
      //   },
      //   {
      //     match: {
      //       id: 'scala',
      //     },
      //     id: 'lines',
      //   },
      //   {
      //     match: {
      //       id: 'lisp',
      //     },
      //     id: 'lines',
      //   },
      //   {
      //     match: {
      //       id: 'elixir',
      //     },
      //     id: 'lines',
      //   },
      //   {
      //     match: {
      //       id: 'javascript',
      //     },
      //     id: 'lines',
      //   },
      // ]}
      // legends={[]}

      // legends={[
      //   {
      //     anchor: 'bottom',
      //     direction: 'row',
      //     justify: false,
      //     translateX: 0,
      //     translateY: 56,
      //     itemsSpacing: 0,
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     itemTextColor: '#999',
      //     itemDirection: 'left-to-right',
      //     itemOpacity: 1,
      //     symbolSize: 18,
      //     symbolShape: 'circle',
      //     effects: [
      //       {
      //         on: 'hover',
      //         style: {
      //           itemTextColor: '#000',
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
};

export default PieChart;
