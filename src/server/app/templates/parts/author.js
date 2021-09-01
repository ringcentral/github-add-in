export const authorTemp = `{
  "type": "ColumnSet",
  "columns": [{
      "type": "Column",
      "width": "auto",
      "verticalContentAlignment": "Center",
      "items": [{
        "type": "Image",
        "url": "{{url}}",
        "size": "small",
        "style": "person",
        "height": "24px"
      }]
    },
    {
      "type": "Column",
      "width": "stretch",
      "verticalContentAlignment": "Center",
      "items": [{
        "type": "TextBlock",
        "text": "[{{login}}]({{loginUrl}})",
        "weight": "lighter",
        "wrap": true,
        "size": "small"
      }]
    }
  ]
}
`
