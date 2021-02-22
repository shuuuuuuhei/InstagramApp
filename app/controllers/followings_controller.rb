class FollowingsController < ApplicationController
    def show
        user = User.find(params[:account_id])
        @users = user.followings
    end
end
