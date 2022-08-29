# Wordle Clone 

Link: wordlerush.herokuapp.com

Rules: 
-You have to guess the Wordle in six or less guess.
-Every word you enter must be a valid 5-letter english word. ...
-A correct letter turns green.
-A correct letter in the wrong position turns yellow.
-An incorrect letter turns gray.
-Letters can be used more than once, even if you guessed a letter in the right place, if it has another same letter in other position, it will turn yellow(in the keyboard).

Easy Mode:
 - In this mode, words that you need to guess are only simple words that are often used in real life
 - Word pool size is: [1,000+]

Hard Mode:
 - In this mode, random word that will be genrated is any of the possible 5-letter english words.
 - Word pool size is: [12,000+]




BUGS TO FIX
-If user guessed a letter in the right index but there's another 
same letter next to it, in keyboord, that letter must still be highlighted with yellow rather than green
