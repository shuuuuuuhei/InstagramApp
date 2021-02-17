import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD

    $('.comment_add_btn').on("click", function() {
        var dataSet = $('.comment_add').data()
        var userId = dataSet.userId
        var userName = dataSet.userName
        var userAvatar = dataSet.userAvatar
        var articleId = $(this).attr("id")
        const content = $('#comment_content').val()
        if (!content) {
            window.alert('コメントを入力してください')
        }
        else {
            axios.post(`/articles/${articleId}/comments`, {
                comment: { 
                    content: content,
                    user_id: userId,
                    article_id: articleId
                }
            })
                .then((res) => {
                    const id = $('.comment_wrap').last().attr("id")
                    const comment = res.data
                    if(!id) {
                        $('.comment-container').append(
                            `<div class = "comment_wrap">
                                <div class = "comment_wrap_user">
                                    <div class = "comment_wrap_user_image.icon">
                                        <img src="${userAvatar}">
                                    </div>
                                    <div class = "comment_wrap_user_name">
                                        <h3>${userName}</h3>
                                    </div>
                                </div>
                                <div class = "comment_wrap_content">
                                    ${comment.content}
                                </div>
                            </div>
                            `   
                        )
                    } else {
                        $(`#${id}.comment_wrap`).append(
                            `<div class = "comment_wrap">
                                <div class = "comment_wrap_user">
                                    <div class = "comment_wrap_user_image.icon">
                                        <img src="${userAvatar}">
                                    </div>
                                    <div class = "comment_wrap_user_name">
                                        <h3>${userName}</h3>
                                    </div>
                                </div>
                                <div class = "comment_wrap_content">
                                    ${comment.content}
                                </div>
                            </div>
                            `
                        )
                    }
                    $('#comment_content').val('')
                })
        }
    })
=======
    const handleHeartDisplay = (hasLiked) => {
        if (hasLiked) {
            $(`#${id}.active-heart`).removeClass('hidden')
        }
        else {
            $(`#${id}.inactive-heart`).removeClass('hidden')
        }
    }
>>>>>>> like

    $('.active-heart').on('click', function() {
        var articleId = $(this).attr("id")
        axios.delete(`/articles/${articleId}/like`)
            .then((response) => {
                if(response.data.status === 'ok') {
                    $(`#${articleId}.inactive-heart`).removeClass('hidden')
                    $(`#${articleId}.active-heart`).addClass('hidden')
                }
            })
            .catch((e) => {
                window.alert('error')
                console.log(e)
            })
    })

    $('.inactive-heart').on('click', function() {
        var articleId = $(this).attr("id")
        axios.post(`/articles/${articleId}/like`)
        .then((response) => {
            if(response.data.status === 'ok') {
                $(`#${articleId}.active-heart`).removeClass('hidden')
                $(`#${articleId}.inactive-heart`).addClass('hidden')
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