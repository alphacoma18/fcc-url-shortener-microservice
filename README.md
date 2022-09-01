# URL Shortening Service

## Tech-Stack

This project was built using the following technologies

- express
- mongoDB w/ mongoose

---

## connect ECONNREFUSED ::1:27017

When connecting to localhost using mongoose,
after running mongod on command prompt and setting up the connection on the server, this error shows up.

[This Stack Overflow](https://myerl.vercel.app/api/cc7b8056) gives the correct fix to the bug and according to a comment there,

> MongoDB seems to be not compatible with NodeJS v17. It should be listening on IPv6 "::1" by default and it would work with v17 without any problem.

which is why I probably get the error too since I'm using NodeJS v18.6.0

## Side note

This is my go at the [FreeCodeCamp, Back End Development and APIs - URL Shortener Microservice Project](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice). 