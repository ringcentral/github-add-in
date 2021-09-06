export const commentSetsTemp = `
{
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "Input.Text",
      "id": "commentInput",
      "placeholder": "Enter comment",
      "maxLength": 500,
      "isMultiline": true,
      "isRequired": true,
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
