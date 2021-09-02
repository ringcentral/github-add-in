export const actionsTemp = `
{{#if hasActions}}
{
  "type": "Column",
  "width": "auto",
  "verticalContentAlignment": "Center",
  "items": [{
    "type": "ActionSet",
    "actions": [
      {{#each actions}}
      {
        "title": "{{title}}",
        {{#if url}}
        "url": "{{url}}",
        {{/if}}
        {{#if data}}
        "data": {{data}},
        {{/if}}
        {{#if targetElements}}
        "targetElements": {{targetElements}},
        {{/if}}
        "type": "{{type}}"
      }{{sep}}
      {{/each}}
    ]
  }]
}
{{/if}}
`
