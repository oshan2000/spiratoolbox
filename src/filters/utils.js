(function(){
  'use strict';

	app.filter("filterFindBy", ['constantsService', 'helperService', function(constantsService, helperService) {
	  return function(items, values){
	  	var filtered = [];
	  	var value = values[0];
	  	var type = values[1];
      var getMonthName = function(index){
        return constantsService.APP_PROJECT_MONTHS[index];
      };

  		for (var i = 0; i < items.length; i++) {
  	      var item = items[i];

          if(type.indexOf("Props") > -1) {
              
              $.each(item.CustomProperties, function(i, prop){
                if(type.indexOf("DevOwner") > -1 && prop.Definition.Name == "DEV Owner"){
                  if(prop.IntegerValue == value) {filtered.push(item); }
                }
                if(type.indexOf("Channel") > -1 && prop.Definition.Name == "Channel"){
                  if(prop.IntegerValue == value) {filtered.push(item); }
                }
              });
          } else {
    	      switch(type) {
    	      	case 'filterByReleaseId':
                if(helperService.isEqual(item, 'DetectedReleaseId', value)){
                  filtered.push(item); 
                }
    	      	break;
    	      	case 'filterByMonth':
                var month = new Date(moment(item.CreationDate)).getMonth();
                if (getMonthName(month) == value) {
                  filtered.push(item);
                }
    	      	break;
              case 'filterByYear':
                var yearDate = moment(new Date(moment(item.CreationDate))).year();
                if (yearDate == value) {
                  filtered.push(item);
                } 
              break;
              case 'filterByReleaseValue':
                if(helperService.isEqual(item, 'ReleaseId', value)){
                  filtered.push(item.Name); 
                }
              break;
              case 'filterActiveRelease':
                if(helperService.isEqual(item, 'Active', value)){
                  filtered.push(item); 
                }
              break;
              case 'filterReleaseExist':
                for (var x = 0; x < value.length; x++) {
                  var obj = value[x];
                  if(helperService.isEqual(obj, 'ReleaseId', item)){
                    filtered.push(item); 
                  }
                }
              break;
              case 'filterByReleaseVersionNumber': /*For incidents*/
                if(helperService.isEqual(item, 'DetectedReleaseVersionNumber', value)){
                  filtered.push(item); 
                }
              break;
              case 'filterByDetectedReleaseId': /*For release*/
                for (var y = 0; y < value.length; y++) {
                 var num = value[y];
                 if(helperService.isEqual(item, 'ReleaseId', num)){
                   filtered.push(item); 
                 }
                }
              break;
              case 'filterByReleaseProjectName': /*For incidents*/
                if(helperService.isEqual(item, 'ProjectName', value)){
                  filtered.push(item); 
                }
              break;
              case 'filterReleaseVersionNumber': /*For releases*/
                for (var w = 0; w < value.length; w++) {
                 var numx = value[w];
                 if(helperService.isEqual(item, 'VersionNumber', numx)){
                   filtered.push(item); 
                 }
                }
              break;
              case 'filterReleaseVersionNumber2': /*For releases*/
                if(helperService.isEqual(item, 'VersionNumber', value)){
                  return item; 
                }
              break;
              case 'filterReleaseByReleaseId': /*For releases*/
                if(helperService.isEqual(item, 'ReleaseId', value)){
                  filtered.push(item); 
                }
              break;
              case 'filterByIncidentTypeName': /*For releases*/
                if(helperService.isEqual(item, 'IncidentTypeName', value)){
                  filtered.push(item); 
                }
              break;
              case 'filterByIncidentStatusName': /*For releases*/
                if(helperService.isEqual(item, 'IncidentStatusName', value)){
                  filtered.push(item); 
                }
              break;
              case 'filterByIncidentOpenerName': /*For releases*/
                if(helperService.isEqual(item, 'OpenerName', value)){
                  filtered.push(item); 
                } 
              break;
              case 'filterByPriorityName': /*For releases*/
                if(helperService.isEqual(item, 'PriorityName', value)){
                  filtered.push(item); 
                }
              break;
              case 'filterByDateRanges' :
                  var objDate = moment(dateFormat(moment(new Date(moment(item.CreationDate))), "yyyy-mm-dd")),
                      dates = value.split("|"),
                      endDate = moment(dates[1]);
                  if(objDate.isSameOrBefore(endDate)) {
                    filtered.push(item);
                  }
              break;
              case 'filterByOwnerName': /*For incidents*/
                if(helperService.isEqual(item, 'OwnerName', value)){
                  filtered.push(item); 
                }
              break;
              case 'filterByUserId': /*For incident*/
                if(helperService.isEqual(item, 'UserId', value)){
                  return item.FullName;
                }
              break;
              case 'filterByChannel': /*For incident*/
                if(helperService.isEqual(item, 'CustomPropertyValueId', value)){
                  return item.Name;
                }
              break;
              case 'filterTasksReleaseVersionNumber': /*For tasks*/
                if(helperService.isEqual(item, 'ReleaseVersionNumber', value)){
                  filtered.push(item); 
                }
              break;
    	      }
          }
  	    }

	     return filtered;
	  };
	}]);
}());