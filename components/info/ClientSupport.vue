<template>
<section >
  <h1>Служба поддержки клиентов</h1>

  <div class="client_support content_block">
    <header>Отправить сообщение</header>
    <main>
      <div class="field__block">
        <label>Название вашей компании</label>
        <input type="text">
      </div>
      <div class="field__block">
        <label>Ваши ФИО, должность</label>
        <input type="text">
      </div>
      <div class="field__block">
        <label>Email</label>
        <input type="text">
      </div>
      <div class="field__block">
        <label>Ваш номер телефона</label>
        <input type="text">
      </div>
      <div class="field__block">
        <label>Сообщение</label>
        <textarea rows="9">
      </textarea>
      </div>
      <div class="field__block">
        <label></label>
        <input type="button" value="Отправить" class="btn-std base_shadow_hover">
      </div>

    </main>


  </div>
</section>
</template>

<script>
export default {
  name: "ClientSupport"
}
</script>

<style scoped>
section{
  text-align: center;
}
.client_support{
  width: 700px;

  padding: 0;
  margin-left: auto;
  margin-right: auto;

}
.client_support header{
   background: linear-gradient(45deg, rgb(255,73,0), rgb(255, 100, 50));
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
</style>