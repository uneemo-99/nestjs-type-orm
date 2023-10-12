# restore user by id

```mermaid
sequenceDiagram
    Client->>UserService :  PATCH: /users/address/restore:id
    activate UserService
    UserService->>DB: restore address
    activate DB
    DB->>DB: restore address by id
    DB-->>UserService: response message
    deactivate DB
    UserService-->>Client: response message
    deactivate UserService
```
