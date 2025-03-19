class Api::V1::KptsController < Api::V1::BaseController
  before_action :authenticate_user!

  def create
    kpt = current_user.kpts.new(kpt_params)
    if kpt.save
      render json: { message: "Success", kpt: kpt }, status: :created
    else
      render json: { message: kpt.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  private

    def kpt_params
      params.require(:kpt).permit(:date, :keep, :problem, :try)
    end
end
