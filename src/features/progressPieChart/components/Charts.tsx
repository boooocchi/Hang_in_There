import { useQuery, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

import { limitDataItem } from '../types/pirChartTypes';
import { percentageCalculator, countByCategory } from '../utils/chartUtils';

const LIMITENTRIES_QUERY = gql`
  query LimitEntries($userId: String!) {
    limitEntries(userId: $userId) {
      category
      value
    }
  }
`;

const PIECES_QUERY = gql`
  query Pieces($userId: String!) {
    pieces(userId: $userId) {
      category
    }
  }
`;

type PercentagesType = {
  [key in 'SHOES' | 'OUTERWEAR' | 'LIGHTTOPS' | 'HEAVYTOPS' | 'BOTTOMS' | 'ACCESSORIES']: {
    percentage: number;
  };
};

const Charts = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const {
    data: limitData,
    // loading,
    // error,
  } = useQuery(LIMITENTRIES_QUERY, {
    variables: { userId },
  });

  const { data: piecesData } = useQuery(PIECES_QUERY, {
    variables: { userId },
  });

  const [percentages, setPercentage] = React.useState<PercentagesType>({
    OUTERWEAR: { percentage: 0 },
    HEAVYTOPS: { percentage: 0 },
    LIGHTTOPS: { percentage: 0 },
    BOTTOMS: { percentage: 0 },
    SHOES: { percentage: 0 },
    ACCESSORIES: { percentage: 0 },
  });

  React.useEffect(() => {
    if (limitData && limitData.limitEntries && piecesData && piecesData.pieces) {
      limitData.limitEntries.forEach((item: limitDataItem) => {
        const numOfPieces = countByCategory(piecesData.pieces, item.category);

        const percentage = percentageCalculator(item.value, numOfPieces);
        setPercentage((prev) => ({ ...prev, [item.category]: { percentage } }));
      });
    }
  }, [limitData, piecesData]);

  return (
    <div className="grid grid-cols-3  h-full gap-x-5 content-center overflow-hidden text-white mt-5 p-sm ">
      {Object.keys(percentages).map((key, index) => {
        const categoryKey = key as keyof PercentagesType;
        const percentage = percentages[categoryKey].percentage;
        return (
          <div key={index} className="h-full flex justify-center  relative overflow-hidden ">
            <CircularProgressbar
              value={percentage}
              strokeWidth={12}
              className={`  h-full w-full`}
              circleRatio={0.5}
              counterClockwise={true}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: 'round',
                textSize: '16px',
                pathTransitionDuration: 0.3,
                pathColor: `#F78C5F`,
                textColor: '#11221F',
                trailColor: '#ddd ',
                backgroundColor: '#00483F',
              })}
            />
            <h2 className="text-richGreen text-sm font-bold absolute bottom-[30%]">{key}</h2>
            <span className="text-richGreen font-bold absolute text-sm bottom-[50%]">{percentage}%</span>
          </div>
        );
      })}
    </div>
  );
};

export default Charts;
