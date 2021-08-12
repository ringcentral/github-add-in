export const actionsTemp = `
{{#each actions}}
{
  "type": "Column",
  "width": "stretch",
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
        "type": "{{type}}"
      }
    ]
  }]
}{{sep}}
{{/each}}
`
