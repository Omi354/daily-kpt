require "rails_helper"

RSpec.describe "Api::V1::HealthCheck", type: :request do
  describe "GET /api/v1/health_checks" do
    subject { get api_v1_health_check_path }

    it "ステータスコード200と成功した際のメッセージが返る" do
      subject
      message = response.parsed_body["message"]
      expect(response).to have_http_status(200)
      expect(message).to eq("Success Health Check")
    end
  end
end
