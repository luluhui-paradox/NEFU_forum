<template xmlns:v-validator="http://www.w3.org/1999/xhtml">
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h2><i class="fa fa-cog"></i> 编辑论坛资料</h2>
        <hr>
        <div class="form-horizontal" data-validator-form>
          <div class="form-group">
            <label class="col-sm-2 control-label">论坛名称</label>
            <div class="col-sm-6">
              <input v-model.trim="forumName"
                     minlength="3" maxlength="16" type="text" class="form-control"
              v-validator:input.required="{title:'论坛名称',error:'名称不能为空'}">
            </div>
          </div>
          <!--<div class="form-group">-->
            <!--&lt;!&ndash;修改邮箱&ndash;&gt;-->
            <!--<label class="col-sm-2 control-label"></label>-->
            <!--<div class="col-sm-6">-->
              <!--<input v-model.trim="email" v-validator:input.required="{ title: '邮箱', error: '昵称不能为空' }"  type="email" class="form-control">-->
            <!--</div>-->
          <!--</div>-->
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
    export default {
        name: "forumEdit",
      data(){
          return{forumId:0,forumName:''}
      },
      created(){
          this.forumId=this.$route.params.forumId;
          this.$axios.get('/',this.forumId)
            .then(response=>{
              if (response.status===200){
                this.forumName=response.data.name;
              }
              else
                this.$message({
                  message:'初始化失败',
                  type:error,
                  onClose:()=>{
                    this.$router.push('forumIndex')
                  }
                  })
            })
            .catch(error=>{
              this.$message(
                {
                  message:'初始化失败',
                  type:error,
                  onClose:()=>{
                    this.$router.push('forumIndex')
                  }
                }
              )
            })
      },
      methods:{
        updateProfile(){
          let forum={
            forumId:this.forumId,
            name:this.forumName,
          };
          this.$axios.patch('/',forum)
            .then(response=>{
                if (response.status===200){
                  this.$message(
                    {
                      message:'修改成功',
                      type:success,
                      onClose:()=>{
                        this.$router.push('forumIndex')
                      }
                    }
                  )
                }
                else{
                  this.$message(
                    {
                      message:'修改失败',
                      type:error,
                      onClose:()=>{
                        this.$router.push('forumIndex')
                      }
                    }
                  )
                }
            })
            .catch(erro=>{
              this.$message(
                {
                  message:'修改失败',
                  type:error,
                  onClose:()=>{
                    this.$router.push('forumIndex')
                  }
                }
              )
            })
        }
      }
    }
</script>

<style scoped>

</style>
