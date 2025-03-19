class Api::V1::KptsController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    kpt = current_user.kpts.find_by(date: params[:date])
    if kpt.present?
      render json: { message: "Success", kpt: kpt }
    else
      render json: { message: "Not Found" }, status: :not_found
    end
  end

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
