import pymongo
import pyperclip

MONGODB_URL = 'mongodb://localhost:27017'
DATABASE = 'aoc22DB'

client = pymongo.MongoClient(MONGODB_URL)
db = client[DATABASE]

day = input('Day: (enter a number) ')
day = '{:0>2}'.format(day) 
print(f'Day {day} selected')

input('Copy the Sample input to your clipboard, then hit enter...')
print('Pasting the Sample input from your clipboard')
sample_data = pyperclip.paste()
sample_data

input('Now copy your Puzzle input to your clipboard, then hit enter...')
print('Pasting your Puzzle input from the clipboard')
puzzle_data = pyperclip.paste()

def insert_data(db, col, data, sep='\n', sort=False):
    lines = data.split(sep)
    print(f'Dropping collection {col}')
    db[col].drop()
    print(f'Inserting data into collection {col}')
    if sort:
      db[col].insert_many([{'line': lines[i], 'i': i } for i in range(0, len(lines))])
    else:
      db[col].insert_many([{'line': line} for line in lines])

insert_data(db, day+'Sample', sample_data, sort=True)
insert_data(db, day+'Puzzle', puzzle_data, sort=True)

print('Done')
