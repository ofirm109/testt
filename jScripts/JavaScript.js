﻿var Qurl = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=4QiwFmfAbNnbHzOKGZRyeDw1GjBTH53O&q="
var Qurl2 = "&language=en"
var Q2url = "http://dataservice.accuweather.com/currentconditions/v1/";
var Q2url2 = "?apikey=4QiwFmfAbNnbHzOKGZRyeDw1GjBTH53O&language=en&details=false"
var Q3url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
var Q3url2 = "?apikey=4QiwFmfAbNnbHzOKGZRyeDw1GjBTH53O&language=en&details=false&metric=true";
var favoritValue = "";
var favoritArray;
var favoritArrayNocookie = [];
var ThisFavoritSelect = false;
var locsionName = "";
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


$(document).ready(function () {

    var DataSerch;
    $("#mySerchCity").val("Tel Aviv");
    $("#SerchHelp").hide();
    $("#erorrConect").hide();
    $("#erorrName").hide();


    var cookieArrayString = document.cookie;
    favoritArray = cookieArrayString.split(",");
    if (favoritArray.length != 0) {
        for (i = 0; i < favoritArray.length; i++) {
            var favoritArray2 = favoritArray[i].split("&");
            favoritArrayNocookie[i] = favoritArray2[0];
        }
    }


    thisSerch();

    //$("#mySerchCity").on("change keyup paste", function () {
    //    var request1 = Qurl + $("#mySerchCity").val() + Qurl2;
    //    var htmlLi = "";


    //    //הקלדת המילה
    //    $.get(request1, function (data, status) {

    //        DataSerch = data;


    //        for (i = 0; i < DataSerch.length; i++) {

    //            //var myName = DataSerch[i].LocalizedName + "," + DataSerch[i].Country.LocalizedName;
    //            var myName = DataSerch[i].LocalizedName;
    //            htmlLi += "<li>" + myName + "</li>";
    //            $("#help").html(htmlLi);
    //            if (htmlLi != "") {
    //                $("#SerchHelp").show();
    //            }
    //        }
    //    });



    //});




});

function thisSerch() {
    $("#erorrConect").hide();
    $("#erorrName").hide();

    var cityName = $("#mySerchCity").val();


    var request1 = Qurl + cityName + Qurl2;
    var DataSerch;

    $.get(request1, function (data, status) {

        DataSerch = data;
        if (status == "success") {
            DataSerch = DataSerch[0].Key;
            thisDay(DataSerch);
            thisWeek(DataSerch);
            favoritValue = DataSerch;
            locsionName = cityName;
            $("#ThisLoc").html(cityName);


            ThisFavoritSelect = false;
            for (i = 0; i < favoritArray.length; i++) {
                if (favoritArrayNocookie[i] == DataSerch) {
                    ThisFavoritSelect = true;
                }
            }
            if (ThisFavoritSelect == true) {
                $("#addFavorit").html("Remove favorite");
            } else {
                $("#addFavorit").html("Add favorite");
            }

        } else {
            //שם לא נכון
            erorr("name");
        }

    }).fail(function () {
        erorr("server");
    });
}
//טמפרטורת היום
function thisDay(MyData) {
    var request2 = Q2url + MyData + Q2url2;
    var temp;
    var tempText;
    $.get(request2, function (data, status) {
        temp = data[0].Temperature.Metric.Value;
        tempText = data[0].WeatherText;
        $("#ThisTemp").html(temp + " C");
        $("#thisTempText").html(tempText);

    }).fail(function () {
        erorr("server");
    });


}
//טמפרטורת השבוע
function thisWeek(MyData) {
    var request3 = Q3url + MyData + Q3url2;
    var AllDayWeek = [];
    $.get(request3, function (data, status) {

        for (i = 0; i < 5; i++) {
            var DateArry = new Date(data.DailyForecasts[i].Date)
            
            var DayToArray = [DateArry, data.DailyForecasts[i].Temperature.Minimum.Value, data.DailyForecasts[i].Temperature.Maximum.Value];
            AllDayWeek[i] = DayToArray;
        }

        $("#day1").html(days[AllDayWeek[0][0].getDay()]);
        $("#day1Temp").html(AllDayWeek[0][1] + " C" );
        $("#day2").html(days[AllDayWeek[1][0].getDay()]);
        $("#day2Temp").html(AllDayWeek[1][1] + " C" );
        $("#day3").html(days[AllDayWeek[2][0].getDay()]);
        $("#day3Temp").html(AllDayWeek[2][1] + " C" );
        $("#day4").html(days[AllDayWeek[3][0].getDay()]);
        $("#day4Temp").html(AllDayWeek[3][1] + " C" );
        $("#day5").html(days[AllDayWeek[4][0].getDay()]);
        $("#day5Temp").html(AllDayWeek[4][1] + " C" );
    }).fail(function () {

        erorr("server");
    });

}
//לב
function favorit() {

    if (ThisFavoritSelect == false) {
        favoritArray[favoritArray.length] = favoritValue + "&" + locsionName;
        ThisFavoritSelect = true;

    } else {
        ThisFavoritSelect = false;
        for (i = 0; i < favoritArray.length; i++) {
            if (favoritArrayNocookie[i] == favoritValue) {
                favoritArray.splice(i, 1);
            }
        }
    }

    if (ThisFavoritSelect == true) {
        $("#addFavorit").html("Remove favorite");
    } else {
        $("#addFavorit").html("Add favorite");
    }
}

function erorr(thisErorr) {
    if (thisErorr == "name") {
        $("#erorrName").fadeIn(500);
    } else if (thisErorr == "server") {
        $("#erorrConect").fadeIn(500);
    }

    $("#day1").html(" ");
    $("#day1Temp").html(" ");
    $("#day2").html(" ");
    $("#day2Temp").html(" ");
    $("#day3").html(" ");
    $("#day3Temp").html(" ");
    $("#day4").html(" ");
    $("#day4Temp").html(" ");
    $("#day5").html(" ");
    $("#day5Temp").html(" ");
    $("#ThisLoc").html("");
    $("#ThisTemp").html(" ");
}
function AllFavoritPage() {
    var ArryString = "";
    for (i = 0; i < favoritArray.length; i++) {
        if (ArryString == "") {
            ArryString = favoritArray[i];
        } else {
            ArryString += "," + favoritArray[i]
        }
    }
    var myCookie = document.cookie;
    myCookie = ArryString;
    document.cookie = myCookie;
    window.location.href = 'favorit.htm';
}