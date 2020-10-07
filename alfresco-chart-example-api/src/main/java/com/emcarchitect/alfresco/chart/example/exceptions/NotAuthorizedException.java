package com.emcarchitect.alfresco.chart.example.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by jpotts, Metaversant on 10/7/20.
 */
@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class NotAuthorizedException extends Exception {
    public NotAuthorizedException() {super();}
    public NotAuthorizedException(final String message) {
        super(message);
    }
}
