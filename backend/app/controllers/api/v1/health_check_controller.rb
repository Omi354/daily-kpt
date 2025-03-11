class Api::V1::HealthCheckController < ApplicationController
  def show
    render json: { message: "Success Health Check" }, status: :ok
  end
end
