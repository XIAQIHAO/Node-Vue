<template>
  <div class="login">
   
    <div class="wrapper">
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
            <button class="btn btn-primary" @click.prevent="login">登录</button>
            <button class="btn btn-info" @click="go">注册</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    go() {
      this.$router.push("/register");
    },
    login() {
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
          .post("/api/login", {
            username: this.username,
            password: this.password
          })
          .then(mes => {
            if (mes.data.errno) {
              alert("登录成功");
              this.$router.push("/userlist");
            } else {
              alert("用户名或密码错误");
            }
          });
      } else {
        alert("请输入正确的格式");
      }
    }
  },
  created() {
    this.username = this.$store.state.username;
  }
};
</script>


<style scoped>
.wrapper {
  width: 500px;
  height: auto;
  margin: 100px auto;
  padding: 20px 0;
  border-radius: 5px;
  box-shadow: 0 0 10px skyblue;
}
</style>
