```mermaid
sequenceDiagram
    Client->>UserService :  POST: /users/:id/address
    activate UserService
    UserService->>DB: add address
    activate DB
    DB->>DB: insert new address by user id
    DB-->>UserService: response status
    deactivate DB
    UserService-->>Client: response status
    deactivate UserService
```
