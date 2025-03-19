require "rails_helper"

RSpec.describe "Kpts", type: :request do
  let(:user) { create(:user) }

  describe "POST /api/v1/kpts" do
    context "認証情報がヘッダーに記載された場合" do
      let(:headers) { login_user(user) }

      context "正しいパラメータを送信した場合" do
        let(:kpt_params) { attributes_for(:kpt) }

        it "KPTが登録される" do
          expect { post api_v1_kpts_path, params: { kpt: kpt_params }, headers: headers }.to change { user.kpts.count }.by(1)
        end

        it "ステータスコード201が返る" do
          post api_v1_kpts_path, params: { kpt: kpt_params }, headers: headers
          expect(response).to have_http_status(:created)
        end

        it "登録したKPTが返る" do
          post api_v1_kpts_path, params: { kpt: kpt_params }, headers: headers
          body = response.parsed_body
          expect(body["kpt"]["keep"]).to eq(kpt_params[:keep])
          expect(body["kpt"]["problem"]).to eq(kpt_params[:problem])
          expect(body["kpt"]["try"]).to eq(kpt_params[:try])
        end
      end

      context "不正なパラメータを送信した場合" do
        let(:invalid_kpt_params) { attributes_for(:kpt, keep: nil) }

        it "KPTが登録されない" do
          expect { post api_v1_kpts_path, params: { kpt: invalid_kpt_params }, headers: headers }.not_to(change { user.kpts.count })
        end

        it "ステータスコード422が返る" do
          post api_v1_kpts_path, params: { kpt: invalid_kpt_params }, headers: headers
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it "エラーメッセージが返る" do
          post api_v1_kpts_path, params: { kpt: invalid_kpt_params }, headers: headers
          body = response.parsed_body
          expect(body["message"]).to eq("Keepを入力してください")
        end
      end
    end

    context "認証情報がヘッダーに記載されていない場合" do
      let(:kpt_params) { attributes_for(:kpt) }

      it "KPTが登録されない" do
        expect { post api_v1_kpts_path, params: { kpt: kpt_params } }.not_to(change { user.kpts.count })
      end

      it "ステータスコード401が返る" do
        post api_v1_kpts_path, params: { kpt: kpt_params }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET /api/vi/kpts/:date" do
    let(:kpt) { create(:kpt, user: user) }

    context "認証情報がヘッダーに記載された場合" do
      let(:headers) { login_user(user) }

      context "kptが存在する日を指定した場合" do
        before do
          get api_v1_path(kpt.date), headers: headers
        end

        it "ステータスコード200が返る" do
          expect(response).to have_http_status(:ok)
        end

        it "適切なメッセージが返る" do
          body = JSON.parse(response.body)
          expect(body["message"]).to eq("Success")
        end

        it "適切なkptオブジェクトが返る" do
          body = JSON.parse(response.body)
          expect(body["kpt"]["date"]).to eq(kpt.date.to_s)
          expect(body["kpt"]["keep"]).to eq(kpt.keep)
          expect(body["kpt"]["problem"]).to eq(kpt.problem)
          expect(body["kpt"]["try"]).to eq(kpt.try)
        end
      end

      context "kptが存在しない日を指定した場合" do
        before do
          get api_v1_path("2025-03-11"), headers: headers
        end

        it "ステータスコード404が返る" do
          expect(response).to have_http_status(:not_found)
        end

        it "エラーメッセージが返る" do
          expect(JSON.parse(response.body)["message"]).to eq("Not Found")
        end
      end

      context "URLの日付形式が誤っていた場合" do
        before do
          get api_v1_path("20250311"), headers: headers
        end

        it "ステータスコード400が返る" do
          expect(response).to have_http_status(:bad_request)
        end

        it "エラーメッセージが返る" do
          expect(JSON.parse(response.body)["message"]).to eq("URLが不正です。'/api/v1/kpts/yyyy-mm-dd'形式で指定してください")
        end
      end
    end

    context "認証情報がヘッダーに記載されていない場合" do
      it "ステータスコード401が返る" do
        get api_v1_path(kpt.date)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
