class Api::V1::KptsController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    unless params[:date].match?(/\A\d{4}-\d{2}-\d{2}\z/)
      render json: { message: "URLが不正です。'/api/v1/kpts/yyyy-mm-dd'形式で指定してください" }, status: :bad_request
      return
    end

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
