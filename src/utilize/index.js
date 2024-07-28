import dayjs from "dayjs";

export const utilize = {

    truncateWord(word, endString) {
        if(word.length >= endString){
            return word.substring(0, endString)+'...';
        }
        return word
    },

    emailFormat(data){
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(data)
    },

    convertTimeDate(date){
        if(dayjs(date)){
            return dayjs(date).format('DD MMMM YYYY');
        }
        return '';
    },

    convertTimeHours(data){
        if(dayjs(data).isValid()){
            return dayjs(date).format('HH:mm');
        }
        return '--:--';
    },

}