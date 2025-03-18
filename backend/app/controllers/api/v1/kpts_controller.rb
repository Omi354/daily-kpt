class Api::V1::KptsController < Api::V1::BaseController
  before_action :authenticate_user!

  def create
    kpt = current_user.kpts.create!(kpt_params)
    render json: { message: "Success", kpt: kpt }, status: :created
    debugger
  end

  private
  def kpt_params
    params.require(:kpt).permit(:date, :keep, :problem, :try)
  end
end
