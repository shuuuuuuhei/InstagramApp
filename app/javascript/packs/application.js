// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

require("trix")
require("@rails/actiontext")

import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

const handleHeartDisplay = (hasLiked) => {
    if (hasLiked) {
        $('.active-heart').removeClass('hidden')
    }
    else {
        $('.inactive-heart').removeClass('hidden')
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const dataset = $('#article-show').data()
    const articleId = dataset.articleId
    axios.get(`/articles/${articleId}/like`)
        .then((response) => {
            const hasLiked = response.data.hasLiked
            handleHeartDisplay(hasLiked)
            console.log(response)
        })
    
    $('.active-heart').on('click', ()=> {
        axios.delete(`/articles/${articleId}/like`)
            .then((response) => {
                if(response.data.status === 'ok') {
                    $('.inactive-heart').removeClass('hidden')
                    $('.active-heart').addClass('hidden')
                }
            })
            .catch((e) => {
                window.alert('error')
                console.log(e)
            })
    })

    $('.inactive-heart').on('click', ()=> {
        axios.post(`/articles/${articleId}/like`)
        .then((response) => {
            if(response.data.status === 'ok') {
                $('.active-heart').removeClass('hidden')
                $('.inactive-heart').addClass('hidden')
            }
        })
        .catch((e) => {
            window.alert('error')
            console.log(e)
        })
    })
    
    $('.profilePage_user_image').on('click', () => {
        $('.profilePage_user_image_area').removeClass('hidden')
    })
    $('.add-user-image-btn').on('click', () => {
        const userImage = $('#user_image_tag').val()

        axios.post(`/profile`, {
            profile: {avatar: userImage}
        })
        .then((res) => {
            console.log(res)
        })
    })

    var file_field = document.querySelector('input[type=file]')
    var dataBox = new DataTransfer();
    //file_fieldにデータが格納された時に発火
    $('#img-file').change(function (){

        //選択したfileのオブジェクトをpropで取得
        var files = $(this).prop('files')[0];
        $.each(this.files, function(i, file){
            var fileReader = new FileReader();
            dataBox.items.add(file)
            //DataTransferオブジェクトに入ったfile一覧をfile_fieldの中に代入
            file_field.files = dataBox.files
            var num = $('.item-image').length + 1 + i
            fileReader.readAsDataURL(file);
            if (num == 10){
                $('#image-box__container').css('display', 'none')   
            }
            fileReader.onloadend = function() {
                var src = fileReader.result
                var html= `<div class='item-image' data-image="${file.name}">
                <div class=' item-image__content'>
                  <div class='item-image__content--icon'>
                    <img src=${src} width="114" height="80" >
                  </div>
                </div>
                <div class='item-image__operetion'>
                  <div class='item-image__operetion--delete'>削除</div>
                </div>
              </div>`
                $('#image-box__container').before(html);
            };
            $('#image-box__container').attr('class', `item-num-${num}`)
        })
    })
    $(document).on("click", '.item-image__operetion--delete', function(){
    //プレビュー要素を取得
        var target_image = $(this).parent().parent()
        //プレビューを削除
        target_image.remove();
        //inputタグに入ったファイルを削除
        var obj = document.getElementById('img-file')
        obj.value = ''
    })

})