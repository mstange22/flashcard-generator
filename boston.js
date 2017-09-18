const request = require("request");

requestURL = "http://registration.baa.org/2018/cf/Public/iframe_EntryLists.cfm?" +
                "mode=results&criteria=&StoredProcParamsOn=yes&&VarAgeLow=0&VarAgeHigh=0" +
                "&VarGenderID=1&VarBibNumber=&VarLastName=&VarFirstName=&VarStateList=0" +
                "&VarCountryOfResList=0&VarCountryOfCtzList=0&VarCityList=&VarZipList=" +
                "&records=1&headerexists=Yes&bordersize=0&bordercolor=%23ffffff&" +
                "rowcolorone=%23FFCC33&rowcolortwo=%23FFFFFF&headercolor=%23ffffff" +
                "&headerfontface=Verdana%2CArial%2CHelvetica%2Csans%2Dserif&headerfontcolor=%23004080" +
                "&headerfontsize=12px&fontface=Verdana%2CArial%2CHelvetica%2Csans%2Dserif"
                "&fontcolor=%23000099&fontsize=10px&linkfield=FormattedSortName&linkurl=OpenDetailsWindow" +
                "&linkparams=RaceAppID&queryname=SearchResults" +
                "&tablefields=FullBibNumber%2CWaveAndCorral%2CFormattedSortName%2CAgeOnRaceDay%2CGenderCode%2CCity%2CStateAbbrev%2CCountryOfResAbbrev%2CCountryOfCtzAbbrev%2CDisabilityGroup"

request(requestURL, function(error, response, body) {
    
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
    
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log(JSON.stringify(response, null, 2));
      }
    });