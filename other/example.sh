#! /usr/bin/bash

# Echo command
echo Hello

# Variables
NAME="Jim"
echo "My name is $NAME"
echo "My name is ${NAME}"

# User input
read -p "Enter your name: " USERNAME
echo "Hello $USERNAME"

# If Statement
if [ "$NAME" == "Jim" ]
then
  echo "Your name is Jim"
fi

# If Else Statement
if [ "$NAME" == "Jim" ]
then
  echo "Your name is Jim"
else 
  echo "Your name is NOT Jim"
fi

# Else-If Statement
if [ "$NAME" == "Jim" ]
then
  echo "Your name is Jim"
elif [ "$NAME" == "Kernix" ]
then
  echo "Your name is Kernix"
else 
  echo "Your name is NOT Jim or Kernix"
fi

# Comparisons
NUM1=3
NUM2=5
if [ "NUM1" -gt "$NUM2" ]
then 
  echo "$NUM1 is greater than $NUM2"
else 
  echo "$NUM1 is less than $NUM2"
fi

# File Conditions
FILE="README.md"
if [ -f "$FILE" ]
then
  echo "$FILE is a file"
else
  echo "$FILE is NOT a file"
fi

# Case Statements
read -p "Are you 21 or over? Y/N " ANSWER
case "$ANSWER" in 
  [yY] | [yY[eE][sS]])
    echo "You can drink in the bar"
    ;;
  [nN] | [nN[oO]])
    echo "Get out of here kid"
    ;;
  *)
    echo "Please answer with Y for YES or N for NO"
    ;;
esac

# Loops: for loop
NAMES="Jim Luna Buddy"
for NAME in $NAMES
  do 
    echo "Hello $NAME"
done

# Loops: for loop to rename files
FILES=$(ls *.txt)
NEW="rev"
for FILE in $FILES
  do 
    echo "Renamed $FILE to new-$FILE"
    mv $FILE $NEW-$FILE
done

# Remove a file
rm rev-2.txt

# While loop: read thru file line by line
LINE=1
while read -r CURRENT_LINE
  do
    echo "$LINE: $CURRENT_LINE"
    ((LINE++))
done < "./.gitignore"

# Functions
function sayHello() {
  echo "Hello"
}
sayHello

# Function with parameters
function greet() {
  echo "Hello, I am $1 and I am $2"
}
greet "Buddy" "10"

# Create folder, and write to a file
mkdir folderOne
touch "folderOne/test.txt"
echo "Testing 123" >> "folderOne/test.txt"