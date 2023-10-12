# add new user

```mermaid
sequenceDiagram
    Client->>UserService :  POST: /users
    activate UserService
    UserService->>DB: add user
    activate DB
    DB->>DB: insert new user
    DB-->>UserService: response message
    deactivate DB
    UserService-->>Client: response message
    deactivate UserService
```
