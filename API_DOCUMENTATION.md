# HouseParty API Documentation

## Events

### Get All Events

GET /api/events

Returns a list of all events, sorted by date.

#### Response


### Get a Single Event

GET /api/events/:id

Returns details of a specific event.

#### Parameters
- `id`: Event ID (string)

#### Response

## Create a New Event

POST /api/events

Creates a new event.

#### Request Body

#### Response

### Update an Event

PATCH /api/events/:id

Updates an existing event.

#### Parameters
- `id`: Event ID (string)

#### Request Body


### Delete an Event

DELETE /api/events/:id

Deletes an event.

#### Parameters
- `id`: Event ID (string)

#### Response




SAVE_PROGRESS:HouseParty_App_Development_7.5_Backend_Deployed_Frontend_Pending