function validation(){

    this.kiemTraRong = function (value, selectorError, name) {
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống!!!';
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraTatCaKyTu = function(value, selectorError, name){
        var regexLetter = /^[A-Z a-z]+$/;

        if(regexLetter.test(value)){
            document.querySelector(selectorError).innerHTML ='';

            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' không hợp lệ!!!';

        return false;
    }

    this.kiemTraDoDai = function (value, selectorError, minLength, maxLength, name){
        if(value.trim().length < minLength || value.trim().length > maxLength){
            document.querySelector(selectorError).innerHTML =  `${name} phải từ ${minLength} - ${maxLength} ký tự!!!`;
            return false;
        }  
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraGiaTri = function (value, selectorError, minValue, maxValue, name, mess){
        if(value < minValue || value > maxValue){
            document.querySelector(selectorError).innerHTML = `${name} từ ${minValue} - ${maxValue} ${mess}`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}