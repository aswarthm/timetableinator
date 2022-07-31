import json

name = input("Name of the teacher to be removed\n")

with open("data.json") as file:
    data = json.load(file)
    
if name in data:
    data.pop(name)
    with open("data.json", "w") as file:
        json.dump(data, file, indent=4)

else:
    print("Data for that teacher does not exist\n\n")



