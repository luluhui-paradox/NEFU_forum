<template xmlns="http://www.w3.org/1999/html">
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请登录</h3>
        </div>

        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">用户名</label>
            <input v-model.trim="username" v-validator.required="{ title: '用户名' }" type="text" class="form-control" placeholder="请填写用户名">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input v-model.trim="password" id="password" v-validator.required="{ title: '密码' }" type="password" class="form-control" placeholder="请填写密码">
          </div>
          <br>
          <button @click="login" type="submit" class="btn btn-lg btn-success btn-block">
            <i class="fa fa-btn fa-sign-in"></i> 登录
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {post} from "../../store/actions";
import localStorage from "../../utils/localStorage";
import sessionStorage from "../../utils/sessionStorage";


export default {
  name: 'Login',
  data() {
    return {
      username: '', // 用户名
      password: '', // 密码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  methods: {
    //点击登录按钮时的校验
    login(e) {
      this.$nextTick(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement;

        if (target.canSubmit) {
          //执行登录请求
          this.submit()
        }
      })
    },
    submit() {
      var user = {
        account: this.username,
        //对密码进行md5加密
        password: this.crypto.createHash("md5").update(this.password)
      };
      //const localUser = this.$store.state.user
      //这里放axios异步请求
      var sucs;//成功标识
      var result;//存放回传结果
      this.$axios.post('/',user)
        .then(function (response) {
          if (response.result.success===true){
             sucs=true;
          } else{
              sucs=false;
          }
        })
        .catch(function (error) {
              sucs=false;
        });

      if (sucs){
        //session中存放access_token
        sessionStorage.setItem("token",result.data.token);
        this.$axios.post("/url",{accout:user.account,password:user.password})
          .then(function (response) {
            this.$store.dispatch("login",response.data);
          })
        //登录操作
      } else
        this.showMsg("用户名或密码不对");
    },

    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}
</script>

<style scoped>

</style>
