export const assetsTemp = `
{
  "type": "FactSet",
  "facts": [{
    "title": "Assets:",
    "value": ""
  }]
},
{
  "type": "TextBlock",
  "text": "{{assets}}",
  "spacing": "Small",
  "wrap": true
}
{{#if assetsMore}}
,
{
  "type": "TextBlock",
  "wrap": true,
  "text": "{{assetsMore}}",
  "isVisible": false,
  "id": "moreStackTrace",
  "spacing": "None"
},
{
  "type": "Container",
  "items": [{
      "type": "TextBlock",
      "text": "Show more",
      "wrap": true,
      "color": "Accent",
      "id": "showMoreText"
    },
    {
      "type": "TextBlock",
      "text": "Show less",
      "wrap": true,
      "color": "Accent",
      "id": "showLessText",
      "isVisible": false
    }
  ],
  "selectAction": {
    "type": "Action.ToggleVisibility",
    "targetElements": [
      "moreStackTrace",
      "showMoreText",
      "showLessText"
    ],
    "title": "Show more"
  },
  "isVisible": true
}
{{/if}}
`
