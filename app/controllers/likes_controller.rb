class LikesController < ApplicationController
    before_action :authenticate_user!

    def create
        article = Article.find(params[:id])
        like = article.build_like
        if like.save
            
        end
    end

    def destroy

    end

    def show

    end


end