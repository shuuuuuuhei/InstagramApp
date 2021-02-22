class TimelinesController < ApplicationController
    def show
        @users = current_user.followings
    end
end