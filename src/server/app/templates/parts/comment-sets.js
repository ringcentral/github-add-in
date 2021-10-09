export const commentSetsTemp = `
{
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "Input.Text",
      "id": "{{id}}",
      "placeholder": "Enter comment",
      "maxLength": 500,
      "isMultiline": true,
      "isRequired": true,
      {{#if value}}
      "value": "{{value}}",
      {{/if}}
      "errorMessage": "Required"
    },
    {
      "type": "ColumnSet",
      "columns": [
        {
          "type": "Column",
          "width": "auto",
          "verticalContentAlignment": "Center",
          "items": [
            {
              "type": "ActionSet",
              "actions": [
                {
                  "type": "Action.Submit",
                  "title": "Submit",
                  "data": {{data}}
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
`
