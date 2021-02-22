class FollowersController < ApplicationController
    def show
        user = User.find(params[:account_id])
        @users = user.followers
    end
end