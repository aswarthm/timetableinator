data = {
    "sindhu":{
        "Monday":{
            "UG-Major Project":{
                "start":[14, 15],
                "end":[16, 45]
            }
        },
        "Tuesday":{
            "EEE-2A(CE204)":{
                "start":[12, 30],
                "end":[13, 30]
            },
            "MPMC LAB:B2":{
                "start":[14, 15],
                "end":[16, 45]
            }
        },
        "Wednesday":{
            "MPMC LAB:D3":{
                "start":[9, 0],
                "end":[11, 30]
            },
            "UG-Tech Seminar":{
                "start":[12, 0],
                "end":[14, 0]
            },
            "MPCMC LAB:C2":{
                "start":[14, 45],
                "end":[16, 45]
            }
        },
        "Thursday":{
            "EEE-2A":{
                "start":[9, 0],
                "end":[10, 0]
            },
            "EEE-2A(2)":{
                "start":[14, 15],
                "end":[15, 15]
            }
        },
        "Friday":{
            "EEE-2A":{
                "start":[9, 0],
                "end":[10, 0]
            },
            "PG-Major Project":{
                "start":[11, 30],
                "end":[14, 0]
            }
        }
    }
}

data2 = {}
data2["sindhu"] = {}

for day in data["sindhu"]:
    data2["sindhu"][day] = {}
    for sub in data["sindhu"][day]:
        s = (data["sindhu"][day][sub]["start"][0] - 9)*60 + data["sindhu"][day][sub]["start"][1]
        e = (data["sindhu"][day][sub]["end"][0] - 9)*60 + data["sindhu"][day][sub]["end"][1]
        data2["sindhu"][day][f"{s}"] = {"class": sub, "duration": e-s}

print(data2)

