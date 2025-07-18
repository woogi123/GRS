/********** AJAX **********/
/* 나라 보여주기 */
var average1 = 100000000;
var average2 = 100000000;
var average3 = 100000000;

var wrapCheap = document.querySelector(".wrap_cheap");

const averageCalc = () => {
    /* 나라 html + css */
    let country1 = document.createElement("p");
    country1.setAttribute("class", "cheapCoun");
    country1.innerHTML = "나라1";
    country1.style.color = "#F87DC0";

    let country2 = document.createElement("p");
    country2.setAttribute("class", "cheapCoun");
    country2.innerHTML = "나라2";
    country2.style.color = "#83A07F";

    let country3 = document.createElement("p");
    country3.setAttribute("class", "cheapCoun");
    country3.innerHTML = "나라3";
    country3.style.color = "#F5D8A0";

    var cheacpCountry = 0;

    cheacpCountry = ((average1 < average2) && (average1 < average3)) ? average1 : (((average2 < average3) ? average2 : average3));

    while (wrapCheap.firstChild) {
        wrapCheap.removeChild(wrapCheap.firstChild)
    }

    if (cheacpCountry == average1) {
        if (average1 == average2) {
            if (average2 == average3) {
                wrapCheap.appendChild(country1);
                wrapCheap.appendChild(country2);
                wrapCheap.appendChild(country3);
            } else {
                wrapCheap.appendChild(country1);
                wrapCheap.appendChild(country2);
            }
        } else if (average1 == average3) {
            wrapCheap.appendChild(country1);
            wrapCheap.appendChild(country3);
        } else {
            wrapCheap.appendChild(country1);

        }
    } else if (cheacpCountry == average2) {
        if (average2 == average3) {
            wrapCheap.appendChild(country2);
            wrapCheap.appendChild(country3);
        } else {
            wrapCheap.appendChild(country2);
        }
    } else if (cheacpCountry == average3) {
        wrapCheap.appendChild(country3);

    }
}

/********** 나라 **********/

/* 나라 보여주기 1 */
$.ajax({
    type: 'GET',
    url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/nation',
    success: function(data) {
        const length = data.data.length;

        var i;
        for (i = 0; i < length; i++) {

            const countryName = data.data[i].nationName;
            const code = data.data[i].nationId;

            let countryList = document.querySelector(".country1");
            let country = document.createElement("option");
            country.setAttribute("value", code);
            country.innerHTML = countryName;
            countryList.appendChild(country);
        }
    },
    error: function() {
        // //alert('통신 실패시에만 실행');
        console.log("왜 실패?");
    }
});

var dropdownC1 = document.getElementById("country1");
dropdownC1.addEventListener("change", function() {
    var dv1 = document.getElementById("division1");
    /* 지역 초기화 */
    while (dv1.childElementCount > 1) {
        dv1.removeChild(dv1.lastChild);
    }

    /* 평균 초기화 */
    while (wrapCheap.firstChild) {
        wrapCheap.removeChild(wrapCheap.firstChild)
    }

    average1 = 100000000;
    /* 평균 내기 */
    if (!(((average1 == average2) && (average2 == average3)) && (average1 == 100000000))) {
        averageCalc();
    }

    /* 차트 초기화 */

    barChartData.datasets[0].data[0] = 0;
    barChartData.datasets[0].data[1] = 0;
    barChartData.datasets[0].data[2] = 0;
    barChartData.datasets[0].data[3] = 0;
    window.theChart.update();

    if (dropdownC1.selectedIndex == 0) {
        return;
    }

    /* 지역 찾기 */

    selectedOption = dropdownC1.value;

    $.ajax({
        type: 'GET',
        url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/division/' + selectedOption,
        success: function(data) {

            try {
                const length = data.data.length;

                var i;
                for (i = 0; i < length; i++) {

                    const ADName = data.data[i].adName;
                    const code = data.data[i].adId;

                    let divisionList = document.querySelector(".division1");
                    let division = document.createElement("option");
                    division.setAttribute("value", code);
                    division.innerHTML = ADName;
                    divisionList.appendChild(division);
                }
            } catch {
                let divisionList = document.querySelector(".division1");
                let division = document.createElement("option");
                division.setAttribute("value", "none");
                division.innerHTML = "지역 정보가 없습니다.";
                divisionList.appendChild(division);
            }
        },
        error: function() {
            // //alert('통신 실패시에만 실행');
            console.log("왜 실패?");
        }
    });
});

/* 나라 보여주기 2 */
$.ajax({
    type: 'GET',
    url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/nation',
    success: function(data) {
        const length = data.data.length;

        var i;
        for (i = 0; i < length; i++) {

            const countryName = data.data[i].nationName;
            const code = data.data[i].nationId;

            let countryList = document.querySelector(".country2");
            let country = document.createElement("option");
            country.setAttribute("value", code);
            country.innerHTML = countryName;
            countryList.appendChild(country);
        }
    },
    error: function() {
        // //alert('통신 실패시에만 실행');
        console.log("왜 실패?");
    }
});

var dropdownC2 = document.getElementById("country2");
dropdownC2.addEventListener("change", function() {
    var dv2 = document.getElementById("division2");
    /* 지역 초기화 */
    while (dv2.childElementCount > 1) {
        dv2.removeChild(dv2.lastChild);
    }

    /* 평균 초기화 */
    while (wrapCheap.firstChild) {
        wrapCheap.removeChild(wrapCheap.firstChild)
    }

    average2 = 100000000;
    /* 평균 내기 */
    if (!(((average1 == average2) && (average2 == average3)) && (average1 == 100000000))) {
        averageCalc();
    }

    /* 차트 초기화 */

    barChartData.datasets[1].data[0] = 0;
    barChartData.datasets[1].data[1] = 0;
    barChartData.datasets[1].data[2] = 0;
    barChartData.datasets[1].data[3] = 0;
    window.theChart.update();

    if (dropdownC2.selectedIndex == 0) {
        return;
    }

    /* 지역 찾기 */

    selectedOption = dropdownC2.value;

    $.ajax({
        type: 'GET',
        url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/division/' + selectedOption,
        success: function(data) {
            try {
                const length = data.data.length;

                var i;
                for (i = 0; i < length; i++) {

                    const ADName = data.data[i].adName;
                    const code = data.data[i].adId;

                    let divisionList = document.querySelector(".division2");
                    let division = document.createElement("option");
                    division.setAttribute("value", code);
                    division.innerHTML = ADName;
                    divisionList.appendChild(division);
                }
            } catch {
                let divisionList = document.querySelector(".division2");
                let division = document.createElement("option");
                division.setAttribute("value", "none");
                division.innerHTML = "지역 정보가 없습니다.";
                divisionList.appendChild(division);
            }
        },
        error: function() {
            // //alert('통신 실패시에만 실행');
            console.log("왜 실패?");
        }
    });
});

/* 나라 보여주기 3 */
$.ajax({
    type: 'GET',
    url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/nation',
    success: function(data) {
        const length = data.data.length;

        var i;
        for (i = 0; i < length; i++) {

            const countryName = data.data[i].nationName;
            const code = data.data[i].nationId;

            let countryList = document.querySelector(".country3");
            let country = document.createElement("option");
            country.setAttribute("value", code);
            country.innerHTML = countryName;
            countryList.appendChild(country);
        }
    },
    error: function() {
        // //alert('통신 실패시에만 실행');
        console.log("왜 실패?");
    }
});

var dropdownC3 = document.getElementById("country3");
dropdownC3.addEventListener("change", function() {
    var dv3 = document.getElementById("division3");
    /* 지역 초기화 */
    while (dv3.childElementCount > 1) {
        dv3.removeChild(dv3.lastChild);
    }

    /* 평균 초기화 */
    while (wrapCheap.firstChild) {
        wrapCheap.removeChild(wrapCheap.firstChild)
    }

    average3 = 100000000;
    /* 평균 내기 */
    if (!(((average1 == average2) && (average2 == average3)) && (average1 == 100000000))) {
        averageCalc();
    }

    /* 차트 초기화 */

    barChartData.datasets[2].data[0] = 0;
    barChartData.datasets[2].data[1] = 0;
    barChartData.datasets[2].data[2] = 0;
    barChartData.datasets[2].data[3] = 0;
    window.theChart.update();

    if (dropdownC3.selectedIndex == 0) {
        return;
    }

    /* 지역 찾기 */

    selectedOption = dropdownC3.value;

    $.ajax({
        type: 'GET',
        url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/division/' + selectedOption,
        success: function(data) {
            try {
                const length = data.data.length;

                var i;
                for (i = 0; i < length; i++) {

                    const ADName = data.data[i].adName;
                    const code = data.data[i].adId;

                    let divisionList = document.querySelector(".division3");
                    let division = document.createElement("option");
                    division.setAttribute("value", code);
                    division.innerHTML = ADName;
                    divisionList.appendChild(division);
                }

            } catch {
                let divisionList = document.querySelector(".division3");
                let division = document.createElement("option");
                division.setAttribute("value", "none");
                division.innerHTML = "지역 정보가 없습니다.";
                divisionList.appendChild(division);
            }
        },
        error: function() {
            // //alert('통신 실패시에만 실행');
            console.log("왜 실패?");
        }
    });
});


/********** 물가 **********/

/* 물가 찾기1 */
var dropdownD1 = document.getElementById("division1");
dropdownD1.addEventListener("change", function() {

    /* 차트, 물가 초기화 */
    barChartData.datasets[0].data[0] = 0;
    barChartData.datasets[0].data[1] = 0;
    barChartData.datasets[0].data[2] = 0;
    barChartData.datasets[0].data[3] = 0;
    window.theChart.update();
    average1 = 100000000;

    if (!(((average1 == average2) && (average2 == average3)) && (average1 == 100000000))) {
        averageCalc();
    }

    if (dropdownD1.selectedIndex == 0) {
        return;
    }

    if (dropdownD1.value == "none") {
        return;
    }

    selectedOption = dropdownD1.value;
    $.ajax({
        type: 'GET',
        url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/' + selectedOption,
        success: function(data) {
            // //alert('통신 성공시에만 실행');
            console.log("성공");

            var meal = data.data.meal;
            var taxi = data.data.taxi;
            var coffee = data.data.coffee;
            var rice = data.data.rice;

            barChartData.datasets[0].data[0] = meal;
            barChartData.datasets[0].data[1] = taxi;
            barChartData.datasets[0].data[2] = coffee;
            barChartData.datasets[0].data[3] = rice;
            window.theChart.update();

            average1 = (Number(meal) + Number(taxi) + Number(coffee) + Number(rice)) / 4;

            averageCalc();
        },
        error: function() {
            // //alert('통신 실패시에만 실행');
            console.log("왜 실패?");
        }
    });
});

/* 물가 찾기2 */
var dropdownD2 = document.getElementById("division2");
dropdownD2.addEventListener("change", function() {
    /* 차트 초기화 */
    barChartData.datasets[1].data[0] = 0;
    barChartData.datasets[1].data[1] = 0;
    barChartData.datasets[1].data[2] = 0;
    barChartData.datasets[1].data[3] = 0;
    window.theChart.update();
    average2 = 100000000;

    if (!(((average1 == average2) && (average2 == average3)) && (average1 == 100000000))) {
        averageCalc();
    }

    if (dropdownD2.selectedIndex == 0) {
        return;
    }

    if (dropdownD2.value == "none") {
        return;
    }

    if (dropdownD2.selectedIndex == 0) {
        return;
    }

    selectedOption = dropdownD2.value;
    $.ajax({
        type: 'GET',
        url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/' + selectedOption,
        success: function(data) {
            var meal = data.data.meal;
            var taxi = data.data.taxi;
            var coffee = data.data.coffee;
            var rice = data.data.rice;

            barChartData.datasets[1].data[0] = meal;
            barChartData.datasets[1].data[1] = taxi;
            barChartData.datasets[1].data[2] = coffee;
            barChartData.datasets[1].data[3] = rice;
            window.theChart.update();

            average2 = (Number(meal) + Number(taxi) + Number(coffee) + Number(rice)) / 4;

            averageCalc();
        },
        error: function() {
            // //alert('통신 실패시에만 실행');
            console.log("왜 실패?");
        }
    });
});

/* 물가 찾기3 */
var dropdownD3 = document.getElementById("division3");
dropdownD3.addEventListener("change", function() {
    /* 차트 초기화 */
    barChartData.datasets[2].data[0] = 0;
    barChartData.datasets[2].data[1] = 0;
    barChartData.datasets[2].data[2] = 0;
    barChartData.datasets[2].data[3] = 0;
    window.theChart.update();
    average3 = 100000000;

    if (!(((average1 == average2) && (average2 == average3)) && (average1 == 100000000))) {
        averageCalc();
    }

    if (dropdownD3.selectedIndex == 0) {
        return;
    }

    if (dropdownD3.value == "none") {
        return;
    }

    if (dropdownD3.selectedIndex == 0) {
        return;
    }

    selectedOption = dropdownD3.value;
    $.ajax({
        type: 'GET',
        url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/' + selectedOption,
        success: function(data) {
            var meal = data.data.meal;
            var taxi = data.data.taxi;
            var coffee = data.data.coffee;
            var rice = data.data.rice;

            barChartData.datasets[2].data[0] = meal;
            barChartData.datasets[2].data[1] = taxi;
            barChartData.datasets[2].data[2] = coffee;
            barChartData.datasets[2].data[3] = rice;
            window.theChart.update();

            average3 = (Number(meal) + Number(taxi) + Number(coffee) + Number(rice)) / 4;

            averageCalc();
        },
        error: function() {
            // //alert('통신 실패시에만 실행');
            console.log("왜 실패?");
        }
    });
});


/********** 차트 **********/

/* 차트 값 */
var barChartData = {
    labels: ["한끼 평균 식사비", "1km당 평균 택시비", "한 잔 평균 커피값", "각종 먹거리"],
    datasets: [{
        label: '나라1',
        backgroundColor: "#F87DC0",
        maxBarThickness: 50,
        borderRadius: 10,
        data: [
            0,
            0,
            0,
            0
        ]
    }, {
        label: '나라2',
        backgroundColor: "#83A07F",
        maxBarThickness: 50,
        borderRadius: 10,
        data: [
            0,
            0,
            0,
            0
        ]
    }, {
        label: '나라3',
        backgroundColor: "#F5D8A0",
        maxBarThickness: 50,
        borderRadius: 10,
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
        options: {
            responsive: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'rgba(12, 13, 13, 1)',
                        font: {
                            size: 24
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        beginAtZero: true,
                        font: {
                            size: 20
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}



/////////////////////////////////////////////////////////////////

// $.ajax({
//     type: 'GET',
//     url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/compare/nation',
//     success: function(data) {
//         //alert('통신 성공시에만 실행');
//         console.log("성공");
//     },
//     error: function() {
//         //alert('통신 실패시에만 실행');
//         console.log("왜 실패?");
//     }
// });

// var average1 = 100000000;
// var average2 = 100000000;
// var average3 = 100000000;

// var wrapCheap = document.querySelector(".wrap_cheap");

// const averageCalc = () => {
//     /* 나라 html + css */
//     let country1 = document.createElement("p");
//     country1.setAttribute("class", "cheapCoun");
//     country1.innerHTML = "나라1";
//     country1.style.color = "#F87DC0";

//     let country2 = document.createElement("p");
//     country2.setAttribute("class", "cheapCoun");
//     country2.innerHTML = "나라2";
//     country2.style.color = "#83A07F";

//     let country3 = document.createElement("p");
//     country3.setAttribute("class", "cheapCoun");
//     country3.innerHTML = "나라3";
//     country3.style.color = "#F5D8A0";

//     var cheacpCountry = 0;

//     cheacpCountry = ((average1 < average2) && (average1 < average3)) ? average1 : (((average2 < average3) ? average2 : average3));

//     while (wrapCheap.firstChild) {
//         wrapCheap.removeChild(wrapCheap.firstChild)
//     }

//     if (cheacpCountry == average1) {
//         if (average1 == average2) {
//             if (average2 == average3) {
//                 wrapCheap.appendChild(country1);
//                 wrapCheap.appendChild(country2);
//                 wrapCheap.appendChild(country3);
//             } else {
//                 wrapCheap.appendChild(country1);
//                 wrapCheap.appendChild(country2);
//             }
//         } else if (average1 == average3) {
//             wrapCheap.appendChild(country1);
//             wrapCheap.appendChild(country3);
//         } else {
//             wrapCheap.appendChild(country1);

//         }
//     } else if (cheacpCountry == average2) {
//         if (average2 == average3) {
//             wrapCheap.appendChild(country2);
//             wrapCheap.appendChild(country3);
//         } else {
//             wrapCheap.appendChild(country2);
//         }
//     } else if (cheacpCountry == average3) {
//         wrapCheap.appendChild(country3);

//     }
// }

// /********** 나라 **********/

// /* 나라 보여주기 1 */
// var jsonLocation = "../json/countryList.json";
// $.getJSON(jsonLocation, function(data) {
//     const length = data.data.length;

//     var i;
//     for (i = 0; i < length; i++) {

//         const countryName = data.data[i].countryName;
//         const code = data.data[i].code;

//         let countryList = document.querySelector(".country1");
//         let country = document.createElement("option");
//         country.setAttribute("value", code);
//         country.innerHTML = countryName;
//         countryList.appendChild(country);
//     }
// });

// var dropdownC1 = document.getElementById("country1");
// dropdownC1.addEventListener("change", function() {
//     var dv1 = document.getElementById("division1");
//     /* 지역 초기화 */
//     while (dv1.childElementCount > 1) {
//         dv1.removeChild(dv1.lastChild);
//     }

//     /* 평균 초기화 */
//     while (wrapCheap.firstChild) {
//         wrapCheap.removeChild(wrapCheap.firstChild)
//     }

//     average1 = 100000000;
//     /* 평균 내기 */
//     if (!(((average1 == average2) && (average2 == average3)) && (average1 == 100000000))) {
//         averageCalc();
//     }

//     /* 차트 초기화 */

//     barChartData.datasets[0].data[0] = 0;
//     barChartData.datasets[0].data[1] = 0;
//     barChartData.datasets[0].data[2] = 0;
//     barChartData.datasets[0].data[3] = 0;
//     window.theChart.update();

//     if (dropdownC1.selectedIndex == 0) {
//         return;
//     }

//     /* 지역 찾기 */

//     selectedOption = dropdownC1.value;

//     var find1 = "../json/";
//     var find2 = ".json";
//     var findPath = find1 + selectedOption + find2;

//     var jsonLocation = findPath;
//     $.getJSON(jsonLocation, function(data) {
//         const length = data.data.length;

//         var i;
//         for (i = 0; i < length; i++) {

//             const ADName = data.data[i].ADName;
//             const code = data.data[i].code;

//             let divisionList = document.querySelector(".division1");
//             let division = document.createElement("option");
//             division.setAttribute("value", code);
//             division.innerHTML = ADName;
//             divisionList.appendChild(division);
//         }
//     });
// });

// /* 나라 보여주기 2 */
// var jsonLocation = "../json/countryList.json";
// $.getJSON(jsonLocation, function(data) {
//     const length = data.data.length;

//     var i;
//     for (i = 0; i < length; i++) {

//         const countryName = data.data[i].countryName;
//         const code = data.data[i].code;

//         let countryList = document.querySelector(".country2");
//         let country = document.createElement("option");
//         country.setAttribute("value", code);
//         country.innerHTML = countryName;
//         countryList.appendChild(country);
//     }
// });

// var dropdownC2 = document.getElementById("country2");
// dropdownC2.addEventListener("change", function() {
//     var dv2 = document.getElementById("division2");
//     /* 지역 초기화 */
//     while (dv2.childElementCount > 1) {
//         dv2.removeChild(dv2.lastChild);
//     }

//     /* 평균 초기화 */
//     while (wrapCheap.firstChild) {
//         wrapCheap.removeChild(wrapCheap.firstChild)
//     }

//     average2 = 100000000;
//     /* 평균 내기 */
//     if (!(((average1 == average2) && (average2 == average3)) && (average1 == 100000000))) {
//         averageCalc();
//     }

//     /* 차트 초기화 */

//     barChartData.datasets[1].data[0] = 0;
//     barChartData.datasets[1].data[1] = 0;
//     barChartData.datasets[1].data[2] = 0;
//     barChartData.datasets[1].data[3] = 0;
//     window.theChart.update();

//     if (dropdownC2.selectedIndex == 0) {
//         return;
//     }

//     /* 지역 찾기 */

//     selectedOption = dropdownC2.value;

//     var find1 = "../json/";
//     var find2 = ".json";
//     var findPath = find1 + selectedOption + find2;

//     var jsonLocation = findPath;
//     $.getJSON(jsonLocation, function(data) {
//         const length = data.data.length;

//         var i;
//         for (i = 0; i < length; i++) {

//             const ADName = data.data[i].ADName;
//             const code = data.data[i].code;

//             let divisionList = document.querySelector(".division2");
//             let division = document.createElement("option");
//             division.setAttribute("value", code);
//             division.innerHTML = ADName;
//             divisionList.appendChild(division);
//         }
//     });
// });

// /* 나라 보여주기 3 */
// var jsonLocation = "../json/countryList.json";
// $.getJSON(jsonLocation, function(data) {
//     const length = data.data.length;

//     var i;
//     for (i = 0; i < length; i++) {

//         const countryName = data.data[i].countryName;
//         const code = data.data[i].code;

//         let countryList = document.querySelector(".country3");
//         let country = document.createElement("option");
//         country.setAttribute("value", code);
//         country.innerHTML = countryName;
//         countryList.appendChild(country);
//     }
// });

// var dropdownC3 = document.getElementById("country3");
// dropdownC3.addEventListener("change", function() {
//     var dv3 = document.getElementById("division3");
//     /* 지역 초기화 */
//     while (dv3.childElementCount > 1) {
//         dv3.removeChild(dv3.lastChild);
//     }

//     /* 평균 초기화 */
//     while (wrapCheap.firstChild) {
//         wrapCheap.removeChild(wrapCheap.firstChild)
//     }

//     average3 = 100000000;
//     /* 평균 내기 */
//     if (!(((average1 == average2) && (average2 == average3)) && (average1 == 100000000))) {
//         averageCalc();
//     }

//     /* 차트 초기화 */

//     barChartData.datasets[2].data[0] = 0;
//     barChartData.datasets[2].data[1] = 0;
//     barChartData.datasets[2].data[2] = 0;
//     barChartData.datasets[2].data[3] = 0;
//     window.theChart.update();

//     if (dropdownC3.selectedIndex == 0) {
//         return;
//     }

//     /* 지역 찾기 */

//     selectedOption = dropdownC3.value;

//     var find1 = "../json/";
//     var find2 = ".json";
//     var findPath = find1 + selectedOption + find2;

//     var jsonLocation = findPath;
//     $.getJSON(jsonLocation, function(data) {
//         const length = data.data.length;

//         var i;
//         for (i = 0; i < length; i++) {

//             const ADName = data.data[i].ADName;
//             const code = data.data[i].code;

//             let divisionList = document.querySelector(".division3");
//             let division = document.createElement("option");
//             division.setAttribute("value", code);
//             division.innerHTML = ADName;
//             divisionList.appendChild(division);
//         }
//     });
// });


// /********** 물가 **********/

// /* 물가 찾기1 */
// var dropdownD1 = document.getElementById("division1");
// dropdownD1.addEventListener("change", function() {
//     /* 차트, 물가 초기화 */
//     barChartData.datasets[0].data[0] = 0;
//     barChartData.datasets[0].data[1] = 0;
//     barChartData.datasets[0].data[2] = 0;
//     barChartData.datasets[0].data[3] = 0;
//     window.theChart.update();
//     average1 = 100000000;
//     averageCalc();

//     if (dropdownD1.selectedIndex == 0) {
//         return;
//     }

//     selectedOption = dropdownD1.value;

//     var find1 = "../json/";
//     var find2 = ".json";
//     var findPath = find1 + selectedOption + find2;

//     var jsonLocation = findPath;
//     $.getJSON(jsonLocation, function(data) {

//         var meal = data.data.meal;
//         var transport = data.data.transport;
//         var accom = data.data.accom;
//         var coffee = data.data.coffee;

//         barChartData.datasets[0].data[0] = meal;
//         barChartData.datasets[0].data[1] = transport;
//         barChartData.datasets[0].data[2] = accom;
//         barChartData.datasets[0].data[3] = coffee;
//         window.theChart.update();

//         average1 = (Number(meal) + Number(transport) + Number(accom) + Number(coffee)) / 4;

//         averageCalc();
//     });
// });

// /* 물가 찾기2 */
// var dropdownD2 = document.getElementById("division2");
// dropdownD2.addEventListener("change", function() {
//     /* 차트 초기화 */
//     barChartData.datasets[1].data[0] = 0;
//     barChartData.datasets[1].data[1] = 0;
//     barChartData.datasets[1].data[2] = 0;
//     barChartData.datasets[1].data[3] = 0;
//     window.theChart.update();
//     average2 = 100000000;
//     averageCalc();

//     if (dropdownD2.selectedIndex == 0) {
//         return;
//     }

//     selectedOption = dropdownD2.value;

//     var find1 = "../json/";
//     var find2 = ".json";
//     var findPath = find1 + selectedOption + find2;

//     var jsonLocation = findPath;
//     $.getJSON(jsonLocation, function(data) {

//         var meal = data.data.meal;
//         var transport = data.data.transport;
//         var accom = data.data.accom;
//         var coffee = data.data.coffee;

//         barChartData.datasets[1].data[0] = meal;
//         barChartData.datasets[1].data[1] = transport;
//         barChartData.datasets[1].data[2] = accom;
//         barChartData.datasets[1].data[3] = coffee;
//         window.theChart.update();

//         average2 = (Number(meal) + Number(transport) + Number(accom) + Number(coffee)) / 4;

//         averageCalc();
//     });
// });

// /* 물가 찾기3 */
// var dropdownD3 = document.getElementById("division3");
// dropdownD3.addEventListener("change", function() {
//     /* 차트 초기화 */
//     barChartData.datasets[2].data[0] = 0;
//     barChartData.datasets[2].data[1] = 0;
//     barChartData.datasets[2].data[2] = 0;
//     barChartData.datasets[2].data[3] = 0;
//     window.theChart.update();
//     average3 = 100000000;
//     averageCalc();

//     if (dropdownD3.selectedIndex == 0) {
//         return;
//     }

//     selectedOption = dropdownD3.value;

//     var find1 = "../json/";
//     var find2 = ".json";
//     var findPath = find1 + selectedOption + find2;

//     var jsonLocation = findPath;
//     $.getJSON(jsonLocation, function(data) {

//         var meal = data.data.meal;
//         var transport = data.data.transport;
//         var accom = data.data.accom;
//         var coffee = data.data.coffee;

//         barChartData.datasets[2].data[0] = meal;
//         barChartData.datasets[2].data[1] = transport;
//         barChartData.datasets[2].data[2] = accom;
//         barChartData.datasets[2].data[3] = coffee;
//         window.theChart.update();

//         average3 = (Number(meal) + Number(transport) + Number(accom) + Number(coffee)) / 4;

//         averageCalc();
//     });
// });


// /********** 차트 **********/

// /* 차트 값 */
// var barChartData = {
//     labels: ["한끼 평균 식사비", "1km당 평균 택시비", "한 잔 평균 커피값", "각종 먹거리"],
//     datasets: [{
//         label: '나라1',
//         backgroundColor: "#F87DC0",
//         data: [
//             0,
//             0,
//             0,
//             0
//         ]
//     }, {
//         label: '나라2',
//         backgroundColor: "#83A07F",
//         data: [
//             0,
//             0,
//             0,
//             0
//         ]
//     }, {
//         label: '나라3',
//         backgroundColor: "#F5D8A0",
//         data: [
//             0,
//             0,
//             0,
//             0
//         ]
//     }]
// };

// window.onload = function() {
//     var ctx = $('#chart').get(0).getContext("2d");
//     window.theChart = new Chart(ctx, {
//         type: 'bar',
//         data: barChartData,
//         options: {}
//     });
// }