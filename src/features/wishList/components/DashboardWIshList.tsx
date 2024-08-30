import { useQuery, useMutation } from '@apollo/client'
import React from 'react'

import Loading from '@/components/elements/message/Loading'
import { ListIcon, WishListIllustration } from '@/constants/icons/icons'
import { useToast } from '@/contexts/ToastContext'
import { WISH_LIST_STATUS_UPDATE } from '@/features/wishList/graphql/mutation'
import { WISH_LIST_QUERY } from '@/features/wishList/graphql/query'
import { cacheUpdateFunction } from '@/features/wishList/utils/utils'
import { useAuth } from '@/hooks/useAuth'
import { getErrorMessage } from '@/utils/errorHandler'

import { ListItemType } from '../types/types'

const DashboardWIshList = () => {
  const { userId } = useAuth()
  const { data: wishListData, loading } = useQuery(WISH_LIST_QUERY, {
    variables: {
      userId
    }
  })

  const { addToastMessage } = useToast()

  const [updateItemStatus] = useMutation(WISH_LIST_STATUS_UPDATE, {
    update: (cache, data) => cacheUpdateFunction(cache, data, 'STATUS_UPDATE', userId)
  })

  const handleItemStatus = async (id: string, checked: boolean) => {
    if (!checked) {
      try {
        await updateItemStatus({
          variables: {
            id,
            checked: true
          }
        })
        addToastMessage('item checked!')
      } catch (error) {
        addToastMessage(getErrorMessage(error), true)
      }
    }
  }

  const isAnyUncheckedItems = wishListData?.wishList.some((item: ListItemType) => !item.checked)

  return (
    <div className="xs:w-1/2 w-full xs:h-full max-xs:h-[300px] rounded-lg flex gap-md p-[15px] xs:p-md bg-gray shadow-[5px_10px_10px_-5px_rgba(0,0,0,0.3)] relative overdflow-hidden">
      <div className="w-full h-full flex  flex-col gap-sm overflow-hidden">
        <h2 className=" text-base text-center  items-center flex justify-cente gap-sm font-bolder  ">
          <span className="h-8 w-8 bg-middleGreen flex items-center justify-center rounded-md">
            <ListIcon style="fill-none stroke-gray" />
          </span>
          <span className="whitespace-nowrap">Wish List</span>
        </h2>
        {loading && (
          <div className="h-3/5 mb-md">
            <Loading size="large"></Loading>
          </div>
        )}
        {!isAnyUncheckedItems && !loading && (
          <div className="flex w-full h-full justify-center items-center">
            <span className="mb-5">You have no item on your wish list</span>
          </div>
        )}
        {wishListData?.wishList.length > 0 && isAnyUncheckedItems && (
          <div className="overflow-y-scroll w-full xs:px-2xl px-sm xs:max-h-[210px]">
            <ul className="w-full h-full">
              {wishListData?.wishList.map((item: { itemName: string; id: string; checked: boolean }) => {
                if (item.checked) return null
                return (
                  <li
                    key={item.id}
                    className="border-dotted border-b border-middleGreen h-9 w-full flex items-center justify-start gap-3 text-richGreen"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-accentOrange border-accentOrange
            focus:ring-0 ring-0 rounded-sm form-checkbox bg-gray"
                      onChange={() => handleItemStatus(item.id, item.checked)}
                    />

                    <span className="w-full truncate">{item.itemName}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      <WishListIllustration style="absolute xs:-bottom-[22px] -bottom-[18px] xs:-right-4 max-xs:right-1 xs:h-[135px] xs:w-[135px] h-[100px] w-[100px]" />
    </div>
  )
}

export default DashboardWIshList
