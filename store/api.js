export const actions = {

  async get({store}, data)
  {
    const result = await this.$axios.$get(data.endpoint, {
      params:data.params,
      headers:data.headers

    })
    return result;

  },
  async post({context}, data)
  {

    var formData = new FormData();
    for (var key in data.params){
      formData.append(key, data.params[key]);
    }

    const result = await this.$axios.$post(data.endpoint, formData)
    return result;
  },
  async put({context}, data)
  {
    var formData = new URLSearchParams(data.params).toString();

    const result = await this.$axios.$put(data.endpoint, formData)
    return result;
  },
  async delete({context}, data)
  {
    var formData = new FormData();
    for (var key in data.params){
      formData.append(key, data.params[key]);
    }

    const result = await this.$axios.$delete(data.endpoint, formData)

    return result;
  }


}
