<template>
    <div class='container'>
        <div class="pageTitle">
            <div class="login__user">
                {{ getUserName }}님 안녕하세요,<br />
                즐거운 하루 보내고 계신가요?
            </div>
            <div class='logout'>
                <ButtonLogout />
            </div>
        </div>
        <info-user />
            <br />
        <review-button />
            <br />
        <my-article-btn />
    </div>
</template>

<script>
import ButtonLogout from '../components/ButtonLogout.vue';
import InfoUser from '../../../components/InfoUser.vue';
import ReviewButton from '../../../components/ReviewButton.vue';
import MyArticleBtn from '../../../components/MyArticleBtn.vue';
import { mapGetters, mapState } from 'vuex'

export default {
    components: {
        InfoUser,
        ReviewButton,
        ButtonLogout,
        MyArticleBtn,
    },
    name: 'MyPage',
    computed: {
        ...mapState('user',
        ['token']),
        ...mapGetters('user',[
            'getUserName'
        ]),
    },
}
</script>

<style scoped>
label {
    padding: 20px;
  width: 100px;
  height: 60px;
  border: 1px solid #000000;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
}
input[type="checkbox"]:checked + label {
  border-color: green;
  background-color: rgba(255, 0, 0, 0.4);
}
input[type="checkbox"] {
  display: none;
}


a {
    text-decoration: none;
}

.container {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
    padding: 0 1rem;
    border-radius: .25rem;
}

.button:hover {
    filter: brightness(97%);
}

.logout {
    display: flex;
    border-radius: 0.25rem;
    height: 12vw;
}

.pageTitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
    text-align: left;
    font-size: 0.9rem;
}

.userinfo {
    text-align: left;
}

</style>