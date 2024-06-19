/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, theme } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker/generatePicker'
import type { Dayjs } from 'dayjs'
import React, { useState,lazy,Suspense } from 'react'
import IntroduceRow from './components/IntroduceRow'
import SalesCard, { TimeType } from './components/SalesCard'
import SalesHot from './components/SalesHot'
import styles from './index.less'
import { getTimeDistance } from './utils/utils'

// const RemoteButton = React.lazy(() => import('app2/Button'));
// const Button = React.lazy(() => import('react_app/ListUserReactComponent'));

const { useToken } = theme

type RangePickerValue = RangePickerProps<Dayjs>['value']

const SalesData: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(el => {
  return {
    x: `${el}月`,
    y: `${Math.floor(Math.random() * (20 - 10) + 10) * 10}`,
  }
})

const Analysis: React.FC = () => {
  const { token } = useToken()

  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance('today'),
  )

  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value)
  }

  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type))
  }

  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return ''
    }
    const value = getTimeDistance(type)
    if (!value) {
      return ''
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return ''
    }
    if (
      rangePickerValue[0].isSame(value[0] as Dayjs, 'day') &&
      rangePickerValue[1].isSame(value[1] as Dayjs, 'day')
    ) {
      return styles['current-date']
    }
    return ''
  }

  return (
    <div className={styles['analysis-container']}>
       {/* <React.Suspense fallback="Loading Button">
            <Button users = {[{name:123}]}/>
        </React.Suspense> */}
       {/* <React.Suspense fallback="Loading Button">
            <RemoteButton />
        </React.Suspense> */}
      <Input />
      <IntroduceRow />
      <SalesCard
        rangePickerValue={rangePickerValue}
        salesData={SalesData}
        isActive={isActive}
        handleRangePickerChange={handleRangePickerChange}
        selectDate={selectDate}
      />
      <SalesHot />
    </div>
  )
}

export default Analysis
