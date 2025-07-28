import os, time
commitToGithubMessage = input("What is your commit message (what have you done)?: \n")

os.system("cd ..")
os.system("cd ..")
os.system('cd "DAE shenanigans/"')
os.system("git add .")
time.sleep(1)
os.system('git commit -m "' + str(commitToGithubMessage) + '"')
time.sleep(2)
os.system("git push --all")
