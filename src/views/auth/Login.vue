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
import md5 from 'md5'



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
        password:md5(this.password)
      }
      console.log(user);
      //const localUser = this.$store.state.user
      //这里放axios异步请求
      this.$axios.post("http://10.42.0.118:8080/authorize",user)
        .then(response=>{
             if (response.data.success===true && response.status===200){
                 this.$store.state.token=response.data.token;
                 sessionStorage.setItem('token',response.data.token);
                 console.log(sessionStorage.getItem('token'));
                 this.$axios.get("http://10.42.0.118:8080/user")
                   .then(response=>{
                     if(response.status===200){
                        this.$store.dispatch("login",response.data);
                     }
                   })
                   .catch(error=>{this.showMsg("huo qu yong hu xinxi shibai")})

             } else this.showMsg("登录失败");

        }).catch(error=>{
          this.showMsg("登录失败")
      })

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
