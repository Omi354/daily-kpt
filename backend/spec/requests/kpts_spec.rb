require 'rails_helper'

RSpec.describe "Kpts", type: :request do
  let(:user) { create(:user) }
  
  describe "POST /api/v1/kpts" do
    context "認証情報がヘッダーに記載された場合" do
      let(:headers) { login_user(user) }

      context "正しいパラメータを送信した場合" do
        let(:kpt_params) { attributes_for(:kpt) }

        it "KPTが登録される" do
          expect { post api_v1_kpts_path, params: { kpt: kpt_params }, headers: headers }.to change(user.kpts, :count).by(1)
        end

        it "ステータスコード201が返る" do
          post api_v1_kpts_path, params: { kpt: kpt_params }, headers: headers
          expect(response).to have_http_status(:created)
        end

        it "登録したKPTが返る" do
          post api_v1_kpts_path, params: { kpt: kpt_params }, headers: headers
          body = JSON.parse(response.body)
          expect(body["kpt"]["keep"]).to eq(kpt_params[:keep])
          expect(body["kpt"]["problem"]).to eq(kpt_params[:problem])
          expect(body["kpt"]["try"]).to eq(kpt_params[:try])
        end
      end

      context "不正なパラメータを送信した場合" do
        let(:invalid_kpt_params) { attributes_for(:kpt, keep: nil) }

        it "KPTが登録されない" do
          expect { post api_v1_kpts_path, params: { kpt: invalid_kpt_params }, headers: headers}.to change(user.kpts, :count).by(0)
        end

        it "ステータスコード422が返る" do
          post api_v1_kpts_path, params: { kpt: invalid_kpt_params }, headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it "エラーメッセージが返る" do
          post api_v1_kpts_path, params: { kpt: invalid_kpt_params }, headers: headers
          body = JSON.parse(response.body)
          expect(body["message"]).to eq("Keepを入力してください")
        end
      end


    end

    context "認証情報がヘッダーに記載されていない場合" do
      let(:kpt_params) { attributes_for(:kpt) }

      it "KPTが登録されない" do
        expect { post api_v1_kpts_path, params: { kpt: kpt_params } }.to change(user.kpts, :count).by(0)
      end

      it "ステータスコード401が返る" do
        post api_v1_kpts_path, params: { kpt: kpt_params }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
