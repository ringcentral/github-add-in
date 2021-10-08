export const releaseTemp = `
{
  "type": "AdaptiveCard",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.3",
  "fallbackText": "GitHub notification",
  "body": [
    {{title}},
    {{author}}
    {{desc}},
    {{assets}},
    {{repo}},
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
