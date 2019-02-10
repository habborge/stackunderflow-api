# stackunderflow-api

## Getting Started

1. API Node JS + Express JS
2. Persistent data with MongoDB

### Prerequisites

We need install NodeJs and MongoDB

```
sudo apt install nodejs npm

sudo apt-get install -y mongodb-org
```

## Running

We need to rename the file 

```
.env.example to .env
```

If we are in enviroment of development we run
```
npm run dev
```
But if us enviroment are production we need to run
```
npm start
```

### API QUESTIONS
| Route               | Method | Parameters | Body                                | Description                   |
| ------------------- | :----: | ---------: | ----------------------------------- | ------------------------------|
| /api/questions      |  GET   |          - | -                                   | Gets all questions            |
| /api/questions      |  POST  |            | text: string, author: string        | Creates a new question        |
| /api/questions/{id} |  GET   | id: number | -                                   | Get question with Id {id}     |
| /api/questions/{id} |  PUT   | id: number | text: string, author: string        | Updates question with Id {id} |
| /api/questions/{id} | DELETE | id: number | -                                   | Deletes question with Id {id} |

### API COMMENTS
| Route             | Method | Parameters | Body                                                | Description                 |
| ----------------- | :----: | ---------: | --------------------------------------------------- | ----------------------------|
| /api/answers      |  GET   |          - | -                                                   | Gets all answers            |
| /api/answers      |  POST  |            | text: string, author: string, postId: string        | Creates a new answer        |
| /api/answers/{id} |  GET   | id: number | -                                                   | Get answer with Id {id}     |
| /api/answers/{id} |  PUT   | id: number | text: string, author: string, postId: string        | Updates answer with Id {id} |
| /api/answers/{id} | DELETE | id: number | -                                                   | Deletes answer with Id {id} |

### API USERS
| Route           | Method | Parameters | Body                                               | Description               |
| --------------- | :----: | ---------: | ---------------------------------------------------| ------------------------- |
| /api/users      |  GET   |          - | -                                                  | Gets all users            |
| /api/users      |  POST  |            | firstname: string, lastname: string, email: string | Creates a new user        |
| /api/users/{id} |  GET   | id: number | -                                                  | Get user with Id {id}     |
| /api/users/{id} |  PUT   | id: number | firstname: string, lastname: string, email: string | Updates user with Id {id} |
| /api/users/{id} | DELETE | id: number | -                                                  | Deletes user with Id {id} |