import { createStoreon } from 'storeon'
import trendingCauses from './trending-causes'
import { DateTime } from 'luxon'

import belarusData from './belarus'
import trumpData from './trump.json'
import blmData from './blm.json'
import motivationData from './motivation.json'
import coronaData from './corona.json'

const getInitialCauses = () => {
  const res = []
  res.push(parseTwitterData(belarusData))
  res.push(parseTwitterData(trumpData))
  res.push(parseTwitterData(blmData))
  res.push(parseTwitterData(motivationData))
  res.push(parseTwitterData(coronaData))
  return res
}

const parseTwitterData = data => {
  const { statuses, search_metadata } = data
  let tweetsScore = statuses.reduce(
    (result, item) => {
      result.likeScore += parseInt(item.favorite_count, 10)
      result.retweetScore += parseInt(item.retweet_count, 10)
      return result
    },
    {
      likeScore: 0,
      retweetScore: 0,
      freqScore: 0,
    },
  )
  const firstDate = DateTime.fromFormat(
    statuses[0].created_at,
    'EEE MMM dd HH:mm:ss ZZZ yyyy',
  )
  const lastDate = DateTime.fromFormat(
    statuses[statuses.length - 1].created_at,
    'EEE MMM dd HH:mm:ss ZZZ yyyy',
  )
  tweetsScore.freqScore = lastDate
    .minus({ seconds: firstDate.toSeconds() })
    .toSeconds()
  let finalScore = Math.floor(
    (tweetsScore.likeScore * 0.2 +
      tweetsScore.retweetScore * 0.3 -
      tweetsScore.freqScore * 0.5) /
      statuses.length /
      5,
  )
  if (finalScore < 0) {
    return {}
  }

  return {
    id: search_metadata.query,
    name: search_metadata.query,
    color: getCauseColor(finalScore),
    value: finalScore,
    maxValue: finalScore,
    isSelected: false,
  }
}

const getCauseColor = score => {
  switch (true) {
    case score < 10:
      return '#602BD0'
    case score < 20:
      return '#2353FF'
    case score < 30:
      return '#53A3ED'
    case score < 40:
      return '#32DAFF'
    case score < 80:
      return '#00FFC2'
    case score < 100:
      return '#5EFD81'
    case score < 120:
      return '#C8F34E'
    case score < 160:
      return '#E5E922'
    case score < 200:
      return '#FFCD4C'
    default:
      return '#FF4D4D'
  }
}

export default createStoreon([trendingCauses(getInitialCauses())])
