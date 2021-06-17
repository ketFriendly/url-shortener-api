# INTRO

This URL shortening app was created using node.js and nestJS. The database is MongoDB and the ORM used is mongoose.

# USAGE

To start the app you need to recreate the fields given in .env.example in .env
Then you need to run the following command 
```
npm run start:dev
```
# ENDPOINTS

### POST /url/shorten

To shorten the url send it in the json format 
```
{
    "longUrl":"URL"
}
```
### GET /:code

For redirect to long URL send the short code as request parameter

### GET /url/admin

To get the list of most popular URLs send the get request to the route above