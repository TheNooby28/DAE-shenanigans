import random, tkinter

print("Guessing game!")

play_again = "yes"

while play_again.lower() in ["yes", "y"]:
    secret_number = random.randint(1,100)
    guess = None
    tries = 0

    print("I have a number from 1 and 100...")

    while guess != secret_number:
        try:
            guess = int(input("Take a guess: "))
            tries += 1

            if guess < secret_number:
                print("Too low, try again")
            elif guess > secret_number:
                print("Too high, try again")
            else:
                print(f"You got it in {tries} tries! The number was {secret_number}")

        except ValueError:
            print("That's not even a number. Try again")
    play_again = input("\nWanna play again? (yes/no): ")
print("Later")
