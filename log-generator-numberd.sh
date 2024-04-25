#!/bin/sh
echo "Enter ctrl + c to exit"
counter=0
while [ $counter -le 51 ]
do
   sleep 1
   ((++counter))
   log="$counter"
   echo $log >> logs/access.log
done