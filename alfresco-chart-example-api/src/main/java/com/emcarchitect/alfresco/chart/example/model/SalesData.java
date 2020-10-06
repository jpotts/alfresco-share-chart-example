package com.emcarchitect.alfresco.chart.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Created by jpotts, Metaversant on 10/6/20.
 */
@Data
@AllArgsConstructor
public class SalesData {
    private String region;
    private Integer amount;
}
