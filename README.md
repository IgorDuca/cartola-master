# cartola-master

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

Algorithm to create CartolaFc team schemas based on most popular/rentable available players

## Getting Started <a name = "getting_started"></a>

The cartola-master will run on your localhost, so, you need to get started by cloning the repo in your machine.

### Prerequisites

Start making sure if you have [yarn](https://yarnpkg.com/getting-started/install) and [node](https://nodejs.org/en/download/) installed

If you don't, download each one in their sites and then to test if they're installed, run these commands:
```
yarn -v
node -v
```
If you hadn't recieved any error, both node and yarn installed!

### Installing

Clone the repo and then run the command ```yarn``` to make yarn install all of the needed dependencies

## Usage <a name = "usage"></a>

Run ```yarn dev``` to run the program localy and then go to http://localhost:1239/api/getscale/{scale_id} to run the generating function

* Scale id list
    * Schema: 3-4-3 -> Id: 1
    * Schema: 3-5-2 -> Id: 2
    * Schema: 4-3-3 -> Id: 3
    * Schema: 4-4-2 -> Id: 4
    * Schema: 4-5-1 -> Id: 5
    * Schema: 5-3-2 -> Id: 6
    * Schema: 5-4-1 -> Id: 7
