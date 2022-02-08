<template>
  <section>
    <h1>Установка СКУД</h1>

    <div class="selection_block" v-if="2==3">
      <h1>Вариант 1</h1>
      <div class="input__field" v-for="(items, name) in FETCH_DATA_ITEMS()">
        <label>{{name}}</label>
        <select>
          <option v-for="item in items">{{item}}</option>
        </select>
      </div>

    </div>

    <h3>Выберите услуги:</h3>
    <div class="input__field">

      <ul>
        <li v-for="(items, name) in FETCH_DATA_ITEMS()">
          <label v-if="2==3"><input type="checkbox" ><b>{{name}}</b></label>
          <label><b>{{name}}</b></label>
          <ul>
            <li v-for="item in items">
              <label ><input type="checkbox" :value="item" v-model="request.services">{{item}}</label>
            </li>
          </ul>

        </li>

      </ul>

    </div>

    <div class="client_support content_block">
      <header>Отправить запрос</header>
      <main>

        <div class="field__block">
          <label>Ваши ФИО</label>
          <input type="text">
        </div>
        <div class="field__block">
          <label>Ваш номер телефона</label>
          <input type="text"  >
        </div>
        <div class="field__block">
          <label>Email</label>
          <input type="text" >
        </div>
        <div class="field__block">
          <label>Должность</label>
          <input type="text">
        </div>
        <div class="field__block">
          <label>Назначение объекта (склад, банк, ТЦ, БЦ и т.д.)</label>
          <input type="text">
        </div>
        <div class="field__block">
          <label>Место расположения объекта</label>
          <input type="text">
        </div>
        <div class="field__block">
          <label>Примерная площадь</label>
          <input type="text">
        </div>
        <div class="field__block">
          <label>Примерный бюджет</label>
          <input type="text">
        </div>
        <div class="field__block">
          <label>Количество сотрудников</label>
          <input type="text">
        </div>
        <div class="field__block">
          <label>Выбранные услуги</label>
          <div class="selected_services">
            {{(request.services).join()}}
          </div>
        </div>

        <div class="field__block">
          <label>Комментарий:<br>
            Уважаемый клиент! Если Вы не нашли в списке нужных услуг, то что искали, напишите нам. Мы обязательно подберем для Вас лучшее предложение
          </label>
          <textarea rows="9" >
      </textarea>
        </div>
        <div class="field__block">
          <label>Добавить вложение</label>
          <input type="file" id="files" ref="files" multiple  class="btn-std"/>

        </div>
        <div class="field__block">
          <label></label>
          <input type="button" value="Отправить" class="btn-std base_shadow_hover" >
        </div>

      </main>


    </div>


  </section>
</template>

<script>
export default {
  name: "SmartSkud",
  data() {
    return {
      fetched:{},
      request:{
        services:[]

      }
    }
  },
  mounted() {
  },
  methods: {

    FETCH_DATA_ITEMS()
    {
      var data = {
        'Проектные работы':[

          'Монтаж СКУД с автономным доступом в помещение по отпечатку пальца',
          'Установка турникета-трипода и автоматизированной системы контроля доступа.',
              'Автономная система контроля доступа по бесконтактной карте.',
              'Монтаж шлагбаума c автоматизацией въезда/выезда.',
              'Автономная система контроля доступа по бесконтактной карте + пинкод.',
              'Монтаж системы контроля доступа и роторного турникета',
          'Система учета рабочего времени сотрудников на одну точку прохода.',
              'Проведение пусконаладочных работ всей системы',
          'Программирование СКУД',
          'Термометрия сотрудников -STOP COVID'

        ],


      };
      return data

    }


  }


}
</script>

<style scoped>

li{
  margin-left: 30px;

}
label:hover{
  cursor: pointer;
}
.selected_services{
  width: 400px;
}
.selection_block .input__field{
  display: inline-flex;

}
.selection_block .input__field{
  width: 100%;

}
.selection_block label{
  width: 30%;
}
.selection_block select{
  width: 70%;
}

/**
ФОРМА ОБРАТНОЙ СВЯЗИ
 */

.client_support{
  width: 700px;
  padding: 0;
  margin-left: auto;
  margin-right: auto;

}
.client_support header{
  background: linear-gradient(45deg, var(--base-color), rgb(255, 100, 50));
  border-radius: inherit;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding:  10px;
  font-size: 1.3rem;
  color: white;
}
.client_support main{
  padding: 30px ;

}
.client_support .field__block{
  display: inline-flex;
  margin-bottom: 10px;
}
.client_support .field__block label{
  width: 200px;
  text-align: right;
  padding-right: 20px;
}
.content_block{
  text-align: left;
}
.client_support .field__block input[type=text],
.client_support .field__block textarea
{
  width: 400px;
  max-width: 400px;
  min-width: 400px;
}
h1{
  font-size: 2rem;
}
input[type=button]{
  width: 150px;
}

@media screen and (max-width: 720px){
  .client_support main{
    padding: 2px;
  }
  .client_support .field__block{
    display: block;
    margin-bottom: 10px;
  }
  .client_support{
    width: 100%;
  }
  .client_support .field__block label, .client_support .field__block input[type=text],  .client_support .field__block textarea{
    width: 100%;
    max-width: 100%;
    text-align: left;
    min-width: 100%;
    display: block;
  }

}
.error{
  color: red;
  font-size: 1.2rem;
}
</style>