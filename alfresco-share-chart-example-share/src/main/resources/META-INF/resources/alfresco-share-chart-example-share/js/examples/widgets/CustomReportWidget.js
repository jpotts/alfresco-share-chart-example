/**
 * CustomReport displays data from an API. Based on SiteContentReport by Erik Winlöf.
 *
 * @module example/reports/CustomReport
 * @extends module:alfresco/reports/Report
 * @author Jeff Potts
 */
define(["dojo/_base/declare",
   "alfresco/core/Core",
   "alfresco/core/I18nUtils",
   "alfresco/reports/Report"],
      function(declare, AlfCore, I18nUtils, Report) {
         var i18nScope = "examples.widgets.CustomReportWidget";
         return declare([Report], {

            /**
             * An array of the i18n files to use with this widget.
             *
             * @instance
             * @type {object[]}
             * @default [{i18nFile: "./i18n/CustomReport.properties"}]
             */
            i18nRequirements: [{i18nFile: "./i18n/CustomReportWidget.properties"}],

            /**
             * Declare the dependencies on "legacy" JS files that this is wrapping.
             *
             * @instance
             * @type {string[]}
             * @default ["/js/alfresco.js"]
             */
            nonAmdDependencies: ["/js/alfresco.js"],

            /**
             * The widgets to be processed to generate each item in the rendered view.
             *
             * @instance
             * @type {object[]}
             */
            widgets: [
               {
                  name: "alfresco/charts/ccc/PieChart",
                  config: {
                     dataTopic: "CUSTOM_RETRIEVE_TEST_REPORT",
                     dataTopicPayload: {
                        site: Alfresco.constants.SITE // todo replace with $$SITE$$ once supported
                     },
                     readers: [
                        { names: "category", indexes: 0 },
                        { names: "value", indexes: 1 }
                     ],
                     explodedSliceRadius: null,
                     selectable: false,
                     hoverable:  true,
                     extensionPoints: {
                        slice_innerRadiusEx: "55%",
                        slice_strokeStyle: "white"
                     },
                     tooltip: {
                        format: function(scene){
                           var tooltip = "<div style=\"text-align: left;\">";
                           tooltip += "<strong>" + Alfresco.util.encodeHTML(scene.datum.atoms.category.value) + "</strong><br/>";
                           tooltip += I18nUtils.msg(i18nScope, "sales", Alfresco.util.encodeHTML(scene.datum.atoms.value.value), Alfresco.util.encodeHTML(scene.vars.value.percent.label));
                           tooltip += "</div>";
                           return tooltip;
                        }
                     }
                  }
               }
            ]

         });
      });
