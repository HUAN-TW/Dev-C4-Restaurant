const data = require('./data/restaurant.json').results

//console.log(data)

const dataWithTimestamps = data.map((item) => {
  return {
    ...item,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})

console.log(dataWithTimestamps)
