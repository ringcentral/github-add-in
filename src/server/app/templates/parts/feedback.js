export const feedbackTemp = `{
  "type": "Column",
  "width": "auto",
  "items": [{
    "type": "Image",
    "url": "{{icon}}",
    "height": "16px"
  }]
},
{
  "type": "Column",
  "width": "stretch",
  "items": [{
    "type": "TextBlock",
    "text": "[{{title}}]({{url}})",
    "weight": "lighter",
    "wrap": true,
    "size": "small"
  }]
}
{{#if actions}}
,
{{/if}}
`
