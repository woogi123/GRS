$(".a-exchange").css("color","#0029BA");
/*나라 선택*/
$.ajax({
    type: 'GET',
    async: false,
    url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/exchangeRate',
    dataType: 'json',
    success: function (data) {
        const length = data.data.length;
        for (var i = 0; i < length; i++) {
            var newOp=data.data[i].countryName;
            $("#country2").append("<option value=" + newOp + ">" + newOp + "</option>");
        }
        // $.each(data, function (index, item) {
        //     var newOp = item.countryName;
        //     $("#country2").append("<option value=" + newOp + ">" + newOp + "</option>");

        // });
        console.log("나라데이터 가져오기 성공")
    },
    error: function (request, status, error) {
        //alert("잘못된 요청입니다.", error);
    }
});
/*은행 선택*/
$.getJSON("../json/er_bank.json", function (data) {

    const showData = () => {

        const bankCode = data.data.banks[0].bankCode;
        const bankName = data.data.banks[0].bankName;
        const bank_list = document.getElementById('banks');
        const newOption = document.createElement('option');
        newOption.innerHTML = bankName;
        newOption.value = bankCode;
        bank_list.appendChild(newOption);

    }
    showData();

});


var countryName = $("#country2 option:selected").val();
var bankid = $("#banks option:selected").val();

var bank_er;

/*환율 가져오기*/
/*통화코드 구현되면 가져와서 넣기 */
$(document).ready(function () {
    $("#country2").on('change', function () {
        var countryName = $("#country2 option:selected").val();
        $("#banks option:eq(0)").prop("selected", true);
        //은행 셀렉 값 초기화 해야함 
        console.log(countryName);
        $("#banks").on('change', function () {
            var bankid = $("#banks option:selected").val();
            console.log(bankid);
            $.ajax({
                type: "GET",
                async: false,
                url: `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/exchangeRate/${countryName}/${bankid}`,
                contentType: "application/json",
                success: function (data) {
                    console.log("환율 데이터 가져오기 성공");
                    console.log(data);
                    /*통화코드 가져온 거 p태그 만들어서 넣기 */
                    /*curUnit => 통화코드 */
                    bank_er = data.data.exchangeRate;
                    var code=data.data.curUnit;
                    $(".curUnit").text(code);
                },
                error: function (request, status, error) {
                    //alert(
                        "code:" +
                        request.status +
                        "\n" +
                        "message:" +
                        request.responseText +
                        "\n" +
                        "error:" +
                        error
                    // );
                }
            });

        });

    });

});

/*계산 */
function calculate() {
    let input_krw = document.getElementById("money1").value;
    if (input_krw.length >= 4) { //1000원 단위
        let output_value = (input_krw/1000) * bank_er; //가져온 환율값
        console.log(output_value);

        document.getElementById("money2").value = (output_value).toFixed(2);
    }
    // let input_another = document.getElementById("money2").value;
    // if (input_another.length >= 4) { //1000원 단위
    //     let output_value = input_another/bank_er*1000; //가져온 환율값
    //     console.log(output_value);

    //     document.getElementById("money1").value = (output_value).toFixed(2);
    // }
}








