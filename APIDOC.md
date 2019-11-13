# The Boba API Documentation
The Boba API provides information on local and international bubble tea franchises, including their locations, menus, and additional details.

## Get a list of all franchises included in this service
**Request Format:** /franchises

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Returns a list of all the franchises with information available in this API in the format "display name:short name".

**Example Request:** /franchises

**Example Response:**
```
85°C Bakery Cafe:85C
Black Ball:blackBall
Blank Space Cafe:blankSpace
Boba Up:bobaUp
Bobachine Bubble Tea:bobachine
BobaLust Tea House:bobalust
...
```

**Error Handling:**
N/A


## Get master list of all franchise information
**Request Format:** /franchiseInfo

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Return a JSON file including the information of every franchise available in this API

**Example Request:** /franchiseInfo

**Example Response:**
```json
{
  "85C": {
    "name": "85°C Bakery Cafe",
    "specialty": "baked goods, coffee, tea",
    "location": "Washington, California, Texas",
    "logo": "/logos/85C.png",
    "menu": "/menus/85C.jpg",
    "menuCredit": "Taken from their website, dated May 30, 2019.",
    "review": "Since 85° focuses on baked goods, don't expect the drinks to be amazing. Their drinks are designed to compliment their bakery products, so sweetness is kept at a minimum. They offer two sizes and iced or hot options and often release unique flavors."
  },
  "blackBall": {
    "name": "BlackBall",
    ...
  }
  ...
}
```

**Error Handling:**
N/A


## Get the information of a specific franchise
**Request Format:** /franchiseInfo/:name

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Given a valid franchise name, returns a JSON file including the information of the specified franchise.

**Example Request:** /franchiseInfo/theAlley

**Example Response:**
```json
{
  "name": "The Alley",
  "specialty": "drinks",
  "location": "International",
  ...
}
```

**Error Handling:**
- Possible ENOENT error
  - If passed in an invalid franchise name, returns an error with the message: "This franchise does not exist in The Boba Diaries. Please use a franchise name from the list at /franchiseInfo."
