package com.emcarchitect.alfresco.chart.example.web;

import com.emcarchitect.alfresco.chart.example.model.SalesData;
import com.emcarchitect.alfresco.chart.example.services.SalesDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

/**
 * Created by jpotts, Metaversant on 10/6/20.
 */
@RestController
public class SalesDataController {
    private SalesDataService salesDataService;

    public SalesDataController() {
        super();
    }

    @Autowired
    public SalesDataController(SalesDataService salesDataService) {
        super();
        this.salesDataService = salesDataService;
    }

    @GetMapping(value = "/api/salesData", produces = "application/json")
    public ArrayList<SalesData> getSalesData() {
        return salesDataService.getSalesData();
    }
}
