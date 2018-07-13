import axios from 'axios'
export default function
  (url = '',
   user = {
     name: this.nickName,
     account: '',
     password: '',
     email: ''
}) {
     axios.post("http://10.42.0.118:8080/register",user)
    .then(function (response) {

    }).catch(function (error) {
        return error;
  });
}
