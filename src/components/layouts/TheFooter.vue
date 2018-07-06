<template>
  <footer class="footer">
    <div class="container">
      <div class="row footer-top">
        <div class="col-sm-5 col-lg-5">
          <p class="padding-top-xsm">{{ description }}</p>
          <br>
          <span style="font-size:0.9em">Designed by
          <span style="color: #e27575;font-size: 14px;">❤</span>
          <a href="https://github.com/Icear"target="_blank"style="color:inherit">Icer</a>
        </span>
        </div>

        <div class="col-sm-6 col-lg-6 col-lg-offset-1">
          <div class="row">
            <div class="col-sm-4">
              <h4>{{ sponsor.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in sponsor.list">
                  <a :href="item.link" target="_blank">
                    <img v-title="item.title" :src="item.logo" :alt="item.title" class="footer-sponsor-link" width="98">
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-sm-4">
              <h4>{{ statistics.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in statistics.list">{{ item.title }}: {{ item.description }}</li>
              </ul>
            </div>

            <div class="col-sm-4">
              <h4>{{ other.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in other.list">
                  <a :href="item.link" :title="item.title" target="_blank">
                    <i :class="`fa fa-${item.icon}`"></i> {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import title from '@/directives/title'
export default {
  name: 'TheFooter',
  directives: {
    title
  },
  data() {
    return {
      description: '林大论坛',

      contactStyle: {
        paddingRight: '8px'
      },

      sponsor: {
        title: '技术支持',
        list: [
          {
            logo:'https://www.huawei.com/Assets/corp/v2/img/huawei_logo.png',
            title:'本站由华为云提供技术支持',
            link:'https://www.huaweicloud.com/'
          },
          {

          },
          {
            logo:'http://www.hljtmkj.com/Public/Home/tuomeng/img/logo.png',
            title:'本站由邱老板的拓盟科技赞助',
            link:'http://www.hljtmkj.com/index.php?s=/Home/Index/index.html'
          }
        ]
      },
      statistics: {
        title: '统计信息',
        list: [
          {
            title: '社区会员',
            description: '9'
          },
          {
            title: '话题数',
            description: '4'
          },
          {
            title: '评论数',
            description: '0'
          }
        ]
      },
      other: {
        title: '其他信息',
        list: [
          {
            icon: 'globe',
            title: '全球最大的同性交友网',
            link: 'https://github.com'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
a:hover, a:focus { color: #e27575; transition: color .15s;}
</style>
