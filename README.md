# cartola-master

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Example Response](#example_response)

## About <a name = "about"></a>

A.I algorithm that generates Cartola FC soccer schemas based on the most used and best rated players. Language: Typescript 

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

## Example response (Created in 11/15/2021 15:54 (BRT – Brasília Time em UTC-03:00)) <a name = "example_response"></a>
```
{
   "price": 241,
   "gol": [
      {
         "id": 85425,
         "name": "João Paulo",
         "club_id": 277,
         "club_name": "Santos",
         "position": 1
      }
   ],
   "lat": [
      {
         "id": 101708,
         "name": "Felipe Jonatan",
         "club_id": 277,
         "club_name": "Santos",
         "position": 2
      },
      {
         "id": 78077,
         "name": "Madson",
         "club_id": 277,
         "club_name": "Santos",
         "position": 2
      }
   ],
   "def": [
      {
         "id": 79035,
         "name": "Luiz Felipe",
         "club_id": 277,
         "club_name": "Santos",
         "position": 3
      },
      {
         "id": 95662,
         "name": "Lucas Kal",
         "club_id": 327,
         "club_name": "América-MG",
         "position": 3
      }
   ],
   "mid": [
      {
         "id": 94509,
         "name": "Raphael Veiga",
         "club_id": 275,
         "club_name": "Palmeiras",
         "position": 4
      },
      {
         "id": 89274,
         "name": "Andreas Pereira",
         "club_id": 262,
         "club_name": "Flamengo",
         "position": 4
      },
      {
         "id": 87999,
         "name": "Gustavo Scarpa",
         "club_id": 275,
         "club_name": "Palmeiras",
         "position": 4
      }
   ],
   "ata": [
      {
         "id": 99392,
         "name": "Michael",
         "club_id": 262,
         "club_name": "Flamengo",
         "position": 5
      },
      {
         "id": 83257,
         "name": "Gabriel",
         "club_id": 262,
         "club_name": "Flamengo",
         "position": 5
      },
      {
         "id": 39148,
         "name": "Hulk",
         "club_id": 282,
         "club_name": "Atlético-MG",
         "position": 5
      }
   ],
   "tec": [
      {
         "id": 70696,
         "name": "Fábio Carille",
         "club_id": 277,
         "club_name": "Santos",
         "position": 6
      }
   ],
   "cap": {
      "id": 83257,
      "name": "Gabriel Barbosa Almeida",
      "club_id": 262,
      "position": 5,
      "cap": true,
      "percentage": "99953180059.62906%"
   }
}
```
