class ArticlesController < ApplicationController
    before_action :authenticate_user!, only: [:index, :new, :create, :edit, :update, :destroy]

    def index
        @articles = Article.all
    end
    def show
        @article = Article.find(params[:id])
    end

    def new
        @article = current_user.articles.build
    end

    def create
        @article = current_user.articles.build(article_params)
        if @article.save
            redirect_to root_path, notice: '保存できたよ'
            
        else
            flash.now[:error] = '保存に失敗しました'
        end
    end

    def destroy
        article = current_user.articles.find(params[:id])
        article.destroy!
        redirect_to root_path, notice: '削除に成功しました'
    end

    def edit

    end

    def update

    end

    private
    def article_params
        params.require(:article).permit(
            :caption,
            images: []
        )
    end
end