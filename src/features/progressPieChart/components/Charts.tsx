import { useQuery, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

import { ChartIcon, ChartIllustration } from '@/components/elements/icons/icons';
import Loading from '@/components/elements/message/Loading';

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
  const [isLoading, setIsLoading] = React.useState(false);

  const { data: limitData } = useQuery(LIMITENTRIES_QUERY, {
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
    setIsLoading(true);
    if (limitData && limitData.limitEntries && piecesData && piecesData.pieces) {
      limitData.limitEntries.forEach((item: limitDataItem) => {
        const numOfPieces = countByCategory(piecesData.pieces, item.category);

        const percentage = percentageCalculator(item.value, numOfPieces);
        setPercentage((prev) => ({ ...prev, [item.category]: { percentage } }));
      });
    }
    setIsLoading(false);
  }, [limitData, piecesData]);

  return (
    <div className="xs:h-full xs:w-1/2 w-full bg-gray shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)] p-md rounded-lg flex flex-col gap-sm relative max-xs:h-[250px]">
      <h2 className="text-base flex items-center gap-sm font-bolder">
        <span className="h-8 w-8 bg-middleGreen flex items-center justify-center rounded-md">
          <ChartIcon />
        </span>
        Your Wardrobe Capacity
      </h2>
      <div className="flex-grow flex items-center justify-center ">
        {isLoading ? (
          <Loading size="large"></Loading>
        ) : (
          <div className="grid grid-cols-3 xs:gap-x-xs gap-x-xs overflow-hidden content-center text-gray  xs:px-lg xs:ml-8 ml-md h-full">
            {Object.keys(percentages).map((key, index) => {
              const categoryKey = key as keyof PercentagesType;
              const percentage = percentages[categoryKey].percentage;
              return (
                <div key={index} className="w-full flex justify-center px-xs relative overflow-hidden text-deepGreen">
                  <CircularProgressbar
                    value={percentage}
                    strokeWidth={15}
                    circleRatio={0.5}
                    className="xs:h-[100px] xs:w-[180px] h-[77px] w-[100px]"
                    counterClockwise={true}
                    styles={buildStyles({
                      rotation: 0.25,
                      strokeLinecap: 'round',
                      pathTransitionDuration: 0.5,
                      pathColor: `#11655b`,
                      trailColor: '#ddd',
                      backgroundColor: '#11655b',
                    })}
                  />
                  <h2 className="text-xs font-bold absolute bottom-[20%]">{key}</h2>
                  <span className=" font-bold absolute text-sm bottom-[40%]">{percentage}%</span>
                </div>
              );
            })}
          </div>
        )}

        <ChartIllustration style="absolute xs:-bottom-[23px] -bottom-[18px] xs:-left-0 -left-1 h-[130px] w-[130px] xs:h-[160px] xs:w-[160px] " />
      </div>
    </div>
  );
};

export default Charts;
