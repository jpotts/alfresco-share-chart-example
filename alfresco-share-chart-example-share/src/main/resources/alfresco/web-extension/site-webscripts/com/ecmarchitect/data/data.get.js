var valuesList = [];

// Need to get the user's ticket from the repo
var ticketString = remote.call("/custom/ticket");
var ticketResponse = jsonUtils.toObject(ticketString);
var ticket = ticketResponse.ticket;

// Get the sales data from the API
var connector = remote.connect("example-api");
var dataString = connector.get("/api/salesData?ticket=" + ticket);
var dataResponse = jsonUtils.toObject(dataString);
for (var i = 0; i < dataResponse.length; i++) {
    valuesList.push({region: dataResponse[i]["region"],
                     total: dataResponse[i]["amount"]});
}
model.valuesList = valuesList;
