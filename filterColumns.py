import csv

dic = {}

#with open('crypto-markets.csv', newline='') as f:
#    reader = csv.reader(f, delimiter=',', quotechar='"')
#    for row in reader:
        #dic[row[3]] = dic.get(row[3], 0) + 1
count = 0
coinList = []
coinSymbol = []
desiredValues = [1, 2, 3, 5, 6, 7, 8, 9, 10, 12]
out = open('cData.csv', 'w+')
with open('crypto-markets.csv', newline='') as f:
    reader = csv.reader(f, delimiter=',', quotechar='"')
    firstLoop = True
    for row in reader:
        if firstLoop:
            for val in desiredValues[:-1]:
                out.write(row[val]+',')
            out.write(row[desiredValues[-1]]+'\n')
            firstLoop = False
        
        if len(coinList) > 10:
            break
        elif row[1] not in coinList:
            coinList.append(row[1])

        #if row[1] in coinSymbol:
        for val in desiredValues[:-1]:
            out.write(row[val]+',')
        out.write(row[desiredValues[-1]]+'\n')
out.close()