'use strict'

const data = require('../data/restaurant.json').results

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 為每個對象添加 createdAt 和 updatedAt 欄位
    const dataWithTimestamps = data.map((item) => {
      return {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })

    await queryInterface.bulkInsert('Results', dataWithTimestamps)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Results', null, {})
  },
}
