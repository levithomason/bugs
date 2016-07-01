const input = '10\r\n1 1 2 1 6 4 8   2 4 3'

let playerHealth = 10
let playerLevel = 1
let bugsKilled = 0

function processData(input) {
  let [numBugs, bugLevels] = input.replace('\r', '').split('\n')

  numBugs = Number(numBugs)
  bugLevels = bugLevels
    .split(' ')
    // guessing the input includes extra spaces?
    .filter(bugLevel => bugLevel !== '')
    .map(Number)

  // SUCCESSFUL guess the input exceeds the numBugs, do not rely on input len.
  for (let i = 0; i < numBugs; i += 1) {
    const bugLevel = bugLevels[i]

    // guessing the bug value might be beyond allowed spec values?
    // NEXT deal with '01' as a minimum, it's in the docs?
    if (bugLevel > 25 || bugLevel < 1) continue

    if (bugLevel > playerLevel) {
      // Bug is higher level than you: Inflict damage double the bug's level.
      playerHealth -= bugLevel * 2
    } else if (bugLevel === playerLevel) {
      // Bug is your level: Inflict damage equal to bug's level.
      playerHealth -= bugLevel
    } else {
      // Bug is below your level: Inflict 1 damage
      playerHealth -= 1
    }

    // die or kill bug
    if (playerHealth <= 0) {
      break
    } else {
      bugsKilled++

      // level up
      if (bugsKilled % 3 === 0) {
        playerHealth = 10 + (playerLevel * 5)
        playerLevel++
      }
    }
  }

  if (playerHealth <= 0) {
    console.log(`You have died. Reached level ${playerLevel} and killed ${bugsKilled} bugs`)
  } else {
    console.log(`You have won! Reached level ${playerLevel} and killed ${bugsKilled} bugs`)
  }
}

processData(input)
