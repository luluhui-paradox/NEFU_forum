<template>
  <div class="navbar-right" >
    <ul v-if="auth" class="nav navbar-nav github-login">
       <li>
        <a v-dropdown href="javascript:;">
          <i class="fa fa-plus text-md"></i>
        </a>
        <ul class="dropdown-menu">
          <li>
            <router-link to="/articles/create">
              <i class="fa fa-paint-brush text-md"></i>
              创作文章
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <a v-dropdown href="javascript:;">
          <span v-if="user">
            <span v-if="user.name">{{ user.name }}</span>
          </span>
          <span v-else>佚名</span>
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <!--<li v-if="user">-->
            <!--<router-link :to="`/${user.name}`">-->
              <!--<i class="fa fa-list-ul text-md i-middle"></i>-->
              <!--个人专栏-->
            <!--</router-link>-->
          <!--</li>-->
          <li>
            <router-link to="/users/1/edit">
              <i class="fa fa-cog text-md i-middle"></i>
              编辑资料
            </router-link>
          </li>
          <li><a href="#" @click="logout"><i class="fa fa-sign-out text-md"></i>退出</a></li>
        </ul>
      </li>
    </ul>
    <div v-else class="nav navbar-nav github-login">
      <el-button title="登 录"  v-on:click="signin" size="small" style="margin-top: 7px;">登 录</el-button>
      <el-button title="注 册" v-on:click="registe" size="small" type="primary">注 册</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheEntry',
  computed: {
    ...mapState([
      'auth',
      'user'
    ])
  },
   methods: {
    logout() {
      this.$swal({
        text: '你确定要退出吗?',
        confirmButtonText: '退出'
      }).then((res) => {
        if (res.value) {
          this.$store.dispatch('logout')
        }
      })
    },
    signin:function () {
      this.$router.push({path:'/auth/login'});
    },
     registe:function() {
       this.$router.push({path:'/auth/register'})
     }
  }
}
</script>

<style scoped>

</style>
