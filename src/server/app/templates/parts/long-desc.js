export const longDescTemp = `
{{#if hasDesc}}
,
{
  "type": "TextBlock",
  "text": "**{{bodyTitle}}:**\\n{{body}}"
},
{
  "type": "TextBlock",
  "text": "{{moreText}}",
  "isVisible": false,
  "id": "moreDescToToggle"
},
{
  "type": "ActionSet",
  "id": "btnShowMore",
  "isVisible": true,
  "actions": [
    {
      "type": "Action.ToggleVisibility",
      "title": "Show more",
      "targetElements": [ "moreDescToToggle", "btnShowLess", "btnShowMore"]
    }
  ]
},
{
  "type": "ActionSet",
  "id": "btnShowLess",
  "isVisible": false,
  "actions": [
    {
      "type": "Action.ToggleVisibility",
      "title": "Show less",
      "targetElements": [ "moreDescToToggle", "btnShowLess","btnShowMore"]
    }
  ]
}
{{/if}}
`
