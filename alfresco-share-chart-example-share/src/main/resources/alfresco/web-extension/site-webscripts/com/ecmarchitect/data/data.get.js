var valuesList = [];

// Get the sales data from the API
var connector = remote.connect("example-api");
var dataString = connector.get("/api/salesData");
var dataResponse = jsonUtils.toObject(dataString);
for (var i = 0; i < dataResponse.length; i++) {
    valuesList.push({region: dataResponse[i]["region"],
                     total: dataResponse[i]["amount"]});
}
model.valuesList = valuesList;
