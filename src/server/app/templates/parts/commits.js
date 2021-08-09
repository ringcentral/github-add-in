export const commitsTemp = `
{
  "type": "FactSet",
  "facts": [{
    "title": "Commits:",
    "value": ""
  }]
},
{
  "type": "TextBlock",
  "text": "{{commits}}",
  "spacing": "Small",
  "wrap": true
}
{{#if hasMoreCommits}}
,
{
  "type": "TextBlock",
  "wrap": true,
  "text": "{{moreCommits}}",
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
