/* 나라 보여주기 */

// $.ajax({
//     type: 'GET',
//     url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/country',
//     success: function() {
//         alert('통신 성공시에만 실행');
//         console.log("성공");
//     },
//     error: function() {
//         alert('통신 실패시에만 실행');
//         console.log("왜 실패?");
//     }
// });

var average1 = 100000000;
var average2 = 100000000;
var average3 = 100000000;

var wrap_cheap = document.querySelector(".wrap_cheap");

const averageCalc = () => {

    /* 나라 html + css */
    let country1 = document.createElement("p");
    country1.setAttribute("class", "cheapCoun");
    country1.innerHTML = "나라1";

    let country2 = document.createElement("p");
    country2.setAttribute("class", "cheapCoun");
    country2.innerHTML = "나라2";

    let country3 = document.createElement("p");
    country3.setAttribute("class", "cheapCoun");
    country3.innerHTML = "나라3";

    var cheacpCountry = 0;

    cheacpCountry = ((average1 < average2) && (average1 < average3)) ? average1 : (((average2 < average3) ? average2 : average3));

    console.log(average1);
    console.log(average2);
    console.log(average3);

    if (cheacpCountry == average1) {
        if (average1 == average2) {
            if (average2 == average3) {
                wrap_cheap.appendChild(country1);
                wrap_cheap.appendChild(country2);
                wrap_cheap.appendChild(country3);
            } else {
                wrap_cheap.appendChild(country1);
                wrap_cheap.appendChild(country2);
            }
        } else if (average1 == average3) {
            wrap_cheap.appendChild(country1);
            wrap_cheap.appendChild(country3);
        } else {
            wrap_cheap.appendChild(country1);

        }
    } else if (cheacpCountry == average2) {
        if (average2 == average3) {
            wrap_cheap.appendChild(country2);
            wrap_cheap.appendChild(country3);
        } else {
            wrap_cheap.appendChild(country2);
        }
    } else if (cheacpCountry == average3) {
        wrap_cheap.appendChild(country3);

    }
}

/********** 나라 **********/

/* 나라 보여주기 1 */
var jsonLocation = "../json/countryList.json";
$.getJSON(jsonLocation, function(data) {
    const length = data.data.length;

    var i;
    for (i = 0; i < length; i++) {

        const countryName = data.data[i].countryName;
        const code = data.data[i].code;

        let countryList = document.querySelector(".country1");
        let country = document.createElement("option");
        country.setAttribute("value", code);
        country.innerHTML = countryName;
        countryList.appendChild(country);
    }
});

var dropdownC1 = document.getElementById("country1");
dropdownC1.addEventListener("change", function() {
    if (wrap_cheap.childElementCount > 0)
        wrap_cheap.replaceChild();

    /* 차트 초기화 */

    barChartData.datasets[0].data[0] = 0;
    barChartData.datasets[0].data[1] = 0;
    barChartData.datasets[0].data[2] = 0;
    barChartData.datasets[0].data[3] = 0;
    window.theChart.update();

    /* 지역 찾기 */

    selectedOption = dropdownC1.value;

    var find1 = "../json/";
    var find2 = ".json";
    var findPath = find1 + selectedOption + find2;

    var jsonLocation = findPath;
    $.getJSON(jsonLocation, function(data) {
        const length = data.data.length;

        var i;
        for (i = 0; i < length; i++) {

            const ADName = data.data[i].ADName;
            const code = data.data[i].code;

            let divisionList = document.querySelector(".division1");
            let division = document.createElement("option");
            division.setAttribute("value", code);
            division.innerHTML = ADName;
            divisionList.appendChild(division);
        }
    });
});

/* 나라 보여주기 2 */
var jsonLocation = "../json/countryList.json";
$.getJSON(jsonLocation, function(data) {
    const length = data.data.length;

    var i;
    for (i = 0; i < length; i++) {

        const countryName = data.data[i].countryName;
        const code = data.data[i].code;

        let countryList = document.querySelector(".country2");
        let country = document.createElement("option");
        country.setAttribute("value", code);
        country.innerHTML = countryName;
        countryList.appendChild(country);
    }
});

var dropdownC2 = document.getElementById("country2");
dropdownC2.addEventListener("change", function() {
    if (wrap_cheap.childElementCount > 0)
        wrap_cheap.replaceChild();

    /* 차트 초기화 */

    barChartData.datasets[1].data[0] = 0;
    barChartData.datasets[1].data[1] = 0;
    barChartData.datasets[1].data[2] = 0;
    barChartData.datasets[1].data[3] = 0;
    window.theChart.update();

    /* 지역 찾기 */

    selectedOption = dropdownC2.value;

    var find1 = "../json/";
    var find2 = ".json";
    var findPath = find1 + selectedOption + find2;

    var jsonLocation = findPath;
    $.getJSON(jsonLocation, function(data) {
        const length = data.data.length;

        var i;
        for (i = 0; i < length; i++) {

            const ADName = data.data[i].ADName;
            const code = data.data[i].code;

            let divisionList = document.querySelector(".division2");
            let division = document.createElement("option");
            division.setAttribute("value", code);
            division.innerHTML = ADName;
            divisionList.appendChild(division);
        }
    });
});

/* 나라 보여주기 3 */
var jsonLocation = "../json/countryList.json";
$.getJSON(jsonLocation, function(data) {
    const length = data.data.length;

    var i;
    for (i = 0; i < length; i++) {

        const countryName = data.data[i].countryName;
        const code = data.data[i].code;

        let countryList = document.querySelector(".country3");
        let country = document.createElement("option");
        country.setAttribute("value", code);
        country.innerHTML = countryName;
        countryList.appendChild(country);
    }
});

var dropdownC3 = document.getElementById("country3");
dropdownC3.addEventListener("change", function() {
    if (wrap_cheap.childElementCount > 0)
        wrap_cheap.replaceChild();

    /* 차트 초기화 */

    barChartData.datasets[2].data[0] = 0;
    barChartData.datasets[2].data[1] = 0;
    barChartData.datasets[2].data[2] = 0;
    barChartData.datasets[2].data[3] = 0;
    window.theChart.update();

    /* 지역 찾기 */

    selectedOption = dropdownC3.value;

    var find1 = "../json/";
    var find2 = ".json";
    var findPath = find1 + selectedOption + find2;

    var jsonLocation = findPath;
    $.getJSON(jsonLocation, function(data) {
        const length = data.data.length;

        var i;
        for (i = 0; i < length; i++) {

            const ADName = data.data[i].ADName;
            const code = data.data[i].code;

            let divisionList = document.querySelector(".division3");
            let division = document.createElement("option");
            division.setAttribute("value", code);
            division.innerHTML = ADName;
            divisionList.appendChild(division);
        }
    });
});


/********** 물가 **********/

/* 물가 찾기1 */
var dropdownD1 = document.getElementById("division1");
dropdownD1.addEventListener("change", function() {

    selectedOption = dropdownD1.value;

    var find1 = "../json/";
    var find2 = ".json";
    var findPath = find1 + selectedOption + find2;

    var jsonLocation = findPath;
    $.getJSON(jsonLocation, function(data) {

        var meal = data.data.meal;
        var transport = data.data.transport;
        var accom = data.data.accom;
        var coffee = data.data.coffee;

        barChartData.datasets[0].data[0] = meal;
        barChartData.datasets[0].data[1] = transport;
        barChartData.datasets[0].data[2] = accom;
        barChartData.datasets[0].data[3] = coffee;
        window.theChart.update();

        average1 = (Number(meal) + Number(transport) + Number(accom) + Number(coffee)) / 4;

        averageCalc();
    });
});

/* 물가 찾기2 */
var dropdownD2 = document.getElementById("division2");
dropdownD2.addEventListener("change", function() {

    selectedOption = dropdownD2.value;

    var find1 = "../json/";
    var find2 = ".json";
    var findPath = find1 + selectedOption + find2;

    var jsonLocation = findPath;
    $.getJSON(jsonLocation, function(data) {

        var meal = data.data.meal;
        var transport = data.data.transport;
        var accom = data.data.accom;
        var coffee = data.data.coffee;

        barChartData.datasets[1].data[0] = meal;
        barChartData.datasets[1].data[1] = transport;
        barChartData.datasets[1].data[2] = accom;
        barChartData.datasets[1].data[3] = coffee;
        window.theChart.update();

        average2 = (Number(meal) + Number(transport) + Number(accom) + Number(coffee)) / 4;

        averageCalc();
    });
});

/* 물가 찾기3 */
var dropdownD3 = document.getElementById("division3");
dropdownD3.addEventListener("change", function() {

    selectedOption = dropdownD3.value;

    var find1 = "../json/";
    var find2 = ".json";
    var findPath = find1 + selectedOption + find2;

    var jsonLocation = findPath;
    $.getJSON(jsonLocation, function(data) {

        var meal = data.data.meal;
        var transport = data.data.transport;
        var accom = data.data.accom;
        var coffee = data.data.coffee;

        barChartData.datasets[2].data[0] = meal;
        barChartData.datasets[2].data[1] = transport;
        barChartData.datasets[2].data[2] = accom;
        barChartData.datasets[2].data[3] = coffee;
        window.theChart.update();

        average3 = (Number(meal) + Number(transport) + Number(accom) + Number(coffee)) / 4;

        averageCalc();
    });
});


/********** 차트 **********/

/* 차트 값 */
var barChartData = {
    labels: ["한끼 평균 식사비", "1km당 평균 택시비", "한 잔 평균 커피값", "각종 먹거리"],
    datasets: [{
        label: '나라1',
        backgroundColor: "#F87DC0",
        data: [
            0,
            0,
            0,
            0
        ]
    }, {
        label: '나라2',
        backgroundColor: "#83A07F",
        data: [
            0,
            0,
            0,
            0
        ]
    }, {
        label: '나라3',
        backgroundColor: "#F5D8A0",
        data: [
            0,
            0,
            0,
            0
        ]
    }]
};

window.onload = function() {
    var ctx = $('#chart').get(0).getContext("2d");
    window.theChart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {}
    });
}