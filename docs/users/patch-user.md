```mermaid
sequenceDiagram
    Client->>UserService :  PATCH: /users/:id
    activate UserService
    UserService->>DB: update user
    activate DB
    DB->>DB: update user by id
    DB-->>UserService: response status
    deactivate DB
    UserService-->>Client: response status
    deactivate UserService
```
