class ProfilesController < ApplicationController
    before_action :authenticate_user!

    def show
        @profile = current_user.profile
    end

    def edit
        @profile = current_user.build_profile
    end

    def update
        @profile = current_user.build_profile
        @profile.assign_attributes(profile_params)
        @profile.save!
        render 
    end

    def create
        @profile = current_user.build_profile
        @profile.assign_attributes(profile_params)
        @profile.save!
        render json: @profile
    end

    private
    def profile_params
        params.require(:profile).permit(
            :avatar
        )
    end
end