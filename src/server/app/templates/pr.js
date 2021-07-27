export const pr = `
{
  "type": "AdaptiveCard",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.3",
  "fallbackText": "https://adaptivecards.io/explorer/AdaptiveCard.html",
  "body": [{
      "type": "Container",
      "items": [{
          "type": "RichTextBlock",
          "inlines": [
            {
              "type": "Image",
              "url": "https://github.com/ringcentral/github-notification-app/blob/main/icons/comment.png?raw=true",
              "width": 12,
              "height": 12
            },
            {
              "type": "TextBlock",
              "text": "New Pull Request: ",
              "spacing": "None"
            }
          ]
        },
        {
          "type": "TextBlock",
          "text": "\"New test issue\"",
          "spacing": "None"
        },
        {
          "type": "ColumnSet",
          "columns": [{
              "type": "Column",
              "width": "auto",
              "items": [{
                "type": "Image",
                "url": "https://avatars.githubusercontent.com/u/1641949?v=4",
                "size": "Small",
                "style": "Person"
              }]
            },
            {
              "type": "Column",
              "width": "stretch",
              "items": [{
                  "type": "TextBlock",
                  "text": "zxdong262",
                  "weight": "Bolder",
                  "wrap": true
                },
                {
                  "type": "TextBlock",
                  "spacing": "None",
                  "text": "Created {{DATE(2021-01-28T09:28:00Z, SHORT)}}",
                  "isSubtle": true,
                  "wrap": true
                }
              ]
            },
            {
              "type": "Column",
              "width": "auto",
              "items": [{
                "type": "Image",
                "url": "https://github.com/ringcentral/github-notification-app/blob/main/icons/comment.png?raw=true",
                "size": "Small"
              }]
            }
          ],
          "separator": true
        }
      ]
    },
    {
      "type": "Container",
      "items": [{
          "type": "RichTextBlock",
          "inlines": [{
            "type": "TextRun",
            "text": "Comment:",
            "weight": "Bolder"
          }]
        },
        {
          "type": "RichTextBlock",
          "inlines": [{
            "type": "TextRun",
            "text": "Adding new documentation for new endpoint we are currently developing and continuing the conversation. Want to have a really long comment to see how comments are displayed on a card and rendered as a multi-line object that spans several sentences. Let's just talk a lot about nothing to have a really long comment."
          }]
        },
        {
          "type": "FactSet",
          "facts": [{
              "title": "Repository:",
              "value": "[electerm/test-repo](https://github.com/electerm/test-repo)"
            },
            {
              "title": "Issue:",
              "value": "#2"
            }
          ]
        }
      ]
    },
    {
      "type": "ActionSet",
      "actions": [{
        "type": "Action.OpenUrl",
        "title": "View in GitHub",
        "url": "https://github.com/ringcentral/github-notification-app"
      }]
    },
    {
      "type": "ColumnSet",
      "columns": [{
          "type": "Column",
          "width": "auto",
          "items": [{
            "type": "Image",
            "url": "https://github.com/ringcentral/github-notification-app/blob/main/icons/feedback-32.png?raw=true",
            "size": "small",
            "style": "person",
            "width": "16px"
          }]
        },
        {
          "type": "Column",
          "width": "stretch",
          "items": [{
            "type": "TextBlock",
            "text": "[Feedback (Any suggestions, or issues about the github notification app?)](https://github.com/ringcentral/github-notification-app/issues/new)",
            "weight": "lighter",
            "wrap": true,
            "size": "small"
          }]
        }
      ]
    }
  ]
}
`
