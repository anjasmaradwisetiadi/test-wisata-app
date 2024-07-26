import dayjs from "dayjs";

export const utilize = {
    truncateWord(word, endString) {
        if(word.length >= endString){
            return word.substring(0, endString)+'...';
        }
        return word
    },

    convertTimeDate(data){
        if(dayjs(data).isValid()){
            const date = data.toString().length === 10 ? data * 1000 : data;
            return dayjs(date).format('DD MMMM YYYY');
        }
        return '';
    },

    convertTimeHours(data){
        if(dayjs(data).isValid()){
            const date = data.toString().length === 10 ? data * 1000 : data;
            return dayjs(date).format('HH:mm');
        }
        return '--:--';
    },

    convertTimeBetween(timeStart, timeCurrent){
        if(dayjs(timeStart).isValid() && dayjs(timeCurrent).isValid()){
            const dateTimeStart = timeStart.toString().length === 10 ? timeStart * 1000 : timeStart;
            const dateTimeCurrent = timeCurrent.toString().length === 10 ? timeCurrent * 1000 : timeCurrent;
            const result = dayjs(dayjs(dateTimeCurrent).diff(dayjs(dateTimeStart))).format('HH:mm:ss')
            return result
        } 
        return '--:--';
    },

    convertDiffTime(startTime, endTime){
        if(dayjs(startTime).isValid() && dayjs(endTime).isValid()){
            const dateStart = startTime.toString().length === 10 ? startTime * 1000 : startTime;
            const dateEnd = endTime.toString().length === 10 ? endTime * 1000 : endTime;
            const differenceTime = dayjs(dateEnd).diff(dayjs(dateStart), 'day')
            if(differenceTime === 0){
                return 'Today';
            } else if (differenceTime === 1){
                return 'Yesterday';
            } else {
                return dayjs(dateEnd).format('YYYY-MM-DD');
            }
        }
        return ''
    }

}