model.jsonModel = {
   rootNodeId: args.htmlid,
   pubSubScope: instance.object.id,
   services: [
      {
       name: "examples/services/CustomReportService"
      }
   ],
   widgets:[
      {
        id: "DASHLET",
        name: "examples/widgets/CustomReportDashlet"
        }
    ]
};
