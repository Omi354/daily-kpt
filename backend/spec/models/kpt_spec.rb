require "rails_helper"

RSpec.describe Kpt, type: :model do
  context "正しいプロパティを受け取った場合" do
    let(:kpt) { build(:kpt) }

    it "バリデーションに通過する" do
      expect(kpt).to be_valid
    end

    it "正常に保存できる" do
      expect { kpt.save }.to change { Kpt.count }.by(1)
    end
  end

  context "userがnilの場合" do
    let(:kpt) { build(:kpt, user: nil) }

    it "バリデーションエラーになる" do
      expect(kpt).not_to be_valid
    end

    it "エラーメッセージが設定される" do
      kpt.valid?
      expect(kpt.errors[:user]).to include("を入力してください")
    end
  end

  describe "バリデーション" do
    context "dateがnilの場合" do
      let(:kpt) { build(:kpt, date: nil) }

      it "バリデーションエラーになる" do
        expect(kpt).not_to be_valid
      end

      it "エラーメッセージが設定される" do
        kpt.valid?
        expect(kpt.errors[:date]).to include("を入力してください")
      end
    end

    context "dateが重複している場合" do
      let(:user) { create(:user) }
      let!(:existing_kpt) { create(:kpt, date: Time.zone.today, user: user) }
      let(:kpt) { build(:kpt, date: Time.zone.today, user: user) }

      it "バリデーションエラーになる" do
        expect { kpt.save }.not_to change { Kpt.count }
      end

      it "エラーメッセージが設定される" do
        kpt.valid?
        expect(kpt.errors[:date]).to include("この日のKPTのはすでに登録されています")
      end
    end

    context "keepがnilの場合" do
      let(:kpt) { build(:kpt, keep: nil) }

      it "バリデーションエラーになる" do
        expect(kpt).not_to be_valid
      end

      it "エラーメッセージが設定される" do
        kpt.valid?
        expect(kpt.errors[:keep]).to include("を入力してください")
      end
    end

    context "problemがnilの場合" do
      let(:kpt) { build(:kpt, problem: nil) }

      it "バリデーションエラーになる" do
        expect(kpt).not_to be_valid
      end

      it "エラーメッセージが設定される" do
        kpt.valid?
        expect(kpt.errors[:problem]).to include("を入力してください")
      end
    end

    context "tryがnilの場合" do
      let(:kpt) { build(:kpt, try: nil) }

      it "バリデーションエラーになる" do
        expect(kpt).not_to be_valid
      end

      it "エラーメッセージが設定される" do
        kpt.valid?
        expect(kpt.errors[:try]).to include("を入力してください")
      end
    end
  end
end
