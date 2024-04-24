#!/bin/sh
echo "Enter ctrl + c to exit"
while [ 1 ]
do
   waitTime=$(shuf -i 1-5 -n 1)
   sleep $waitTime &
   wait $!
   instruction=$(shuf -i 0-4 -n 1)
   d=`date -Iseconds`
   
   case "$instruction" in
      "1") log="{\"@timestamp\": \"$d\", \"level\": \"ERROR\", \"message\": \"something happened in this execution.\"}"
      ;;
      "2") log="{\"@timestamp\": \"$d\", \"level\": \"INFO\", \"message\": \"takes the value and converts it to string.\"}"
      ;;
      "3") log="{\"@timestamp\": \"$d\", \"level\": \"WARN\", \"message\": \"variable not in use.\"}"
      ;;
      "4") log="{\"@timestamp\": \"$d\", \"level\": \"DEBUG\", \"message\": \"first loop completed.\"}"
      ;;
   esac
   echo $log >> logs/access.log
done