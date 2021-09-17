const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name =document.getElementById('city_name');
const real_temp =document.getElementById('real_temp');
const temp_status =document.getElementById('temp_status');
const day = document.getElementById('day');
const datahide = document.querySelector('.middle_layer');
const temp_min =document.getElementById('temp_min');
const temp_max =document.getElementById('temp_max');

// console.log(cityName);
const getInfo = async(event)=>{
    event.preventDefault();
    
    let city_value = cityName.value;
    if(city_value==""){
        city_name.innerText=`Please enter city name`;
        datahide.classList.add('data_hide');
        
    }else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city_value}&units=metric&appid=38cd7f8b3899bb1e723b2811ceb41e8d`;
            const response = await fetch(url);
            //write api data into html
            const data =  await response.json();
            const arrData =[data];
            real_temp.innerText = arrData[0].main.temp;
            city_name.innerText = `${arrData[0].name} ${arrData[0].sys.country}`;
            temp_min.innerText = `${arrData[0].main.temp_min}`;
            temp_max.innerText = `${arrData[0].main.temp_max}`;
            

            
            // to fill icon in temp status
            const tempStatus = arrData[0].weather[0].main;
            if (tempStatus == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #2e96dc'></i>"
            } else if (tempStatus == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #2e96dc'></i>"
            } else if (tempStatus == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-showers-heavy' style='color: #2e96dc'></i>"
            } else if (tempStatus == "Haze") {
                temp_status.innerHTML = "<i class='fas fa-smog' style='color: #2e96dc'></i>"
            } else {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #2e96dc'></i>"
            }
            datahide.classList.remove('data_hide');
        }catch{
        city_name.innerText=`please enter correct city name`;
        datahide.classList.add('data_hide');
    }
    }

}
// get date 
const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tues";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    let currentTime = new Date();
    let week = weekday[currentTime.getDay()]
    // console.log(week);
    return week

}
getCurrentDay();
const getCurrentTime = () => {
    var Months = ["Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"]
    var now = new Date();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hrs = now.getHours();
    var mins = now.getMinutes();
    var peroid = "AM";
    if (hrs > 11) {
        peroid = "PM";
        if (hrs > 12) hrs = hrs - 12;
    }
    if (mins < 10) {
        mins = "0" + mins
    }
    let month_ = Months[month]
    // console.log(month_, date, "|", hrs, ":", mins, peroid);
    return `${date},${month_} | ${hrs}:${mins} ${peroid}`;
}
getCurrentTime();
day.innerHTML = getCurrentDay() + "  |  " + getCurrentTime();
submitBtn.addEventListener('click',getInfo)