import os, time, random, platform, hashlib

SECRET_KEY = "dontcheatbleh312"

def ClearScreen(): #Clears the terminal screen for the animation
    if platform.system() == "Windows": #I have a windows computer at home and I want to make sure it's able to be run on either
        os.system('cls')
    else:
        os.system('clear')

def HorseAnimation(): #Runs the horse animation which is defined in this function
    horseNames = ["Horse 1", "Horse 2", "Horse 3", "Horse 4", "Horse 5", "Horse 6"]
    positions = [0, 0, 0, 0, 0, 0]
    finishPosition = 50

    while max(positions) < finishPosition:
        ClearScreen()

        for i in range(len(horseNames)):
            move = random.randint(1, 3)
            positions[i] += move
            print(f"{horseNames[i]}: " + "█" * positions[i])

        time.sleep(0.4)

    winnerIndex = positions.index(max(positions))
    print(f"\n{horseNames[winnerIndex]} won the race!")
    return winnerIndex

def generateHash(balance): #Generates the secret to avoid tampering
    return hashlib.sha256((str(balance) + SECRET_KEY).encode()).hexdigest()

def loadBalance(): #Loads the balance fro mthe HorseRacingMoney.txt file 
    try:
        with open("HorseRacingMoney.txt", "r") as file:
            lines = file.readlines()
            if len(lines) != 2:
                raise ValueError("Money file is malformed")
            balance = int(lines[0].strip())
            savedHash = lines[1].strip()

            if savedHash != generateHash(balance):
                print("Tampering detected! Setting your balance back to 100.")
                return 100
            if balance == 0:
                return 100
            else:
                return balance
    except (FileNotFoundError, ValueError):
        with open("HorseRacingMoney.txt", "w") as file:
            file.write("500\n")
            file.write(generateHash(100))
        return 500

def saveBalance(): #Saves the balance of the user (used many times to make sure the user doesn't leave when their horse is losing)
    with open("HorseRacingMoney.txt", "w") as file:
        file.write(str(MONEY) + "\n")
        file.write(generateHash(MONEY))

MONEY = loadBalance()
playAgain = True

print("Welcome to Intense Horse Racing!")

while playAgain:
    print(f"\nYou currently have ${MONEY} to bet")
    bet = int(input("\nHow much would you like to bet?"))
    horseBetting = int(input("Which horse would you like to bet on (1-6)?"))
    if bet > MONEY:
        print("You cannot bet more than you have!")
        break
    if horseBetting not in [1, 2, 3, 4, 5, 6]:
        print("That isn't a horse!")
        break
    MONEY -= bet
    saveBalance()
    Winner = HorseAnimation()
    if horseBetting - 1 == Winner:
        print("You win!")
        MONEY += (bet * 6)
        saveBalance()
    else:
        print("You lose!")
        if MONEY == 0:
            print("Ouch, out of money. Good luck next time!")
            break
    playAgainAsk = input("Would you like to play again?")
    if playAgainAsk.lower() in ["yes", "y"]:
        playAgain = True
    else:
        playAgain = False

