{
    "resultset": [
        <#list valuesList as values>
        [
            "${values.region}", ${values.total}
        ]<#if values_has_next>,</#if>
        </#list>
    ],
    "metadata": [
      {
        "colIndex": 0,
        "colType": "String",
        "colName": "name"
      },
      {
        "colIndex": 1,
        "colType": "Numeric",
        "colName": "sum"
      }
    ]
}
