package com.emcarchitect.alfresco.chart.example.web;

import com.emcarchitect.alfresco.chart.example.exceptions.NotAuthorizedException;
import com.emcarchitect.alfresco.chart.example.model.SalesData;
import com.emcarchitect.alfresco.chart.example.services.AlfrescoService;
import com.emcarchitect.alfresco.chart.example.services.SalesDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

/**
 * Created by jpotts, Metaversant on 10/6/20.
 */
@RestController
public class SalesDataController {
    Logger logger = LoggerFactory.getLogger(SalesDataController.class);

    private SalesDataService salesDataService;
    private AlfrescoService alfrescoService;

    public SalesDataController() {
        super();
    }

    @Autowired
    public SalesDataController(SalesDataService salesDataService,
                               AlfrescoService alfrescoService) {
        super();
        this.salesDataService = salesDataService;
        this.alfrescoService = alfrescoService;
    }

    @GetMapping(value = "/api/salesData", produces = "application/json")
    public ArrayList<SalesData> getSalesData(@RequestParam(value = "ticket") String ticket) throws Exception {
        logger.debug("Ticket: " + ticket);
        System.out.println("Ticket: " + ticket);
        if (alfrescoService.isTicketValid(ticket)) {
            return salesDataService.getSalesData();
        } else {
            throw new NotAuthorizedException("Must have a valid ticket to retrieve sales data");
        }
    }
}
