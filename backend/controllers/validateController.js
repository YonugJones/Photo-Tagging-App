const prisma = require('../prisma/prismaClient');
const asyncHandler = require('express-async-handler');
const CustomError = require('../errors/customError');

const validateClick = asyncHandler(async (req, res) => {
  const { clickX, clickY, characterName } = req.body;

  const character = await prisma.character.findUnique({
    where: { name: characterName }
  })

  if (!character) {
    throw new CustomError('Character not found', 404)
  }

  const isClickWithinRange = (clickX, clickY, targetX, targetY, tolerance = 20) => {
    const deltaX = Math.abs(clickX - targetX);
    const deltaY = Math.abs(clickY - targetY);
    return deltaX <= tolerance && deltaY <= tolerance;
  };

  const isValid = isClickWithinRange(clickX, clickY, character.x, character.y)

  if (isValid) {
    return res.json({
      success: true,
      message: `Congratulations! You found ${characterName}!`
    })
  } else {
    return res.json({
      success: false,
      message: `Uh oh! That's not ${characterName}`
    })
  }
})

module.exports = validateClick;