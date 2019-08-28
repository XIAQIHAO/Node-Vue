<template>
  <div class="user-list">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-2">
              <p>
                <button class="btn btn-primary" @click="add">添加用户</button>
              </p>
            </div>
            <div class="col-10">
              <div class="row">
                <h4>用户名:</h4>
                <div class="col-5">
                  <p>
                    <input type="text" class="form-control" v-model="queryname" />
                  </p>
                </div>
                <p>
                  <button class="btn btn-outline-primary" @click.prevent="query">查询</button>
                  <button class="btn btn-info" @click.prevent="allList">全部用户</button>
                </p>
              </div>
            </div>
          </div>

          <table class="table table-bordered table-active table-success text-center">
            <thead>
              <tr>
                <th>id</th>
                <th>用户名</th>
                <th>密码</th>
                <th>年龄</th>
                <th>日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(users,index) in UserList[pages]" :key="index">
                <td>{{users._id}}</td>
                <td>{{users.username}}</td>
                <td>{{users.password}}</td>
                <td>{{users.age}}</td>
                <td>{{users.Date}}</td>
                <td>
                  <button class="btn btn-primary btn-sm" @click="change(index)">修改</button>
                  <button class="btn btn-danger btn-sm" @click="del(index)">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-center">
            <nav aria-label="Page navigation" v-show="UserList.length>1">
              <ul class="pagination">
                <li>
                  <a href="#" aria-label="Previous">
                    <span aria-hidden="true" @click.prevent="changepage(0)">&laquo;</span>
                  </a>
                </li>
                <li
                  v-for="(number,indexs) in UserList.length"
                  :key="indexs"
                  :class="{bg:pages == indexs}"
                >
                  <a href="#" @click.prevent="page(indexs)">{{number}}</a>
                </li>
                <li>
                  <a href="#" aria-label="Next">
                    <span aria-hidden="true" @click.prevent="changepage(1)">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="form" v-show="ishow">
      <transition enter-active-class="animated bounceInDown">
        <div class="form-wrap" v-show="ishow">
          <form class="form-horizontal">
            <h3 class="text-center">{{title}}</h3>
            <div class="form-group">
              <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
              <div class="col-sm-12">
                <input type="text" class="form-control" placeholder="用户名" v-model="username" />
              </div>
            </div>
            <div class="form-group">
              <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
              <div class="col-sm-12">
                <input type="password" class="form-control" placeholder="密码" v-model="password" />
              </div>
            </div>
            <div class="form-group">
              <label for="inputEmail3" class="col-sm-2 control-label">年龄</label>
              <div class="col-sm-12">
                <input type="text" class="form-control" placeholder="年龄" v-model="age" />
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12 text-center">
                <button
                  class="btn btn-info"
                  v-loading.fullscreen.lock="fullscreenLoading"
                  @click.prevent="handle(1)"
                >确定</button>
                <button class="btn btn-success" @click.prevent="handle(0)">取消</button>
              </div>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      userList: [],
      username: "",
      password: "",
      age: "",
      ishow: false,
      num: "",
      fullscreenLoading: false,
      title: "",
      current: "",
      pages: 0,
      queryname: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    allList() {
      this.getData();
    },
    query() {
      this.$axios
        .post("/api/query", { queryname: this.queryname })
        .then(mes => {
          if (mes.data) {
            this.userList = [];
            this.userList.push(mes.data);
            this.queryname = "";
          } else {
            this.$message({
              showClose: true,
              message: "操作失败,该用户不存在",
              type: "error"
            });
          }
          
        });
    },
    changepage(num) {
      const loading = this.$loading({
        lock: true,
        text: "正在操作中.....",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        if (num) {
          this.pages += 1;
          this.pages = this.pages >= this.UserList.length ? 0 : this.pages;
        } else {
          this.pages -= 1;
          this.pages = this.pages < 0 ? this.UserList.length - 1 : this.pages;
        }
      }, 1000);
    },
    page(index) {
      const loading = this.$loading({
        lock: true,
        text: "正在操作中.....",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        this.pages = index;
      }, 500);
    },
    add() {
      this.current = 0;
      this.ishow = true;
      this.username = this.password = this.age = "";
      this.title = "新增信息";
    },
    getData() {
      this.getUserList().then(() => {
        this.userList = this.$store.state.userlist;
      });
    },
    ...mapActions(["getUserList"]),
    change(index) {
      this.ishow = true;
      this.num = index;
      this.username = this.UserList[this.pages][index].username;
      this.password = this.UserList[this.pages][index].password;
      this.age = this.UserList[this.pages][index].age;
      (this.title = "修改信息"), (this.current = 1);
    },
    success() {
      this.$message({
        showClose: true,
        message: this.current ? "恭喜你，修改成功" : "恭喜你，添加成功",
        type: "success"
      });
    },
    load() {
      const loading = this.$loading({
        lock: true,
        text: "正在操作中.....",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        this.getData();
        this.success();
      }, 1000);
    },
    erro() {
      this.$message({
        showClose: true,
        message: "操作失败,请输入正确的信息格式",
        type: "error"
      });
    },
    handle(curr) {
      this.ishow = false;
      let [nameLength, wordLength] = [
        this.username.trim().length,
        this.password.trim().length
      ];
      if (this.current == 1) {
        if (curr) {
          if (
            nameLength >= 3 &&
            nameLength <= 12 &&
            wordLength >= 6 &&
            wordLength <= 20 &&
            this.age > 0
          ) {
            this.$axios.post("/api/change", {
              username: this.username,
              password: this.password,
              age: this.age,
              _id: this.UserList[this.pages][this.num]._id
            });
            this.load();
          } else {
            const loading = this.$loading({
              lock: true,
              text: "正在添加中......",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            setTimeout(() => {
              loading.close();
              this.erro();
            }, 1000);
          }
        }
      } else if (this.current == 0) {
        if (curr) {
          if (
            nameLength >= 3 &&
            nameLength <= 12 &&
            wordLength >= 6 &&
            wordLength <= 20 &&
            this.age > 0
          ) {
            this.$axios.post("/api/add", {
              username: this.username,
              password: this.password,
              age: this.age
            });
            this.load();
          } else {
            const loading = this.$loading({
              lock: true,
              text: "正在操作中....",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            setTimeout(() => {
              loading.close();
              this.erro();
            }, 1000);
          }
        }
      }
    },
    del(index) {
      this.suredel(index);
     
    },
    suredel(indexs) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.post("/api/del", {
            _id: this.UserList[this.pages][indexs]._id
          });
          const loading = this.$loading({
            lock: true,
            text: "正在删除....",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          setTimeout(() => {
            loading.close();
            this.getData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    UserList() {
      let newList = [];
      this.userList.forEach((item, index) => {
        let page = ~~(index / 5);
        if (!newList[page]) {
          newList[page] = [];
        }
        newList[page].push(item);
      });
      return newList;
    }
  }
};
</script>
<style scoped>
.user-list {
  margin: 100px auto 0;
}
.form {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.bg {
  background: skyblue !important;
}
.form .form-wrap {
  width: 550px;
  height: 400px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: white;
  padding: 30px 0 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px skyblue;
}
.pagination {
  display: inline-block;
  margin: auto;
  line-height: 47px;
}
.pagination li {
  float: left;
  height: 35px;
  line-height: 35px;
  padding: 0 15px;
  border-radius: 3px;
}
.pagination li > a:hover {
  text-decoration: none;
}
</style>