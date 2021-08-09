export const authorTemp = `{
  "type": "ColumnSet",
  "columns": [{
      "type": "Column",
      "width": "auto",
      "items": [{
        "type": "Image",
        "url": "{{url}}",
        "size": "small",
        "style": "person",
        "width": "24px",
        "height": "24px"
      }]
    },
    {
      "type": "Column",
      "width": "stretch",
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
