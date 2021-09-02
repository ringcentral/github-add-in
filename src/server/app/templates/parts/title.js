export const titleTemp = `{
  "type": "ColumnSet",
  "columns": [{
      "type": "Column",
      "verticalContentAlignment": "Top",
      "width": "auto",
      "items": [{
        "type": "Image",
        "url": "{{iconUrl}}",
        "height": "22px",
        "width": "22px"
      }]
    },
    {
      "type": "Column",
      "width": "stretch",
      "verticalContentAlignment": "Center",
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
