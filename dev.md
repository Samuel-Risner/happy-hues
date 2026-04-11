# game files

types;
- simple

goals:
name | description
--- | ---
`sort-simple` | all bottles must contain only one color
`sort-exact` | all bottles need to be completely filled with one color

```json
{
    "type": "",
    "goal": "",
    "data": {}
}
```

## Simple

- all the bottles have the same height
- the bottles are not arranged in any specific order

```json
{
    "type": "simple",
    "goal": "sort-simple",
    "data": {
        "width": 1,
        "height": 4,
        "bottles": [
            ["RED", "RED"],
            ["GREEN", "BLUE", "GREEN", "BLUE"],
            ["BLUE", "GREEN", "BLUE", "GREEN"]
        ]
    }
}
```