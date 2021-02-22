import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('DOMContentLoaded', () => {

    $('.unfollow-btn').on('click', function() {
        var userId = $(this).attr('id')
        axios.post(`/accounts/${userId}/unfollows`)
            .then((response) => {
                $('.unfollow-btn').addClass('hidden')
                $('.follow-btn').removeClass('hidden')
                var userFollowerCount = Number(document.getElementById('profilePage_user_basicInfo_followers_num').textContent);
                $('#profilePage_user_basicInfo_followers_num').text(userFollowerCount-1)
            })
    })
    $('.follow-btn').on('click', function() {
        const userId = $(this).attr('id')
        axios.post(`/accounts/${userId}/follows`)
            .then((response) => {
                $('.unfollow-btn').removeClass('hidden')
                $('.follow-btn').addClass('hidden')
                var userFollowerCount = Number(document.getElementById('profilePage_user_basicInfo_followers_num').textContent);
                $('#profilePage_user_basicInfo_followers_num').text(userFollowerCount+1)
            })
    })
})