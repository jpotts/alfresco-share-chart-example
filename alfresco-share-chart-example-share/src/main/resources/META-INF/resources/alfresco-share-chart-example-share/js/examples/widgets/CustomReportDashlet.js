/**
 * CustomReportDashlet copied from ContentReportDashlet by Erik Winlöf
 *
 * @module examples/widgets/CustomReportDashlet
 * @extends alfresco/dashlet/Dashlet
 * @author Jeff Potts
 */
define(["dojo/_base/declare",
  "alfresco/core/Core",
  "alfresco/core/I18nUtils",
  "alfresco/dashlets/Dashlet"],
     function(declare, AlfCore, I18nUtils, Dashlet) {

        return declare([Dashlet], {

           /**
            * The i18n scope to use for this widget.
            *
            * @instance
            */
           i18nScope: "examples.widgets.CustomReportDashlet",

           /**
            * An array of the i18n files to use with this widget.
            *
            * @instance
            * @type {object[]}
            * @default [{i18nFile: "./i18n/CustomReportDashlet.properties"}]
            */
           i18nRequirements: [{i18nFile: "./i18n/CustomReportDashlet.properties"}],

           /**
            * The widgets to be processed to generate each item in the rendered view.
            *
            * @instance
            * @type {object[]}
            * @default [{name: "examples/widgets/CustomReportWidget", config: {title: ""}}]
            */
           widgetsForBody: [
              {
                 name: "examples/widgets/CustomReportWidget",
                 config: {
                    title: ""
                 }
              }
           ]
        });
     });
