const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const getScores = asyncHandler(async (req, res) => {
  const scores = await prisma.score.findMany({
    orderBy: { time: 'desc' },
    select: {
      playerName: true,
      time: true
    }
  })

  res.status(200).json({
    success: true,
    message: 'All scores retrieved',
    data: scores
  })
}) 

module.exports = {
  getScores
}