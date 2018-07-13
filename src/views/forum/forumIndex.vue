<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h2><i class="fa fa-cog"></i>论坛管理</h2>
        <hr>
        <el-button type="primary">添加论坛</el-button>
        <el-table :data="forums" >
            <el-table-column label="索引" type="index"></el-table-column>
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="论坛名称" prop="name"></el-table-column>
            <el-table-column label="论坛描述" prop="description"></el-table-column>
            <el-table-column inline-template label="操作">
              <el-button-group>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="small"
                  circle
                  @click="editForum(scope.row.id)"></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  circle
                  @click="deleteForum(scope.row.id) "></el-button>
              </el-button-group>
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "forumIndex",
       data(){
          return{
            forums:[]
          }
       },

      methods:{
        editForum(id){
          this.$router().push('/forumIndex/edit/'+id);
        },
        addForum(){
          this.$router().push('/forumIndex/add');
        },
        deleteForum(id){
          //异步方法
          this.$axios.
        }
      }
    }
</script>

<style scoped>

</style>
