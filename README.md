# assignment_project

**Description**
-------------------------------------------------

An node js app that contains task list for user and having following features:
* supports user role and authorizer 
* supports pagination while showing task list of user
* creates tasks for user
* user can update their task as well as can delete a task 

TO RUN::
----------------------------------------
    1. npm install
    2. create .env file ,&  define 'JWTCODE' & 'MONGODB_URL'  & 'PORT' (jWTCODE will be the secret key for making JWTToken;PORT will be the port on which 
    programe will run )
    3. npm start



Database:
----------------------------------------
    ****in this project i use MongoDB****

    userlogin:  eg: {"_id":{"$oid":"645bd82ee44eb23819aa9345"},"name":"anal","email":"anal180@gmail.com","password":"$2a$10$Pp86lYq9V/2PLA9uQBpMG.Xycz7w527TTtX3S0XRxesTbasQRYD42","visible_password":"test","__v":{"$numberInt":"0"}}

    taskData:    eg: {"_id":{"$oid":"645bd84be44eb23819aa9348"},"title":"wash cloths","description":"task for monday","status":"pending","userId":"645bd82ee44eb23819aa9345","__v":{"$numberInt":"0"}}


API Details:


    {Special Note: in header user have to send     authtoken: <valid authtoken>  for every api call, except signup & login api}


    /////registration//////
    {url}/api/signup                POST
      payload:           
        {
                "name":"anal",
                "email":"anal180@gmail.com",
                "password":"test",
                "visible_password":"test"
        }

    responce:
    {
    "msg": "Success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkkXVCJ9.eyJkYXRhIjoiYW5hbDEsMEBnbWFpbC5jb20iLCJpYXQiOjEuODM3NDA3MTl9.iZox-T4b-X1w1bNw1oe_C7CqfA89BL_h9nfkq7ro1ds"
    }


    //////login//////
    {url}/api/login                     POST
        payload:           
        {
                "name":"anal",
                "password":"test",
        }

    responce:
    {
    "msg": "Success",
    "token": "eyJhbGciOiJIUzI1NiIsIdR5cCI6IkkXVCJ9.eyJkYXRhIjoiYW5hbDEsMEBnbiFpbC5jb20iLCJpYXQiOjEuODM3NDA3MTl9.iZox-T4b-X1w1bNw1oe_C7CqfA89BL_h9nfkq7ro1ds"
    }


    //////create///////
    {url}/api/tasks                         POST
        payload:
        {
            "title":"test1",
            "description":"testing",
            "status":"pending"
        }
    responce:
    {
    "msg": "Success",
    "data": {
        "title": "test1",
        "description": "testing",
        "status": "pending",
        "userId": "645bd82ee44eb23819aa9345",
        "_id": "645ce3781d66f51ceb31bc7c",
        "__v": 0
    }
    }

    //////read with pagination//////
    {url}/api/tasks?page=2&limit=2                  GET
    
    responce:
    {
    "msg": "SUCCESS",
    "data": {
        "next": {url}/api/tasks?page=3&limit=2",
        "previous": "{url}/api/tasks?page=1&limit=2",
        "results": [
            {
                "_id": "645bdd5660a7aec899660118",
                "title": "test78",
                "description": "test23",
                "status": "pending",
                "userId": "645bd82ee44eb23819aa9345",
                "__v": 0
            },
            {
                "_id": "645bdff99308dc8905885ab3",
                "title": "test48",
                "description": "test488",
                "status": "pending",
                "userId": "645bd82ee44eb23819aa9345",
                "__v": 0
            }
        ]
    }
    }


    //////read particular task using id//////
    {url}/api/tasks/645bdd5660a7aec899660118        GET

    responce:
    {
    "msg": "SUCCESS",
    "data": [
        {
            "_id": "645bdd5660a7aec899660118",
            "title": "test5",
            "description": "test569",
            "status": "pending",
            "userId": "645bd82ee44eb23819aa9345",
            "__v": 0
        }
    ]
    }

    //////update particular task using id/////
    {url}/api/tasks/645bdd5660a7aec899660118           PUT

    payload:
    {
            "title": "test5",
            "description": "test55"
    }

    responce:
    {
    "msg": "Success",
    "data": "update Successfully..."
    }


    //////delete particular task using id/////
    {url}/api/tasks/645bdd5660a7aec899660118             DELETE

    responce:
    {
    "msg": "Success",
    "data": "delete Successfully..."
    }