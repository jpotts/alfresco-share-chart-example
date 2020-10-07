package com.emcarchitect.alfresco.chart.example.services;

import com.emcarchitect.alfresco.chart.example.exceptions.AlfrescoServiceException;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * Created by jpotts, Metaversant on 10/7/20.
 */
@Service
public class AlfrescoService {
    Logger logger = LoggerFactory.getLogger(AlfrescoService.class);

    @Value("${alfresco.url}")
    private String alfrescoUrl;

    public boolean isTicketValid(String ticket) throws AlfrescoServiceException {
        logger.debug("Ticket: " + ticket);
        boolean valid = false;
        String url = alfrescoUrl + "/alfresco/api/-default-/public/authentication/versions/1/tickets/-me-?alf_ticket=" + ticket;

        try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
            HttpGet httpGet = new HttpGet(url);
            HttpResponse response;
            try {
                response = httpClient.execute(httpGet);
            } catch (IOException ioe) {
                throw new AlfrescoServiceException(ioe.getMessage());
            }

            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode == HttpStatus.SC_OK) {
                valid = true;
            } else if (statusCode != HttpStatus.SC_UNAUTHORIZED) {
                throw new AlfrescoServiceException("Could not validate Alfresco ticket: " + statusCode);
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
        return valid;
    }

}
