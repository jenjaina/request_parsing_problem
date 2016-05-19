## Project

This example project shows an issue with parsing large arrays when using the `request` module. It demostrates that sending a large array (>21 items) in a query will result in incorrect parsing of the array.

Example input:

```
["item 1", "item 2", ..., "item 22"]
```

Example output:

```
{"0": "item1", "1": "item 2", ..., "21": "item 22"}
```

The example demostrates that `superagent` correctly parses the large array.

## To run

    npm install
    npm start