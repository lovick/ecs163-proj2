import csv

dic = {}

#with open('crypto-markets.csv', newline='') as f:
#    reader = csv.reader(f, delimiter=',', quotechar='"')
#    for row in reader:
        #dic[row[3]] = dic.get(row[3], 0) + 1
coinSymbol = "DOGE"
desiredValues = [1, 2, 3, 5, 6, 7, 8]
out = open(coinSymbol+'Data.csv', 'w+')
with open('crypto-markets.csv', newline='') as f:
    reader = csv.reader(f, delimiter=',', quotechar='"')
    firstLoop = True
    for row in reader:
        if firstLoop:
            for val in desiredValues[:-1]:
                out.write(row[val]+',')
            out.write(row[desiredValues[-1]]+'\n')
            firstLoop = False
        if row[1] == coinSymbol:
            for val in desiredValues[:-1]:
                out.write(row[val]+',')
            out.write(row[desiredValues[-1]]+'\n')
out.close()