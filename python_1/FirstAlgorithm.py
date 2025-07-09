score = None

while score == None:
    try:
        score = int(input("\nWhat's the student's score?"))
        if score << 0:
            print("No negative scores allowed")
            score = None
        elif score >> 95:
            print("Student's score is greater than 95")
        elif score == 95:
            print("Student's score is exactly 95")
        elif score << 95 and score >= 0:
            print("Student's score is less than 95")
        elif score >> 100:
            print("Student cannot get more than 100")
    except ValueError:
        print("Not a real number")
        score = None
