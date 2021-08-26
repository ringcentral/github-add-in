export const commentSetsTemp = `
{{#if hasCommentAction}}
,
{
  "type": "Container",
  "id": "commentSets",
  "isVisible": false,
  "items": [
    {
      "type": "Input.Text",
      "id": "commentInput",
      "placeholder": "Enter comment",
      "maxLength": 500,
      "isMultiline": true,
      "isRequired": true
    },
    {
      "type": "ColumnSet",
      "columns": [
        {
          "type": "Column",
          "width": "auto",
          "items": [
            {
              "type": "ActionSet",
              "actions": [
                {
                  "type": "Action.ToggleVisibility",
                  "title": "Cancel",
                  "targetElements": [
                    "commentSets"
                  ]
                },
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

{{/if}}
`
