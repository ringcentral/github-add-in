export const issueTemp = `
{
  "type": "AdaptiveCard",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.3",
  "fallbackText": "GitHub Add-in: {{fallbackText}}",
  "body": [
    {{title}},
    {{author}}
    {{desc}},
    {{repo}},
    {{columnSets}},
    {
      "type": "ColumnSet",
      "columns": [
        {{feedback}}
        {{actions}}
      ]
    }
  ]
}
`
