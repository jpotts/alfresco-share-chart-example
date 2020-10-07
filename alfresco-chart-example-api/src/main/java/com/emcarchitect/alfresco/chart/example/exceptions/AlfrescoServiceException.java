package com.emcarchitect.alfresco.chart.example.exceptions;

/**
 * Created by jpotts, Metaversant on 10/7/20.
 */
public class AlfrescoServiceException extends Exception {
    public AlfrescoServiceException() {super();}
    public AlfrescoServiceException(final String message) {
        super(message);
    }
}
