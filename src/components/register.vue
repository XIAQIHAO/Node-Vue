<template>
  <div class="register">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
        <div class="col-sm-12">
          <input
            type="text"
            class="form-control"
            id="inputEmail3"
            placeholder="用户名"
            v-model="username"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
        <div class="col-sm-12">
          <input
            type="password"
            class="form-control"
            id="inputPassword3"
            placeholder="密码"
            v-model="password"
          />
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-12 text-center">
          <button class="btn btn-info" @click.prevent="regist">注册</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapMutations(["getUser"]),
    regist() {
      let [nameLength, wordLength] = [
        this.username.trim().length,
        this.password.trim().length
      ];
      if (
        nameLength >= 3 &&
        nameLength <= 12 &&
        wordLength >= 6 &&
        wordLength <= 20
      ) {
        this.$axios
          .post("/api/register", {
            username: this.username,
            password: this.password
          })
          .then(mes => {
            if (mes.data.errno) {
              alert("注册成功");
              this.$router.push("/");
              this.getUser(this.username);
            } else {
              alert("此用户已经被注册过");
            }
          });
      } else {
        alert("格式不正确");
      }
    }
  }
};
</script>
<style scoped>
.register {
  width: 500px;
  height: auto;
  margin: 100px auto;
  padding: 20px 0;
  border-radius: 5px;
  box-shadow: 0 0 10px skyblue;
}
</style>