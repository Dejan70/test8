
Access system using the following username/pass combination:

- test@test.com
- 12345


## List of tasks

* 1) On "Home" page load data from the following endpoint:

GET http://testapi.codetest.space/api/resource

Example JSON response:
```
{
    "status": 0,
    "message": "OK",
    "data": [
        {
            "resource_id": "1",
            "value": "Item 1"
        },
        {
            "resource_id": "2",
            "value": "Item 2"
        }
    ]
}
```

* 2) Add dialog or page to create a new resource: (present user with a message that resource is created and reload existing list, validate form fields so that user cannot create empty value)

POST http://api.codetest.space/api/resource
Example JSON request:
```
{
    "value": "Item 3"
}
```
Example JSON response:
```
{
    "status": 0,
    "message": "OK"
}
```

* 3) Add ability to delete resource (confirmation dialog should appear with confirming and cancel buttons):
DELETE http://api.codetest.space/api/resource?id=1

Example JSON response:
```
{
    "status": 0,
    "message": "OK"
}
```

* 4) Create search functionality, search form should consist of a single input field, after users types three or more characters list should be filtered by given value. When searching for non-existing data, an appropriate message should appear to the user.

* 5) Create pagination for the list