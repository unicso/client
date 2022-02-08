<template>
<section class="content_block base_shadow about_us">
  <h1 v-if="2==3">О Компании</h1>
  <section class="first_block">
    <logo-animated :width="'200px'" :height="'200px'"/>
    <div class="text">
      <b>Ю</b><b>Н</b><b>И</b><b>К</b><b>С</b><b>О</b>
    </div>
  </section>

    <section class="animate_onscroll" :ref="animated">
      <img class="first content_block" src="/files/client/images/about/zag1.jpg" >
      <p class="second">
        Компания ООО «Юниксо» осуществляет коммерческую деятельность, ориентированную на предоставление заказчикам комплексных решений по планированию, разработке, обеспечению и управлению процессами закупочной деятельности организаций. Все услуги нашей Компании разделены на функциональные группы и оказываются в соответствии с требованиями заказчиков.  Работая в постоянном диалоге с клиентами, мы формируем и настраиваем индивидуальную систему сервиса, которая позволяет нашим заказчикам оптимизировать свои затраты, сделать их максимально прозрачными, прогнозируемыми и управляемыми.
      </p>

    </section>


    <h2>Основные направления деятельности нашей Компании:</h2><br>
    <section class="animate_onscroll"  ref="a1">



    <p class="side_left">
    ✓  организация системы снабжения предприятий и ее товарное обеспечение. В ассортименте представлены различные группы товаров, полностью удовлетворяющие потребности как небольших офисов, так и крупных предприятий, в их числе: бумага для офисной техники, канцелярские и хозяйственные товары, уборочный инвентарь, бытовая и профессиональная химия, продукты питания (офисный ассортимент), мебель, бытовая и офисная техника, расходные материалы, спецодежда и др.<br>
    </p>
      <img class="side_right content_block" src="/files/client/images/business_type/logistic.jpeg" >
  </section>

  <section class="animate_onscroll"  ref="a2">
    <img class="fade_in content_block" src="/files/client/images/business_type/uslugi.jpg" >
    <p class="side_right">
    ✓ производство и дистрибьюция профессиональных моющих средств, бытовой и промышленной химии, оптовая продажа дезинфицирующих средств, специальной одежды и средств индивидуальной защиты.<br>
    </p>
  </section>

  <section class="animate_onscroll"  ref="a3">

    <p class="fade_in">
    ✓ оснащение сегмента HoReCa (Хорека) профессиональными моющими и дезинфицирующими средствами, уборочным инвентарем, санитарно-гигиенической и текстильной продукцией.<br>
    </p>
    <img class="side_right content_block" src="/files/client/images/business_type/horeka.jpg" >
  </section>

  <section class="animate_onscroll"  ref="a4">

    <img class="side_left content_block" src="/files/client/images/business_type/medecine.jpg" >
    <p class="side_right">
    ✓ комплексное оснащение медицинских учреждений и учреждений образования системами освещения, мебелью в т.ч. по индивидуальному проектированию, жалюзи и текстильная продукция, медицинское и лабораторное оборудование, оборудование для учебных лабораторий, учебных классов, оборудование для пищеблоков, мультимедийное оснащение и др.<br>
    </p>
  </section>
  <p class="animated_class_text">
    <ins>Деятельность Компании, осуществляемая в рамках отдельных проектов:</ins><br>
    ✓ обслуживание офисной техники (копировально-множительная, печатающая, бытовая)<br>
    ✓ организация складских пространств под потребности заказчика: оснащение стеллажами, складской техникой. Продажа, аренда и обслуживание печатающей и сканирующей техники для склада.<br>
    ✓ аутсорсинговые услуги по складскому хранению, обработке грузов и их доставке.<br>
    ✓ проектирование, установка и обслуживание систем видеонаблюдения, охранно-пожарной сигнализации, СКУД<br>
    ✓ эксплуатация, обслуживание инженерных систем зданий и сооружений<br>
  </p>
  <p class="animated_class_text">
    В своей работе мы ориентируемся на потребности наших клиентов, постоянно изучаем все изменения рынка сервисных услуг и оперативно внедряем новые продукты и технологии. Мы строим партнерские отношения с ведущими отечественными и иностранными производителями для максимального соответствия нашего предложения требованиям рынка и клиентов.  Современные технологии инжиниринга, быстрая и четкая координация работы различных подразделений, долгосрочные связи с надежными партнерами и уникальный опыт совместно реализованных проектов скрепляет в единое целое ваши задачи и наши решения, делая результат взаимодействия максимально качественным.<br>
    Мы ценим каждого нашего клиента и всегда стремимся к продуктивному, долгосрочному сотрудничеству, основанному на сбалансированном сочетание ценовой политики и качества услуг.<br>
    Мы всегда берем на себя ответственность за свою работу и гордимся ее результатами.<br>


  </p>


</section>
</template>

<script>
import LogoAnimated from "../common/LogoAnimated";
export default {
  name: "AboutUs",
  components: {LogoAnimated},

  data(){
    return{
      animated:[]

    }
  },
  mounted() {
    this.animated = [this.$refs.a1, this.$refs.a2, this.$refs.a3, this.$refs.a4]
    this.animateOnScroll();

    window.addEventListener('scroll', this.animateOnScroll);
  },
  methods:{

    animateOnScroll(){


      for(let index =0; index<this.animated.length; index++ )
      {
        const animateItem = this.animated[index];
        const animateItemHeight = animateItem.offsetHeight;
        const animateItemOffset = this.offset(animateItem).top;
        const animateStart = 4;
        const pageOffset = window.pageYOffset;


        let animateItemPoint = window.innerHeight - animateItemHeight/ animateStart

        if(animateItemHeight > window.innerHeight){
          animateItemPoint = window.innerHeight - animateItemHeight/ animateStart
        }



        if(pageOffset>(animateItemOffset - animateItemPoint) && pageOffset < (animateItemOffset+animateItemHeight))
        {
          animateItem.classList.add('active')


        }




      }


      window.onscroll = () => {

    }
  },

    offset(el){
      const rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

  },



}
</script>

<style scoped>
section{
  padding: 20px;
}
.content_block{
  overflow: hidden;
}
p{
  font-size: 1.2rem;
}
h2{

  font-size: 1.3rem;
  text-align: center;
}
h1{
  font-size: 2rem;
}

.first_block{
  align-items: center;
  display: inline-flex;
  width: 100%;
  justify-content: center;
}
.first_block div{
 display: inline-flex;
}
.text{
  font-size: 4rem;
  font-weight: bold;
  font-family: "Logotype";

}
.first{
  width: 300px;
}
.text b{
  transform: rotate3d(0,100,0, 90deg);
}
.text b:nth-child(1) {
  animation: 1s n1 0s forwards ;
}
.text b:nth-child(2) {
  animation: 1s n2 0s forwards ;
}
.text b:nth-child(3) {
  animation: 1s n3 0s forwards ;
}
.text b:nth-child(4) {
  animation: 1s n4 0s forwards ;
}
.text b:nth-child(5) {
  animation: 1s n2 0s forwards ;
}
.text b:nth-child(6) {
  animation: 1s n1 0s forwards ;
}

@keyframes n1 {
  0%{ transform: rotate3d(0,100,0, 90deg)}
  100%{ transform: rotate3d(0,100,0, 0deg)}
}
@keyframes n2 {
  0%{ transform: rotate3d(0,100,40, 90deg)}
  100%{ transform: rotate3d(0,100,0, 0deg)}
}
@keyframes n3 {
  0%{ transform: rotate3d(50,55,40, 90deg)}
  100%{ transform: rotate3d(0,100,0, 0deg)}
}
@keyframes n4 {
  0%{ transform: rotate3d(0,100,70, 90deg)}
  100%{ transform: rotate3d(0,100,0, 0deg)}
}

.second_block{
  display: flow-root;
  height: 100%;
}


.second_block{
  margin-top: 50px;

}




.animate_onscroll{
  display: inline-flex;

}
.animate_onscroll p{
  width:500px;
}
.animate_onscroll>*:first-child{
 /* padding: 5px;*/


}
.animate_onscroll>*:last-child{
  margin: 15px;

}
/*
.animate_onscroll .side_left{transform:  translate(-130%,0)}
.animate_onscroll .side_right{transform:  translate(130%,0)}
*/
.active .side_left{transform:  translate(0,0);
 /* transition: all 0.5s ease 0.1s*/
}
.active .side_right{transform:  translate(0, 0);
 /* transition: all 0.5s ease 0.1s*/

}

.animate_onscroll .fade_in{transform:  scale(0)}
.active .fade_in{transform:  scale(1);
 /*transition: all 1s ease 0.1s*/
}


img{
  border-radius: 5px;
}
.content_block{
  padding: 0px;
}

.about_us{
  padding: 15px;
}


</style>