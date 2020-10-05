/**
 * @module tutorials/services/CustomReportService
 * @extends module:alfresco/services/BaseService
 * @mixes module:alfresco/core/CoreXhr
 * @author Erik Winlöf
 */
define(["dojo/_base/declare",
        "alfresco/services/BaseService",
        "alfresco/core/CoreXhr",
        "alfresco/core/NotificationUtils",
        "alfresco/core/ObjectTypeUtils",
        "dojo/request/xhr",
        "dojo/json",
        "dojo/_base/lang",
        "service/constants/Default"],
        function(declare, BaseService, AlfXhr, NotificationUtils, ObjectTypeUtils, xhr, JSON, lang, AlfConstants) {

   return declare([BaseService, AlfXhr, NotificationUtils], {

      TEST_REPORT: "TEST_REPORT",

      /**
       * An array of the i18n files to use with this widget.
       *
       * @instance
       * @type {Array}
       */
      i18nRequirements: [{i18nFile: "./i18n/CustomReportService.properties"}],

      /**
       * Sets up the subscriptions for the ReportService
       *
       * @instance
       * @since 1.0.32
       */
      registerSubscriptions: function custom_services_CustomReportService__registerSubscriptions() {
         this.alfSubscribe("CUSTOM_RETRIEVE_TEST_REPORT", lang.hitch(this, this.getTestReport));
      },

      /**
       *
       * @instance
       * @param {object} payload The details of the request
       */
      getTestReport: function custom_services_CustomReportService__getTestReport(payload) {
         /*jshint eqnull:true*/
         var alfTopic = (payload.alfResponseTopic != null) ? payload.alfResponseTopic : "CUSTOM_RETRIEVE_TEST_REPORT";
         var url = AlfConstants.PROXY_URI + "custom/data";
         var config = {
            alfTopic: alfTopic,
            url: url,
            method: "GET",
            successCallback: this.publishTestReport,
            callbackScope: this
         };
         this.serviceXhr(config);
      },

      publishTestReport: function custom_services_CustomReportService__publishTestReport(response, requestConfig) {
         this.alfPublish(requestConfig.alfTopic + "_SUCCESS", {
            requestConfig: requestConfig,
            response: {
               data: response,
               dataDescriptor: {
                  crosstabMode: false,
                  seriesInRows: false
               }
            }
         });
      }

   });
});
