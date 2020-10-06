package com.emcarchitect.alfresco.chart.example.services;

import com.emcarchitect.alfresco.chart.example.model.SalesData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * Created by jpotts, Metaversant on 10/6/20.
 */
@Service
public class SalesDataService {
    public ArrayList<SalesData> getSalesData() {
        ArrayList<SalesData> result = new ArrayList<>();
        result.add(new SalesData("North", 125));
        result.add(new SalesData("South", 125));
        result.add(new SalesData("East", 125));
        result.add(new SalesData("West", 125));
        return result;
    }
}
