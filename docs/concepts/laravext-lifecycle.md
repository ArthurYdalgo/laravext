# Laravext Lifecycle

## First Visit

```mermaid
sequenceDiagram
    Browser->>Laravel: I want to visit this route now '/{user:username}/{article:slug}'
    Laravel->>Browser: Here's the page, but it's not ready yet
    Browser->>Browser: Ok... Loading... (First Visit Happens)
```


### First Visit with Javascript Runtime SSR



## Subsequent Visits

### Render

### Redirect