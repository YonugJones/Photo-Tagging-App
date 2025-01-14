const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const getScores = asyncHandler(async (req, res) => {
  const scores = await prisma.score.findMany({
    orderBy: { time: 'asc' },
    select: {
      playerName: true,
      time: true
    }
  })

  if (!scores) {
    throw new CustomError('Failed to find scores', 404);
  }

  res.status(200).json({
    success: true,
    message: 'All scores retrieved',
    data: scores
  })
});

const postScore = asyncHandler(async (req, res) => {
  const { playerName, time } = req.body;

  if (!playerName || !time) {
    throw new CustomError('Player name and time are required', 400);
  }

  const score = await prisma.score.create({
    data: {
      playerName,
      time,
    }
  })

  res.status(200).json({
    success: true,
    message: 'Score submitted',
    data: score
  })
})

module.exports = {
  getScores,
  postScore
}