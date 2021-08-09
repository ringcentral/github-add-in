export const actionsTemp = `
{{#each actions}}
{
  "type": "Column",
  "width": "stretch",
  "items": [{
    "type": "ActionSet",
    "actions": [
      {
        "type": "Action.OpenUrl",
        "title": "{{title}}",
        "url": "{{url}}"
      }
    ]
  }]
}{{sep}}
{{/each}}
`
