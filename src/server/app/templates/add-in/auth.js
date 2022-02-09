export const authTemp = `
{
  "type": "AdaptiveCard",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.3",
  "fallbackText": "GitHub Add-in: {{fallbackText}}",
  "body": [
    {
      "type": "TextBlock",
      "text": "{{title}}",
      "wrap": true
    },
    {
      "type": "Input.Text",
      "id": "token",
      "placeholder": "input token"
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Submit",
      "data": {{data}}
    }
  ]
}

`
