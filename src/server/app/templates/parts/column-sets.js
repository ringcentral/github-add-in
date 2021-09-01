export const columnSetsTemp = `
{
  "type": "ColumnSet",
  "columns": [
    {{#each columns}}
      {
        "type": "Column",
        "width": "auto",
        "verticalContentAlignment": "Center",
        "items": [{
          "type": "FactSet",
          "facts": [
            {
              "title": "{{title}}",
              "value": "{{value}}"
            }
          ]
        }]
      }{{sep}}
    {{/each}}
  ]
}
`
