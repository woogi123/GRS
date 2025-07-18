/*나라선택*/
$.getJSON("../json/er_country.json", function (data) {
    const length = data.data.countries.length;
    var i;
    for (i = 0; i < length; i++) {

        const showData = () => {

            const countryCode = data.data.countries[i].countryCode;
            const countryName = data.data.countries[i].countryName;
            const country_list=document.getElementById('country2');
            const newOption=document.createElement('option');
            newOption.value=countryCode;
            newOption.innerHTML=countryName;
            country_list.appendChild(newOption);

        }
        showData();
    }
});

/*은행선택--->통신되면 ajax사용*/
$.getJSON("../json/er_bank.json", function (data) {
    const length = data.data.banks.length;
    var i;
    for (i = 0; i < length; i++) {

        const showData = () => {

            const bankCode = data.data.banks[i].bankCode;
            const bankName = data.data.banks[i].bankName;
            const bank_list=document.getElementById('banks');
            const newOption=document.createElement('option');
            newOption.innerHTML=bankName;
            newOption.value=bankCode;
            bank_list.appendChild(newOption);
            

        }
        showData();
    }
});

/*********ajax**************/
/*나라 선택*/
// $.ajax({
//     type:'GET',
//     url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/exchangeRate/country',
//     dataType:'json',
//     success : function(data){
//       console.log(data);
//       $.each(data, function (index, item) {
//         console.log(item.contryName)
//         var $div = $("<option>").addClass("wrap");
//         var $contryName = $("<div>")
//           .addClass("contryName")
//           .text(item.contryName);
//         var $exchangeRate = $("<div>")
//           .addClass("exchangeRate")
//           .text(item.exchangeRate);
//         $div.append($contryName).append($exchangeRate);
//         $("#today-exchangeRate").append($div);
//       });   
//       },
//       error: function(request, status, error){
//         alert("잘못된 요청입니다.",error);
//       }
//   })

/*은행 선택 */
// $.ajax({
//     type:'GET',
//     // url: 'http://grishare.ap-northeast-2.elasticbeanstalk.com/api/exchangeRate/bank',
//     success : function(data){
//         console.log(data);
//       },
//       error: function(request, status, error){
//         alert("잘못된 요청입니다.",error);
//       }
//   })
// var countryName;
// var bankId;
// countryName=$("select[name=country2]").val();
// bankId=$("#banks").val();


/*선택된 나라와 은행의 환율 받아와야함 */
/*환율계산*/
/*1000원 단위 */


function calculate(){
  let input_value=document.getElementById("money1").value;
    if(input_value.length>=4){
        let output_value=input_value*9.14 //가져온 환율값
        console.log(output_value);
    
        document.getElementById("money2").value=output_value;
    }

    // $.ajax({
    //     type: "GET",
    //     url: `http://grishare.ap-northeast-2.elasticbeanstalk.com/api/exchangeRate?country-id=1?bank-id=ECA`,
    //     contentType: "application/json",
    //     success: function (data) {
    //       console.log("환율 데이터 가져오기 성공");
    //       console.log(data);
    //       let input_value=document.getElementById("money1").value;
    //       console.log(input_value);
    //       let output_value=input_value*9.14 //가져온 환율값
    //       console.log(output_value);
    
    //       document.getElementById("money2").value=output_value;
    //     },
    //     error: function (request, status, error) {
    //       alert(
    //         "code:" +
    //           request.status +
    //           "\n" +
    //           "message:" +
    //           request.responseText +
    //           "\n" +
    //           "error:" +
    //           error
    //       );
    //     },
    //   });
}
 
    
