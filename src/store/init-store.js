import { TRENDING_CAUSES } from '@src/store/initial-data'
import { createStoreon } from 'storeon'
import trendingCauses from './trending-causes'

export default createStoreon([trendingCauses(TRENDING_CAUSES)])
