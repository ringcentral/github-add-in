export const issueTemp = `
{
  "type": "AdaptiveCard",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.3",
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
    {{commentSets}}
  ]
}
`
