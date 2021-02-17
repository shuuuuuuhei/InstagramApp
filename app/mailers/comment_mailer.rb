class CommentMailer < ApplicationMailer
    def new_comment(commented_article, sent_user)
        @received_user = commented_article.user
        @sent_user = sent_user
        @article = commented_article
        
        mail to: @received_user.email, subject: '【お知らせ】コメントが届きました'
    end
end