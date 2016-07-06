Migrating from Apache2 to Nginx, I found that static
files cannot be accessed with POST requests, returing the
405 error. A quick fix to that is to redirect the error
page of 405 to the data uri as follow:

```bash
error_page 405 = $uri;
```


