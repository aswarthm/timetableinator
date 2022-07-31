
import json

with open('data.json') as file:
    data = json.load(file)

print("Enter Teacher's Name: ")
name = input()
if name in data:
    raise Exception("Teacher data already exists")
    #if you enter a teacher name make sure u fill 
    #that teacher data completely

data[name] = {}
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
for day in days:
    data[name][day] = {}
    print(f"{day}:")

    subject = input("Enter class name or enter '-1' to go to the next day ")

    while (subject!="-1"):
        temp = input("Enter start time in the format '9 30':  ").split()
        h = int(temp[0])
        if h<8:
            h+=12
        m = int(temp[1])

        start = (h-9)*60 + m

        temp = input("Enter end time in the format '9 30':  ")
        h = int(temp.split()[0])
        if h<8:
            h+=12
        m = int(temp.split()[1])

        end = (h-9)*60 + m

        dur = end - start

        data[name][day][start] = {"class": subject, "duration": dur }

        subject = input("Enter class name or enter '-1' to go to the next day ")


with open("delthisdata.json", "w") as file:
    json.dump(data, file, indent=4)








