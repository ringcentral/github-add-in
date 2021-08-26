export const actionsTemp = `
{{#each actions}}
{
  "type": "Column",
  "width": "auto",
  "items": [{
    "type": "ActionSet",
    "actions": [
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
      }
    ]
  }]
}{{sep}}
{{/each}}
`
