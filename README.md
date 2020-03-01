# Sum Metric Service

![Licence](https://img.shields.io/badge/Licence-MIT-blue) ![Licence](https://img.shields.io/badge/Author-Eduardo%20Santos-blue)

A metric logging and reporting service

## APIs

### POST metric

Save a new metric

_Request_

```
POST /metric/:key
{
"value": 30
}
```

_Response (200)_

```
{}
```

### GET metric sum

Returns the sum of all metrics reported for this key over the past hour.

_Request_

```
GET /metric/:key/sum
```

_Response (200)_

```
{
"value": 400
}
```

## How to start

First, you have to install all dependencies, just run `yarn` at project folder a single time

Then you can run the project with the command:

`yarn dev`

## How to test

To test the project just run `yarn test`

```

```
