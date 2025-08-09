import os
import sys
import json

if len(sys.argv) < 2:
    print("WARNING: Missing command line args")
    print("USAGE: buildlevels <episodeName> <opt: startLevel>\n")
    quit()
else:
    episodeName = sys.argv[1]

startLevel = 0
if len(sys.argv) == 3:
    startLevel = int(sys.argv[2])


leveldatafile = open("../game/leveldata.js","w")
leveldatafile.write("var levels = [];\n")

def process_level(levelCounter, episodeName, levelArrayCounter, leveldatafile):
    filename = "../levels/" + episodeName
    if levelCounter < 10:
        filename = filename + "0"
    filename = filename + str(levelCounter)
    fixedfilename = filename + "_fixed_y.json"
    filename = filename + ".json"
    if os.path.isfile(filename):
        print(filename)
        # Reposition Y
        with open(filename) as json_file:
            data = json.load(json_file)
            for l in data['layers']:
                if l['name'] == "Objects":
                    for o in l['objects']:
                        oldY = o['y']
                        o['y'] = oldY - 64
            json_file.close()
            with open(fixedfilename, 'w') as fixedfile:
                json.dump(data, fixedfile)
                fixedfile.close() 
        # Write to JS file
        with open(fixedfilename, "r") as fr:
            leveldatafile.write("levels[" + str(levelArrayCounter) + "] = ")
            leveldatafile.write(fr.read())
            leveldatafile.write(";\n")
        return True
    else:
        return False

# Start processing levels
levelArrayCounter = 0
maxLevel = 10
# always process level 0 to have the intro part
processed = process_level(0, episodeName, levelArrayCounter, leveldatafile)
levelArrayCounter += 1

if not processed:
    print("WARNING: Level 0 not found, exiting.")
    leveldatafile.close()
    quit()

for levelCounter in range(startLevel, maxLevel+1):
    processed = process_level(levelCounter, episodeName, levelArrayCounter, leveldatafile)
    if not processed:
        break
    levelArrayCounter += 1

leveldatafile.close()
