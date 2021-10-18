<template>
<section class="content_block">
  <h1>{{item.name}}</h1>
  <hr>
  <div class="item_data">
    <div class="item_image" :style="item_image"></div>
    <div class="item_desc">
      <div class="description">{{item.description}}</div>
      <div class="price">{{item.price | price}} <span></span></div>
    </div>
  </div>

  <hr>
<div class="footer">

  <table class="period">
    <tbody>
    <tr> <td class="calendar" rowspan="2"></td><td>Предложение действует до</td></tr>
    <tr><td class="dates">{{date_normalized}}</td></tr>
    </tbody>
  </table>
  <table class="countdown">
    <caption>До окончания осталось:</caption>
    <tbody>
    <tr>
      <td>{{days}}</td><td>{{hours}}</td><td>{{mins}}</td><td>{{secs}}</td>
    </tr>
    <tr>
      <td>Дни</td><td>Часы</td><td>Минуты</td><td>Секунды</td>
    </tr>
    </tbody>

  </table>
  <div class="btn-std" @click="$router.push('/catalog/item/'+item.code)">Подробнее</div>
</div>

</section>
</template>

<script>
export default {
  props:[
    'item'
  ],
  name: "ActionComponentTypeA",
  data(){
    return{
        current_date:'',
        expired:false,
        time_diff:0,
        end_date:'2021-09-29',
      days:0,
      hours:0,
      mins:0,
      secs:0,
      date_normalized:''

    }
  },
  computed:{
  item_image(){
    return  "background-image: url(" + this.item.image + ")"
  }

  },
  mounted() {

    this.getTimer(this.item.p_value)

    this.date_normalized = new Date(this.item.p_value).toLocaleDateString()

  },
  methods:{
      getTimer(date){
        this.expired = new Date(date).getTime()
        let timer = setInterval(()=>{
          this.current_date = new Date().getTime();

          this.time_diff = Number(this.expired) - Number(this.current_date);
          if (this.time_diff >= 0) {


            this.days = Math.floor(this.time_diff / (1000 * 60 * 60 * 24))
            this.hours = ("0" + Math.floor((this.time_diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
            this.mins = ("0" + Math.floor((this.time_diff % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
            this.secs = ("0" + Math.floor((this.time_diff % (1000 * 60)) / 1000)).slice(-2);
          }

        }, 1000)


      }

  }

}
</script>

<style scoped>
.item_data{
  display: inline-flex;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
columns: 2;
}
.item_image{
  width: 170px;
  height: 170px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  padding-left: 80px;
  padding-right: 80px;
}
.item_desc{
  width: 400px;
}
td{
  text-align: center;
}
.countdown tr:first-child td{
  background-color: rgba(255,73,0, 1);
  color:white;
  font-size: 1.2rem;
}
caption{
  font-size: 0.9rem;
}
 .countdown tr:last-child td{
  font-size: 0.8rem;
   margin-top: -5px;
}
.countdown{

}
.footer{

  width: 100%;
  columns: 3;
}
.calendar{
  background-image: url("https://vodovoz.ru/bitrix/templates/vodovoz/images/calendar-icon.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 45px;
  height: 45px;

}
.dates{
  font-size: 2rem;
}
.price{
  margin-top: 20px;
  font-size: 2.5rem;
  font-weight: bold;
  color: rgb(255,73,0);

}
.price span{
  color: black;
  font-size: 1.2rem;
  font-weight: normal;
}
</style>