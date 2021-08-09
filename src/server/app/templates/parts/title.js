export const titleTemp = `{
  "type": "ColumnSet",
  "columns": [{
      "type": "Column",
      "width": "auto",
      "items": [{
        "type": "Image",
        "url": "{{iconUrl}}",
        "size": "small",
        "width": "22px",
        "height": "22px"
      }]
    },
    {
      "type": "Column",
      "width": "stretch",
      "items": [{
        "type": "TextBlock",
        "text": "{{title}}",
        "weight": "bolder",
        "wrap": true,
        "size": "medium"
      }]
    }
  ]
}
`
