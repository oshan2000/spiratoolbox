var app=angular.module("myApp",["ui.router","ui.mask","LocalStorageModule","ngResource","ngSanitize","nya.bootstrap.select","moment-picker"]);app.config(["$stateProvider","$urlRouterProvider",function(e,t){"use strict";e.state("auth",{url:"/auth",controller:"AuthCtrl",controllerAs:"mv",templateUrl:"./views/home/auth.html"}).state("app",{url:"/app",templateUrl:"./views/home/home.html"}).state("app.projects",{url:"/projects",templateUrl:"./views/projects/projectList.html",controller:"ProjectCtrl"}).state("app.releases",{url:"/project/:id/releases",templateUrl:"./views/projects/projectReleases.html",controllerAs:"mv",controller:"ProjectCtrl"}).state("app.reviewer",{params:{projects:{}},url:"/reviewer",templateUrl:"./views/projects/projectsViewer.html",controller:"ProjectViewerCtrl"}),t.otherwise("/")}]);
!function(){"use strict";app.controllers||(app.controllers={}),app.controllers.admin=function(t,o,n,e,i,r,c){t.init=function(){n(function(){r.isLoggedAlready()?o.transitionTo("app.projects"):o.transitionTo("auth")})},t.logOut=function(){r.deleteCredentials(),n(function(){o.transitionTo("auth")})},t.parseHTML=function(t){t.HTMLDescription=e.trustAsHtml(t.Description)},t.projects=c.get("projects")},app.controller("AdminCtrl",["$scope","$state","$timeout","$sce","dataService","authService","localStorageService",app.controllers.admin])}();
!function(){"use strict";app.controllers||(app.controllers={}),app.controllers.auth=function(t,e,r,o,c,n,a,s){t.submit=function(){o.authUser(t.username,t.token).then(function(o){r(function(){"200"==o.status&&(n.success(a.APP_AUTH_SUCCESS_TITLE,a.APP_AUTH_SUCCESS_MESSAGE),c.createCredentials(t.username,t.token),s.set("projects",o.data),e.transitionTo("app.projects"))})}).catch(function(){n.error(a.APP_AUTH_ERROR_TITLE,a.APP_AUTH_ERROR_MESSAGE)})}},app.controller("AuthCtrl",["$scope","$state","$timeout","dataService","authService","toastrService","constantsService","localStorageService",app.controllers.auth])}();
!function(){"use strict";app.controllers||(app.controllers={}),app.controllers.header=function(e,r,n){e.mv.items=r.APP_NAVIGATION,e.mv.username=n.get("username")}}();
!function(){"use strict";app.controllers||(app.controllers={}),app.controllers.projects=function(e,t,a,r,c,s,l,n){e.selected={},e.selected.projects=[],e.selectAll=!1,e.releases=[],e.users=[],e.project=[],e.incidents=[],e.tasks=[],e.tasksByDate=[],e.startDate=null,e.properties=[],e.filteredByRelease=[],e.years=[],e.id=parseInt(t.id),e.chart1={},e.chart2={},e.chart3={},e.chart4={},e.chart5={},e.chart6={},e.chart7={},e.chart8={},isNaN(e.id)||(a.getProjectById(e.id).then(function(t){e.project=t.data}),a.getProjectUsersById(e.id).then(function(t){e.users=t.data}),a.getProjectIncidentsCountById(e.id).then(function(t){a.getProjectCustomPropertiesById(e.id).then(function(t){$.each(t.data,function(t,r){var c=r;a.getProjectCustomPropertiesByValues(e.id,parseInt(c.CustomPropertyListId)).then(function(t){e.properties.push(t.data)})})}),a.getProjectIncidentsById(e.id,t.data).then(function(t){e.incidents=t.data,e.years=l.getLabelsArray(e.incidents,"CreationDate","year");var a=new Date;e.selected.year=moment(a.setFullYear(a.getFullYear()-1)).year(),c(e.build())})}),a.getProjectReleasesById(e.id).then(function(t){e.releases=t.data}),a.getProjectTasks(e.id).then(function(t){e.tasks=t.data,e.startDate=dateFormat(moment(e.project.CreationDate),"yyyy-mm-dd")+"T00:00:00.000",a.getProjectTasksByCreationDate(e.id,e.tasks,e.startDate).then(function(t){e.tasksByDate.push(t.data),e.tasksByRelease=l.getLabelsArray(e.tasksByDate[0],"ReleaseVersionNumber","default"),console.log(e.tasksByDate),console.log(e.tasksByRelease)})})),e.build=function(){e.filterProjectIncidentsByYear(),e.filterReleases(),e.selected.release=null,e.filteredByRelease=[]},e.filterProjectIncidentsByYear=function(){var t=[e.selected.year,"filterByYear"];e.filteredByYear=r("filterFindBy")(e.incidents,t),e.chart1=l.getDataChartObject(e.filteredByYear,"CreationDate","month","filterByMonth"),e.chart1.options=l.getOpsChartObject(0,!1,10,10),e.chart1.chart=l.setChartObject("chart1","bar",e.chart1.labels,e.chart1.data,e.chart1.options,"Incidents",s.CHART_COLORS[0],s.CHART_COLORS[1],""),e.releasesNames=l.getLabelsArray(e.filteredByYear,"DetectedReleaseVersionNumber","default")},e.filterReleases=function(){e.chart2=l.getDataChartObject(e.filteredByYear,"DetectedReleaseVersionNumber","default","filterByReleaseVersionNumber"),e.chart2.options=l.getOpsChartObject(1,!1,10,10),e.chart2.chart=l.setChartObject("chart2","bar",e.chart2.labels,e.chart2.data,e.chart2.options,"",s.CHART_COLORS[0],s.CHART_COLORS[1],"")},e.filterReleaseByReleaseVersion=function(t){var a=[t,"filterByReleaseVersionNumber"];e.filteredByRelease=r("filterFindBy")(e.filteredByYear,a),e.filterReleaseByTypeName(),e.filterReleaseByStatus(),e.filterReleaseByOpenerName(),e.filterReleaseByPriority(),e.filterReleaseByOwnerName(),e.filterReleaseByDevOwener(),e.filterReleaseByChannel()},e.filterReleaseByTypeName=function(){e.chart3=l.getDataChartObject(e.filteredByRelease,"IncidentTypeName","default","filterByIncidentTypeName"),e.chart3.options=l.getOpsChartObject(2,!1,10,10),e.chart3.chart=l.setChartObject("chart3","bar",e.chart3.labels,e.chart3.data,e.chart3.options,"",s.CHART_COLORS[0],s.CHART_COLORS[1],"")},e.filterReleaseByStatus=function(){e.chart4=l.getDataChartObject(e.filteredByRelease,"IncidentStatusName","default","filterByIncidentStatusName"),e.chart4.options=l.getOpsChartObject(3,!0,10,10),e.chart4.chart=l.setChartObject("chart4","pie",e.chart4.labels,e.chart4.data,e.chart4.options,"",s.CHART_COLORS[0],s.CHART_COLORS[1],"")},e.filterReleaseByOpenerName=function(){e.chart5=l.getDataChartObject(e.filteredByRelease,"OpenerName","default","filterByIncidentOpenerName"),e.chart5.options=l.getOpsChartObject(4,!1,10,8),e.chart5.chart=l.setChartObject("chart5","bar",e.chart5.labels,e.chart5.data,e.chart5.options,"",s.CHART_COLORS[0],s.CHART_COLORS[1],"random")},e.filterReleaseByPriority=function(){e.chart6=l.getDataChartObject(e.filteredByRelease,"PriorityName","default","filterByPriorityName"),e.chart6.options=l.getOpsChartObject(5,!0,10,8),e.chart6.chart=l.setChartObject("chart6","pie",e.chart6.labels,e.chart6.data,e.chart6.options,"",s.CHART_COLORS[0],s.CHART_COLORS[1],"random")},e.filterReleaseByOwnerName=function(){e.chart7=l.getDataChartObject(e.filteredByRelease,"OwnerName","default","filterByOwnerName"),e.chart7.options=l.getOpsChartObject(7,!1,10,8),e.chart7.chart=l.setChartObject("chart7","bar",e.chart7.labels,e.chart7.data,e.chart7.options,"",s.CHART_COLORS[0],s.CHART_COLORS[1],"random")},e.filterReleaseByDevOwener=function(){e.chart8=l.getDataChartObject(e.filteredByRelease,"CustomProperties","propsDevOwner","filterByPropsDevOwner",e.users),e.chart8.options=l.getOpsChartObject(8,!1,10,8),e.chart8.chart=l.setChartObject("chart8","bar",e.chart8.labels,e.chart8.data,e.chart8.options,"",s.CHART_COLORS[0],s.CHART_COLORS[1],"random")},e.filterReleaseByChannel=function(){e.chart9=l.getDataChartObject(e.filteredByRelease,"CustomProperties","propsChannel","filterByPropsChannel",e.properties),e.chart9.options=l.getOpsChartObject(9,!0,10,8),e.chart9.chart=l.setChartObject("chart9","pie",e.chart9.labels,e.chart9.data,e.chart9.options,"",s.CHART_COLORS[0],s.CHART_COLORS[1],"random")},e.chooseProject=function(t){if(t.Checked=!t.Checked,!t.Checked)return void e.selected.projects.map(function(a){a.ProjectId==t.ProjectId&&(e.selected.projects.splice(e.selected.projects.indexOf(a),1),n.info("Project Unselected",t.Name+" unselected."))});var a=!1;e.selected.projects.map(function(e){e.ProjectId==t.ProjectId&&(a=!0)}),a||(e.selected.projects.push(t),n.info("Project",t.Name+" selected."))},e.toggleAllSelect=function(){e.selectAll?(e.projects.map(function(e){e.Checked=!1}),e.selected.projects=[],e.selectAll=!1,n.info("None","no projects are selected.")):(e.selected.projects=[],e.projects.map(function(t){t.Checked=!0,e.selected.projects.push(t)}),e.selectAll=!0,n.info("All Selected",e.selected.projects.length+" projects were selected."))}},app.controller("ProjectCtrl",["$scope","$stateParams","dataService","$filter","$timeout","constantsService","helperService","toastrService",app.controllers.projects])}();
!function(){"use strict";app.controllers||(app.controllers={}),app.controllers.projectsViewer=function(t,e,a,r,c,n,i){t.projects=e.projects,t.incidents=[],t.selected={},t.startDate=null,t.endDate=null,t.loading=!1,t.chart1={},t.chart2={},t.chart3={},t.chart4={},t.chart5={},t.chart6={},t.chart7={},t.runReviewer=function(){var e=0;t.incidents=[],t.loading=!0,$(t.projects).each(function(){var r=dateFormat(t.startDate,"yyyy-mm-dd")+"T00:00:00.000";a.getProjectIncidentsCountById(this.ProjectId).then($.proxy(function(c){var n=c.data;a.getProjectIncidentsByCreationDate(this.ProjectId,n,r).then(function(a){Array.prototype.push.apply(t.incidents,a.data),t.projects.length-1==e&&(t.loading=!1,t.init()),e++})},this))})},t.init=function(){t.chartTitle=dateFormat(t.startDate,"yyyy-mm-dd")+" → "+dateFormat(t.endDate,"yyyy-mm-dd"),t.incidents=i.getIncidentsByDateRanges(t.incidents,t.startDate,t.endDate),t.filterProjectsByMonths(),t.filterProjectsByProjectName(),t.filterProjectsByReleases(),t.filterProjectsByTypeName(),t.filterProjectsByStatus(),t.filterProjectsByOpener(),t.filterProjectsByPriority()},t.filterProjectsByMonths=function(){t.chart1=i.getDataChartObject(t.incidents,"CreationDate","month","filterByMonth"),t.chart1.options=i.getOpsChartObject(0,!0,10,10),t.chart1.chart=i.setChartObject("chart1","bar",t.chart1.labels,t.chart1.data,t.chart1.options,"Incidents",n.CHART_COLORS[0],n.CHART_COLORS[1],"")},t.filterProjectsByProjectName=function(){t.chart2=i.getDataChartObject(t.incidents,"ProjectName","default","filterByReleaseProjectName"),t.chart2.options=i.getOpsChartObject(6,!1,4,6.5),t.chart2.chart=i.setChartObject("chart2","bar",t.chart2.labels,t.chart2.data,t.chart2.options,"Incidents",n.CHART_COLORS[0],n.CHART_COLORS[1],"")},t.filterProjectsByReleases=function(){t.chart3=i.getDataChartObject(t.incidents,"DetectedReleaseVersionNumber","default","filterByReleaseVersionNumber"),t.chart3.options=i.getOpsChartObject(1,!1,4,6),t.chart3.chart=i.setChartObject("chart3","bar",t.chart3.labels,t.chart3.data,t.chart3.options,"Incidents",n.CHART_COLORS[0],n.CHART_COLORS[1],"")},t.filterProjectsByTypeName=function(){t.chart4=i.getDataChartObject(t.incidents,"IncidentTypeName","default","filterByIncidentTypeName"),t.chart4.options=i.getOpsChartObject(2,!1,4,6),t.chart4.chart=i.setChartObject("chart4","bar",t.chart4.labels,t.chart4.data,t.chart4.options,"Incidents",n.CHART_COLORS[0],n.CHART_COLORS[1],"")},t.filterProjectsByStatus=function(){t.chart5=i.getDataChartObject(t.incidents,"IncidentStatusName","default","filterByIncidentStatusName"),t.chart5.options=i.getOpsChartObject(3,!0,4,6),t.chart5.chart=i.setChartObject("chart5","pie",t.chart5.labels,t.chart5.data,t.chart5.options,"Incidents",n.CHART_COLORS[0],n.CHART_COLORS[1],"")},t.filterProjectsByOpener=function(){t.chart6=i.getDataChartObject(t.incidents,"OpenerName","default","filterByIncidentOpenerName"),t.chart6.options=i.getOpsChartObject(4,!1,4,5.5),t.chart6.chart=i.setChartObject("chart6","bar",t.chart6.labels,t.chart6.data,t.chart6.options,"Incidents",n.CHART_COLORS[0],n.CHART_COLORS[1],"",!1)},t.filterProjectsByPriority=function(){t.chart7=i.getDataChartObject(t.incidents,"PriorityName","default","filterByPriorityName"),t.chart7.options=i.getOpsChartObject(5,!0,4,10),t.chart7.chart=i.setChartObject("chart7","pie",t.chart7.labels,t.chart7.data,t.chart7.options,"Incidents",n.CHART_COLORS[0],n.CHART_COLORS[1],"")}},app.controller("ProjectViewerCtrl",["$scope","$stateParams","dataService","$filter","$timeout","constantsService","helperService",app.controllers.projectsViewer])}();
!function(){"use strict";app.filter("trust",["$sce",function(t){return function(n){return t.trustAsHtml(n)}}])}();
!function(){"use strict";app.filter("filterFindBy",["constantsService","helperService",function(e,a){return function(r,s){for(var t=[],i=s[0],n=s[1],l=0;l<r.length;l++){var u=r[l];if(n.indexOf("Props")>-1)$.each(u.CustomProperties,function(e,a){n.indexOf("DevOwner")>-1&&"DEV Owner"==a.Definition.Name&&a.IntegerValue==i&&t.push(u),n.indexOf("Channel")>-1&&"Channel"==a.Definition.Name&&a.IntegerValue==i&&t.push(u)});else switch(n){case"filterByReleaseId":a.isEqual(u,"DetectedReleaseId",i)&&t.push(u);break;case"filterByMonth":var c=new Date(moment(u.CreationDate)).getMonth();(function(a){return e.APP_PROJECT_MONTHS[a]})(c)==i&&t.push(u);break;case"filterByYear":moment(new Date(moment(u.CreationDate))).year()==i&&t.push(u);break;case"filterByReleaseValue":a.isEqual(u,"ReleaseId",i)&&t.push(u.Name);break;case"filterActiveRelease":a.isEqual(u,"Active",i)&&t.push(u);break;case"filterReleaseExist":for(var m=0;m<i.length;m++){var f=i[m];a.isEqual(f,"ReleaseId",u)&&t.push(u)}break;case"filterByReleaseVersionNumber":a.isEqual(u,"DetectedReleaseVersionNumber",i)&&t.push(u);break;case"filterByDetectedReleaseId":for(var o=0;o<i.length;o++){var h=i[o];a.isEqual(u,"ReleaseId",h)&&t.push(u)}break;case"filterByReleaseProjectName":a.isEqual(u,"ProjectName",i)&&t.push(u);break;case"filterReleaseVersionNumber":for(var p=0;p<i.length;p++){var y=i[p];a.isEqual(u,"VersionNumber",y)&&t.push(u)}break;case"filterReleaseVersionNumber2":if(a.isEqual(u,"VersionNumber",i))return u;break;case"filterReleaseByReleaseId":a.isEqual(u,"ReleaseId",i)&&t.push(u);break;case"filterByIncidentTypeName":a.isEqual(u,"IncidentTypeName",i)&&t.push(u);break;case"filterByIncidentStatusName":a.isEqual(u,"IncidentStatusName",i)&&t.push(u);break;case"filterByIncidentOpenerName":a.isEqual(u,"OpenerName",i)&&t.push(u);break;case"filterByPriorityName":a.isEqual(u,"PriorityName",i)&&t.push(u);break;case"filterByDateRanges":var d=moment(dateFormat(moment(new Date(moment(u.CreationDate))),"yyyy-mm-dd")),b=i.split("|"),N=moment(b[1]);d.isSameOrBefore(N)&&t.push(u);break;case"filterByOwnerName":a.isEqual(u,"OwnerName",i)&&t.push(u);break;case"filterByUserId":if(a.isEqual(u,"UserId",i))return u.FullName;break;case"filterByChannel":if(a.isEqual(u,"CustomPropertyValueId",i))return u.Name}}return t}}])}();
!function(){"use strict";var e={PROJECTS:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects?",PROJECT:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}?",PROJECT_RELEASES:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/releases?",PROJECT_USERS:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/users?",PROJECT_INCIDENTS:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/incidents/search?start_row=0&number_rows={1}&",PROJECT_INCIDENTS_TYPES:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/incidents/types?",PROJECT_INCIDENTS_DATE:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/incidents/recent?start_row=0&number_rows={1}&creation_date={2}&",PROJECT_INCIDENTS_COUNT:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/incidents/count?",PROJECT_CUSTOM_TYPES:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/custom-lists?",PROJECT_CUSTOM_TYPES_VALUES:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/custom-lists/{1}?",PROJECT_TASKS:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/tasks/count?",PROJECT_TASKS_DATE:"https://spira.dxide.com/Services/v4_0/RestService.svc/projects/{0}/tasks/new?creation_date={2}&start_row=0&number_of_rows={1}&"};app.constant("apiService",e)}();
!function(){"use strict";function e(e){var t=function(t,n){e.set("username",t),e.set("token",n)},n=function(){return void 0!==r()},r=function(){return e.get("username")},o=function(){return e.get("token")},u=function(){e.remove("projects"),e.remove("username"),e.remove("token")};return{isLoggedAlready:n,getUsername:r,getToken:o,createCredentials:t,deleteCredentials:u}}e.$inject=["localStorageService"],app.factory("authService",e)}();
!function(){"use strict";var e={APP_TITLE:"Spira Toolbox",APP_DESCRIPTION:"Great for learning Angular features.",APP_VERSION:"1.0",APP_NAVIGATION:[{state:"app",header:"Me",active:!1},{state:"app.projects",header:"Projects",active:!1},{state:"app.reviewer",header:"Reviewer",active:!1}],APP_AUTH_SUCCESS_TITLE:"Awesome.",APP_AUTH_SUCCESS_MESSAGE:"You were successfully authenticated.",APP_AUTH_ERROR_TITLE:"Oh no!.",APP_AUTH_ERROR_MESSAGE:"Please provide valid user information.",APP_PROJECT_MONTHS:["January","February","March","April","May","June","July","August","September","October","November","December"],APP_PROJECT_YEARS:["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2025","2026"],CHART_TITLES:["Total Incidents Filtered By Year","Total Incidents Filtered By Release","Total Incidents Filtered By Type","Total Incidents Filtered By Status","Total Incidents Filtered By Opener","Total Incidents Filtered By Priority","Total Incidents Filtered By Projects","Total Incidents Filtered By Owner","Total Incidents Filtered By DEV Owner","Total Incidents Filtered By Channel/Devices"],CHART_COLORS:["rgb(255,255,244)","rgb(7,54,66)","rgb(244,243,86)","rgb(248,248,248)","rgb(252,248,227)","rgb(245,216,87)","rgb(242,158,86)","rgb(102,255,255)","rgb(255,255,204)","rgb(242,158,86)","rgb(245,216,87)","rgb(244,243,86)","rgb(244,116,87)","rgb(228,255,0)","rgb(244,216,90)","rgb(255,234,145)","rgb(239,230,189)","rgb(108,226,199)","rgb(96,255,215)","rgb(244,207,39)","rgb(74,226,158)"]};app.constant("constantsService",e)}();
!function(){"use strict";function e(e,r,t,n){var c=function(r,t){var n=g(e.PROJECTS,r,t);return _(n)},a=function(){return n.get("username")},u=function(){return n.get("token")},o=function(){return n.get("projects")},i=function(r){var t=g(e.PROJECT,a(),u());return _(t.replace("{0}",r))},P=function(r){var t=g(e.PROJECT_RELEASES,a(),u());return _(t.replace("{0}",r))},l=function(r){var t=g(e.PROJECT_USERS,a(),u());return _(t.replace("{0}",r))},T=function(r,t){var n=g(e.PROJECT_INCIDENTS,a(),u());return _(n.replace("{0}",r).replace("{1}",t))},s=function(r){var t=g(e.PROJECT_INCIDENTS_TYPES,a(),u());return _(t.replace("{0}",r))},p=function(r){var t=g(e.PROJECT_INCIDENTS_COUNT,a(),u());return _(t.replace("{0}",r))},E=function(r){var t=g(e.PROJECT_CUSTOM_TYPES,a(),u());return _(t.replace("{0}",r))},C=function(r,t){var n=g(e.PROJECT_CUSTOM_TYPES_VALUES,a(),u());return _(n.replace("{0}",r).replace("{1}",t))},S=function(r,t,n){var c=g(e.PROJECT_INCIDENTS_DATE,a(),u());return _(c.replace("{0}",r).replace("{1}",t).replace("{2}",n))},f=function(r){var t=g(e.PROJECT_TASKS,a(),u());return _(t.replace("{0}",r))},I=function(r,t,n){var c=g(e.PROJECT_TASKS_DATE,a(),u());return _(c.replace("{0}",r).replace("{1}",t).replace("{2}",n))},_=function(e){return r({method:"JSONP",url:t.trustAsResourceUrl(e),callbackKey:"callback"})},g=function(e,r,t){return e+"username="+r+"&api-key="+t};return{authUser:c,getAllProjects:o,getProjectById:i,getProjectReleasesById:P,getProjectUsersById:l,getProjectIncidentsById:T,getProjectIncidentsTypeById:s,getProjectIncidentsCountById:p,getProjectCustomPropertiesById:E,getProjectCustomPropertiesByValues:C,getProjectIncidentsByCreationDate:S,getProjectTasks:f,getProjectTasksByCreationDate:I}}e.$inject=["apiService","$http","$sce","localStorageService"],app.factory("dataService",e)}();
!function(){"use strict";function e(e,t){var r=function(t,r,n){var a=[];return $(t).each(function(t,i){var o=[i,n],l=e("filterFindBy")(r,o);a.push(l.length)}),a},n=function(t,r,n){var a=[];return $(t).each(function(t,i){var o=[i,n],l=e("filterFindBy")(r,o);a.push(l)}),a},a=function(e,r,n){for(var a=[],i=0;i<e.length;i++){var o=e[i];if(n.indexOf("props")>-1){var l=o[r];$.each(l,function(e,t){n.indexOf("DevOwner")>-1&&"DEV Owner"==t.Definition.Name&&a.indexOf(t.IntegerValue)==-1&&t.IntegerValue&&a.push(t.IntegerValue),n.indexOf("Channel")>-1&&"Channel"==t.Definition.Name&&a.indexOf(t.IntegerValue)==-1&&t.IntegerValue&&a.push(t.IntegerValue)})}else switch(n){case"default":a.indexOf(o[r])==-1&&o[r]&&a.push(o[r]);break;case"year":var s=moment(o[r]).year();a.indexOf(s)==-1&&s&&a.push(s);break;case"month":var u=t.APP_PROJECT_MONTHS[moment(o[r]).month()];a.indexOf(u)==-1&&u&&a.push(u)}}return a},i=function(e){var t=!1;return 0===e.length?t:(e.map(function(e){0!==e&&(t=!0)}),t)},o=function(e,t,r,n,a,i,o,l,s,u){var d=document.getElementById(e),f=$("<canvas class='chart'></canvas>"),O=null,C={};switch(C.options={},$(d).html(f),t){case"bar":O={label:i,data:n,backgroundColor:c(o,r,s),borderColor:c(l,r,"border"),borderWidth:1},C.options=a,void 0!==u&&u!==!0||(C.options.events=!1,C.options.tooltips={enabled:!0},C.options.animation={duration:1,onComplete:function(){var e=this.chart,t=e.ctx;t.font=Chart.helpers.fontString(10,"bold",Chart.defaults.global.defaultFontFamily),t.textAlign="center",t.textBaseline="bottom",this.data.datasets.forEach(function(r,n){e.controller.getDatasetMeta(n).data.forEach(function(e,n){var a=r.data[n];t.fillStyle="black",t.fillText(a,e._model.x,e._model.y-2)})})}});break;case"pie":O={label:i,data:n,backgroundColor:c(o,r,s),borderColor:c(l,r,"border"),borderWidth:1},C.options=a}C.type=t,C.data={labels:r,datasets:[O]},d=new Chart(f,C)},l=function(e,t,o,l,u){var c=a(e,t,o),d=r(c,e,l),f=i(d);if(o.indexOf("props")>-1){var O="";o.indexOf("DevOwner")>-1&&(O="filterByUserId"),o.indexOf("Channel")>-1&&(O="filterByChannel",u=s("Channel",u)),c=n(c,u,O)}return{labels:c,data:d,display:f}},s=function(e,t){for(var r=0;r<t.length;r++){var n=t[r];if(n.Name==e)return n.Values}},u=function(e,r,n,a){return{scales:{xAxes:[{ticks:{fontSize:a}}]},defaultFontSize:n,defaultFontStyle:"italic",title:{display:!0,text:t.CHART_TITLES[e]},legend:{display:r}}},c=function(e,r,n){return r.map(function(r){if("border"==n)return e;switch(r){case"Closed":return t.CHART_COLORS[2];case"New":return t.CHART_COLORS[3];case"Open":return t.CHART_COLORS[4];case"Retest DEV":return t.CHART_COLORS[5];case"Retest QA":return t.CHART_COLORS[12];case"Rejected":return t.CHART_COLORS[6];case"1 - High":return t.CHART_COLORS[12];case"2 - Major":return t.CHART_COLORS[9];case"3 - Medium":return t.CHART_COLORS[10];case"4 - Low":return t.CHART_COLORS[11];case"5 – Task/Enhancement":return t.CHART_COLORS[8];case"6 - Deferred":return t.CHART_COLORS[7];case"All":return t.CHART_COLORS[13];case"Desktop":return t.CHART_COLORS[14];case"Desktop/Mobile":return t.CHART_COLORS[15];case"Desktop/Tablet":return t.CHART_COLORS[16];case"Mobile":return t.CHART_COLORS[17];case"Tablet":return t.CHART_COLORS[18];case"Tablet/Mobile":return t.CHART_COLORS[19];default:return e}})},d=function(t,r,n){var a=[dateFormat(r,"yyyy-mm-dd")+"|"+dateFormat(n,"yyyy-mm-dd"),"filterByDateRanges"];return e("filterFindBy")(t,a)},f=function(e,t,r){return e[t]==r};return{bindArrayWithQuantity:r,bindArrayWithValue:n,getLabelsArray:a,validateDataArray:i,setChartObject:o,getDataChartObject:l,getOpsChartObject:u,getColorsArray:c,getIncidentsByDateRanges:d,isEqual:f}}e.$inject=["$filter","constantsService"],app.factory("helperService",e)}();
!function(){"use strict";function t(){return{success:function(t,r){toastr.success(r,t)},info:function(t,r){toastr.info(r,t)},error:function(t,r){toastr.error(r,t)}}}app.factory("toastrService",t)}();
!function(){"use strict";app.component("bars",{templateUrl:"./views/projects/charts/chartBars.html",bindings:{data:"=",selector:"@",title:"@",display:"=",year:"="},controllerAs:"mv",controller:function(){this.download=function(t){var r=$(t.currentTarget),a=r.parent().find("canvas")[0];r.prop("href",a.toDataURL()),r.prop("download","chart-"+randomID(10,"aA")+".png")}}})}();

!function(){"use strict";app.component("accordionItem",{templateUrl:"./views/commons/accordionItem.html",transclude:!0,bindings:{release:"@",section:"@",label:"@",icon:"@"},controllerAs:"mv"})}();
!function(){"use strict";app.component("appheader",{templateUrl:"./views/commons/header.html",controllerAs:"mv",controller:["$scope","constantsService","localStorageService",app.controllers.header]})}();

