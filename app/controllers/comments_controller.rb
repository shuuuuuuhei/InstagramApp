class CommentsController < ApplicationController
    before_action :authenticate_user!

    def index
        @article = Article.find(params[:article_id])
        @comments = @article.comments
    end

    def new
        article = Article.find(params[:article_id])
        @comment = article.comments.build
    end

    def create
        article = Article.find(params[:article_id])
        @comment = article.comments.create!(comment_params)
        @comment.save!

        render json: @comment
    end

    def delete

    end

    private
    def comment_params
        params.require(:comment).permit(:content).merge(user_id: current_user.id, article_id: params[:article_id])
    end
end