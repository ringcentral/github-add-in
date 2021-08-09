export const descTemp = `
{{#if hasDesc}}
,
{
  "type": "FactSet",
  "facts": [{
      "title": "{{bodyTitle}}:",
      "value": "{{body}}"
    }
  ]
}
{{/if}}
`
