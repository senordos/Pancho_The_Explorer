import os
import sys

if len(sys.argv) < 2:
    print("WARNING: Missing command line args")
    print("USAGE: buildlevels <episodeName> <opt: startLevel>\n")
    quit()
else:
    episodeName = sys.argv[1]

startLevel = 0
if len(sys.argv) == 3:
    startLevel = int(sys.argv[2])


fw = open("leveldata.js","w")
fw.write("var levels = [];\n")

levelArrayCounter = 0;
maxLevel = 10
for levelCounter in range(startLevel, maxLevel+1):
    filename = "./levels/" + episodeName
    if levelCounter < 10:
        filename = filename + "0"
    filename = filename + str(levelCounter) + ".json"
    if os.path.isfile(filename):
        print(filename)
        fr = open(filename,"r")
        fw.write("levels[" + str(levelArrayCounter) + "] = ")
        fw.write(fr.read());
        fw.write(";\n")
        levelArrayCounter += 1
    else:
        break

fw.close()
fr.close()
