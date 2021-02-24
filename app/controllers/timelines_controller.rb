class TimelinesController < ApplicationController
    def show
        users = current_user.followings
        @articles = users.joins(:articles).select("articles.*").order("likes_count DESC").limit(10)
    end
end