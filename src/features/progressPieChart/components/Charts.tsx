import { useQuery, gql } from '@apollo/client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'

import Loading from '@/components/elements/message/Loading'
import { ChartIcon, ChartIllustration } from '@/constants/icons/icons'

import { limitDataItem } from '../types/pirChartTypes'
import { percentageCalculator, countByCategory } from '../utils/chartUtils'

const LIMITENTRIES_QUERY = gql`
  query LimitEntries($userId: String!) {
    limitEntries(userId: $userId) {
      category
      value
    }
  }
`

const PIECES_QUERY = gql`
  query Pieces($userId: String!) {
    pieces(userId: $userId) {
      category
    }
  }
`

type PercentagesType = {
  [key in 'SHOES' | 'OUTERWEAR' | 'LIGHTTOPS' | 'HEAVYTOPS' | 'BOTTOMS' | 'ACCESSORIES']: number
}

const Charts = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [isLoading, setIsLoading] = React.useState(false)

  const { data: limitData, loading: limitDataLoading } = useQuery(LIMITENTRIES_QUERY, {
    variables: { userId }
  })
  const { data: piecesData, loading: piecesDataLoading } = useQuery(PIECES_QUERY, {
    variables: { userId }
  })

  const [percentages, setPercentage] = React.useState<PercentagesType>({
    LIGHTTOPS: 0,
    HEAVYTOPS: 0,
    OUTERWEAR: 0,
    BOTTOMS: 0,
    SHOES: 0,
    ACCESSORIES: 0
  })

  React.useEffect(() => {
    setIsLoading(true)
    if (limitData && limitData.limitEntries && piecesData && piecesData.pieces) {
      limitData.limitEntries.forEach((item: limitDataItem) => {
        const numOfPieces = countByCategory(piecesData.pieces, item.category)

        const percentage = percentageCalculator(item.value, numOfPieces)
        setPercentage((prev) => ({ ...prev, [item.category]: percentage }))
      })
    }
    setIsLoading(false)
  }, [limitData, piecesData])

  return (
    <div className="xs:h-full xs:w-1/2 w-full bg-gray shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)] p-[15px] xs:p-md rounded-lg flex flex-col gap-md relative max-xs:h-[250px]">
      <h2 className="text-base flex items-center gap-sm font-bolder">
        <span className="h-8 w-8 bg-middleGreen flex items-center justify-center rounded-md">
          <ChartIcon />
        </span>
        Wardrobe Capacity
      </h2>
      <div className="flex-grow flex items-center justify-center ">
        {isLoading || limitDataLoading || piecesDataLoading ? (
          <div className="h-3/5 mb-2xl">
            <Loading size="large"></Loading>
          </div>
        ) : (
          <div className="grid grid-cols-3 xs:gap-x-sm gap-x-xs overflow-hidden content-center text-gray xs:px-lg xs:ml-5 h-full">
            {Object.keys(percentages).map((key, index) => {
              const categoryKey = key as keyof PercentagesType
              const percentage = percentages[categoryKey]
              return (
                <div key={index} className="w-full flex justify-center px-xs relative overflow-hidden text-deepGreen">
                  <CircularProgressbar
                    value={percentage}
                    strokeWidth={15}
                    circleRatio={0.5}
                    className="xs:h-[95px] h-[80px] w-[125px]"
                    counterClockwise={true}
                    styles={buildStyles({
                      rotation: 0.25,
                      pathTransitionDuration: 0.5,
                      pathColor: `#11655b`,
                      trailColor: '#ddd'
                    })}
                  />
                  <h2 className="text-xs font-bold absolute bottom-[20%]">{key}</h2>
                  <span className=" font-bold absolute text-sm bottom-[40%]">{percentage}%</span>
                </div>
              )
            })}
          </div>
        )}

        <ChartIllustration style="hidden xs:flex xs:absolute xs:-bottom-[40px] xs:-left-5 xs:h-[125px] xs:w-[125px] scale-x-[-1]" />
      </div>
    </div>
  )
}

export default Charts
