
export const subtitleTemp = `
{{#if hasSubtitle}}
,
{
  "type": "Container",
  "items": [
    {
      "type": "TextBlock",
      "text": "{{text}}",
      "color": "accent"
    }
  ],
  "style": "good"
}
{{/if}}
`
