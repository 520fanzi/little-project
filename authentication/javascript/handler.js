window.onload=function () {
    var shenfen = document.getElementById("shenfen");
    var formObj = document.forms["mine"];
    shenfen.onblur = function () {
        let idCard = this.value;
        idCardhandler(formObj,idCard);
    };
    function idCardhandler(formObj,idCard){
        let flag = cheakid(idCard);
        if(!flag){
            alert("请输入正确的身份证号码！")
            // return false;
        }
        let areaCode=idCard.substr(0,6);
        let area="未知地区";
        for(let item in areaCodeArr)
        {
            if(areaCode===areaCodeArr[item].areaCode){
                area=areaCodeArr[item].detail;
                break;
            }
        }
        formObj.area.value=area;
        let birthday =[];
        birthday[0]=parseInt(idCard.substr(6,4));
        birthday[1]=parseInt(idCard.substr(10,2));
        birthday[2]=parseInt(idCard.substr(12,2));
        formObj.birthday.value=birthday[0]+"-"+birthday[1]+"-"+birthday[2];
        let genderArry=["男","女"];
        let gender=genderArry[parseInt(idCard.substr(16,1))%2];
        // formObj.gender.value=gender;
        let genderArr=formObj.gender;
        for(let i in genderArr)
        {
            if(gender===genderArr[i].value){
                genderArr[i].checked=true;
            }
        }
    }
    function cheakid(str) {
        if(str.length!==18){
            return false
        }
            str =str.toUpperCase();//把字符串转换成大写
            var newStr=str.substr(0,17);
            //加权因子
            var wi= [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var sum=0;
            var CodeArr = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            for(let i=0;i<17;i++){
                sum+=parseInt(newStr[i])*wi[i];
            }
            var codeIndex=sum%11;
            var code=CodeArr[codeIndex];
            return newStr=newStr+" "+code;
            // if(newStr===str){
            //     return ture;
            // }

    }
};
