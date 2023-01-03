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


fw = open("../game/leveldata.js","w")
fw.write("var levels = [];\n")

levelArrayCounter = 0;
maxLevel = 10
for levelCounter in range(startLevel, maxLevel+1):
    filename = "../levels/" + episodeName
    if levelCounter < 10:
        filename = filename + "0"
    filename = filename + str(levelCounter)
    fixedfilename = filename + "_fixed_y.json"
    filename = filename + ".json"
    if os.path.isfile(filename):
        print(filename)
        #Reposition Y
        #The level editor positions y at the bottom of the object
        #The game engine expects it at the top left, so reposition Y
        with open(filename) as json_file:
            data = json.load(json_file)
            for l in data['layers']:
                if l['name'] == "Objects":
                    for o in l['objects']:

                        oldY = o['y']
                        o['y'] = oldY - 64                  
            with open(fixedfilename, 'w') as fixedfile:
                json.dump(data, fixedfile)
                fixedfile.close()
            json_file.close() 
        #END of Reposition Y             
        fr = open(fixedfilename,"r")    #use updated filename   
        fw.write("levels[" + str(levelArrayCounter) + "] = ")
        fw.write(fr.read());
        fw.write(";\n")
        levelArrayCounter += 1
    else:
        break

fw.close()
fr.close()
