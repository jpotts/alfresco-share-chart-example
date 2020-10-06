var valuesList = [];

var connector = remote.connect("example-api");
var JSONString = connector.get("/api/salesData");
var summaryResponse = jsonUtils.toObject(JSONString);
for (var i = 0; i < summaryResponse.length; i++) {
    valuesList.push({region: summaryResponse[i]["region"],
                     total: summaryResponse[i]["amount"]});
}
model.valuesList = valuesList;
