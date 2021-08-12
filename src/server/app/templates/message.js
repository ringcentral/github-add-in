export const messageTemp = `
{
  "type": "AdaptiveCard",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.3",
  "body": [
    {
      "type": "TextBlock",
      "text": "{{title}}",
      "wrap": true
    }
  ]
}

`
