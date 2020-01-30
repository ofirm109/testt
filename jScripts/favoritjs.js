
var Q2url = "http://dataservice.accuweather.com/currentconditions/v1/";
var Q2url2 = "?apikey=4QiwFmfAbNnbHzOKGZRyeDw1GjBTH53O&language=en&details=false"
var NameCity = [];
$(document).ready(function () {
    
    
    var myCookie = document.cookie;
    var ArrayFavorit = myCookie.split(",");

    if (ArrayFavorit[0]!=""){
    var StringHtml = "";
    var count = 0;
    for (i = 0; i < ArrayFavorit.length; i++) {
        var cityArry = ArrayFavorit[i].split("&");
        NameCity[NameCity.length] = cityArry[1];
        
        var request2 = Q2url + cityArry[0] + Q2url2;

        //var temp="";
        //var tempText="";
        $.get(request2, function (data, status) {
           var  temp = data[0].Temperature.Metric.Value;
          var  tempText = data[0].WeatherText;
            
            StringHtml += " <div class='col-md col-12 row'> <div class='card day'> ";
            StringHtml += "<p  class='textDay'>" + NameCity[count] + "</p>";
            StringHtml += "<p  class='textDay'>" + temp + "</p>";
            StringHtml += "<p  class='textDay'>" + tempText + "</p>";
            StringHtml += "</div> </div>"
            $(".allCard").html(StringHtml);
            count++;

        }).fail(function () {
            alert(erorr);
        });




    }
    

    }

});

