import { causes } from '@src/lib/routes'
import { Loader } from '@src/shared/loader'
import React, { useEffect } from 'react'

export const InitScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.navigate(causes)
  }, [])

  return <Loader />
}
