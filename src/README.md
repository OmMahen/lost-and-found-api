# Lost and Found API Documentation

## Introduction
This API provides endpoints to manage lost and found items.
> Base URL: `https://lost-and-found-api-nu.vercel.app`

## Endpoints

### Get All Items
Get all lost and found items.
- Method: `GET`
- Path: `/items`
- Response Code: `200 OK`
- Response Body:
```json
    [
        {
            "iditem_image": 3,
            "item_location": "Example Location",
            "id": 1,
            "item_name": "Example Item",
            "item_date": "2023-07-15T16:00:00.000Z",
            "item_description": "This is an example item.",
            "status": "lost"
        },
        {
            "iditem_image": 3,
            "item_location": "Example Location",
            "id": 2,
            "item_name": "Example Item",
            "item_date": "2023-07-15T16:00:00.000Z",
            "item_description": "This is an example item.",
            "status": "lost"
        },
    ]
```

### Get Item by ID
Get a lost and found item by its ID.
- Method: `GET`
- Path: `/items/:id`
- Path Parameters: `id` (The ID of the item)
- Response Code: `200 OK`
- Response Body:
```json
{
    "id": 4,
    "user_name": "John Doe",
    "user_email": "johndoe@example.com",
    "user_phone": "1234567890",
    "item_name": "Example Item",
    "item_description": "This is an example item.",
    "item_date": "2023-07-15T16:00:00.000Z",
    "item_location": "Example Location",
    "status": "lost",
    "iditem_image": 4
}
```

### Create Item
Create a new item in the database.
- Method: `POST`
- Path: `/items`
- Request Body: 

```json
{
    "user_name": "John Doe",
    "user_email": "johndoe@example.com",
    "user_phone": "1234567890",
    "item_name": "Example Item",
    "item_description": "This is an example item.",
    "item_date": "2023-07-15T16:00:00.000Z",
    "item_location": "Example Location",
    "status": "lost",
    "iditem_image": 4
}
```

- Response Code: `201 Created`
- Response Body:

```json
{
    "id": 5,
    "user_name": "John Doe",
    "user_email": "johndoe@example.com",
    "user_phone": "1234567890",
    "item_name": "Example Item",
    "item_description": "This is an example item.",
    "item_date": "2023-07-15T16:00:00.000Z",
    "item_location": "Example Location",
    "status": "lost",
    "iditem_image": 4
}
```

### Upload Image
Upload an image to the server.
- Method: `POST`
- Path: `/upload`
- Request Body: Form Data
    - `image` (file)
- Response Code: `201 Created`
- Response Body:
```json
{
  "message": "Image uploaded successfully",
  "imageId": "image1"
}
```

### Get Image by ID
Get an image by its ID.
> Base URL: `https://lost-and-found-image-api.vercel.app/image/`
- Method: `GET`
- Path: `/image/:id`
- Path Parameters: `id` (The ID of the image)
- Response Body: The image file in the specified format (e.g., image/jpeg).
- Response Code:
    - `200` OK if the image is found.
    - `404` Not Found if the image is not found.
    - `500` Internal Server Error if an error occurs while retrieving the image.