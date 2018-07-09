<template xmlns:v-validator="http://www.w3.org/1999/xhtml">
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
        <div class="panel-body">
            <h2><i class="fa fa-cog"></i> 编辑个人资料</h2>
        <hr>
        <div class="form-horizontal" data-validator-form>
          <div class="form-group">
            <label class="col-sm-2 control-label">昵称</label>
            <div class="col-sm-6">
              <input v-model.trim="nickName" v-validator:input.required="{ title: '昵称', error: '昵称不能为空' }" minlength="3" maxlength="16" type="text" class="form-control">
            </div>
          </div>
          <div class="form-group">
           <!--修改邮箱-->
            <label class="col-sm-2 control-label">昵称</label>
            <div class="col-sm-6">
              <input v-model.trim="email" v-validator:input.required="{ title: '邮箱', error: '昵称不能为空' }"  type="email" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updateProfile">应用修改</button>
            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import sessionStorage from "../../utils/sessionStorage";

export default {
  name: 'EditProfile',
  data() {
    return {
      nickName:this.$store.state.user.nickName,//昵称
      email:this.$store.state.user.email//邮箱
    }
  },
  created() {

    var user=this.$store.state.user;
    var result;
    this.$axios.post("10.42.0.118:8080/user",user)
      .then(function (response) {
         if (response.status===200){this.user=response.data.user;result=true}
         else{result=false}
      })
      .catch(function (error) {
           result=false;
      })
     if(result) {this.$store.state.user=user;sessionStorage.setItem("user",user)}

  },
  methods: {
    updateProfile(e) {
      this.$nextTick(() => {
        if (e.target.canSubmit) {
            var stageUser=this.$store.state.user;
            var changeUser={
              nickName:this.nickName,
              email:this.email
            };
            changeUser={...stageUser,...changeUser};

            var success;
            this.$axios.post("10.42.0.118:8080/user",changeUser)
              .then(function (response) {
                  if(response.status===200)
                     success=true;result=response;
              })
              .catch(function (error) {
                   success=false;
              })
          if (success) {
            this.$store.dispatch('updateUser',changeUser);
            this.showMsg("修改成功");
          }
          else this.showMsg("修改失败");
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
