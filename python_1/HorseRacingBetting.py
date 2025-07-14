import os, time, random

def ClearScreen():
    os.system('clear')

def HorseAnimation():
    horseNames = ["Horse 1", "Horse 2", "Horse 3", "Horse 4", "Horse 5", "Horse 6"]
    positions = [0, 0, 0, 0, 0, 0]
    finishPosition = 50

    while max(positions) < finishPosition:
        ClearScreen()

        for i in range(len(horseNames)):
            move = random.randint(1, 3)
            positions[i] += move
            print(f"{horseNames[i]}: " + "█" * positions[i])

        time.sleep(0.2)

    winnerIndex = positions.index(max(positions))
    print(f"\n {horseNames[winnerIndex]} won the race!")

def loadBalance():
    try:
        with open("HorseRacingMoney.txt", "r") as file:
            return int(file.read())
    except FileNotFoundError:
        with open("HorseRacingMoney.txt", "w") as file:
            file.write("500")
        return 500

MONEY = loadBalance()
playAgain = True

print("Welcome to Intense Horse Racing!")
print(f"You currently have ${MONEY} to bet")

while playAgain:
    bet = int(input("\nHow much would you like to bet?"))
    horseBetting = int(input("Which horse would you like to bet on (1-6)?"))
    if bet > MONEY:
        print("You cannot bet more than you have!")
        break
    if horseBetting not in [1, 2, 3, 4, 5, 6]:
        print("That isn't a horse!")
        break
    